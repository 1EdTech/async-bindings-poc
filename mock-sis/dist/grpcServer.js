"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyPersonUpdate = notifyPersonUpdate;
exports.notifyCourseUpdate = notifyCourseUpdate;
exports.startGrpcServer = startGrpcServer;
const grpc_js_1 = require("@grpc/grpc-js");
const generated = __importStar(require("./generated/sis"));
const commands_1 = require("./commands");
const transformers_1 = require("./transformers");
// Track active streams for each entity type
const personStreams = new Set();
const courseStreams = new Set();
// Notify all connected consumers of a person update
function notifyPersonUpdate(person) {
    const protoPerson = (0, transformers_1.dbPersonToProtoPerson)(person);
    for (const stream of personStreams) {
        stream.write(protoPerson);
    }
}
// Notify all connected consumers of a course update
function notifyCourseUpdate(course) {
    const protoCourse = (0, transformers_1.dbCourseToProtoCourse)(course);
    for (const stream of courseStreams) {
        stream.write(protoCourse);
    }
}
// gRPC service implementation
const sisSyncImpl = {
    SyncPersons(call) {
        personStreams.add(call);
        // Stream all current persons
        for (const person of (0, commands_1.getAllPersons)()) {
            call.write((0, transformers_1.dbPersonToProtoPerson)(person));
        }
        call.on('cancelled', () => personStreams.delete(call));
        call.on('close', () => personStreams.delete(call));
    },
    SyncCourses(call) {
        courseStreams.add(call);
        // Stream all current courses
        for (const course of (0, commands_1.getAllCourses)()) {
            call.write((0, transformers_1.dbCourseToProtoCourse)(course));
        }
        call.on('cancelled', () => courseStreams.delete(call));
        call.on('close', () => courseStreams.delete(call));
    }
};
function startGrpcServer() {
    const server = new grpc_js_1.Server();
    server.addService(generated.SISSyncService, sisSyncImpl);
    server.bindAsync('0.0.0.0:50051', grpc_js_1.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('gRPC server failed to start:', err);
            return;
        }
        server.start();
        console.log(`gRPC server running on port ${port}`);
    });
}
