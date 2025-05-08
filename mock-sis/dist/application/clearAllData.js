"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearAllDataUseCase = void 0;
class ClearAllDataUseCase {
    constructor(personRepo, courseRepo) {
        this.personRepo = personRepo;
        this.courseRepo = courseRepo;
    }
    async execute() {
        await this.personRepo.clearAll();
        await this.courseRepo.clearAll();
    }
}
exports.ClearAllDataUseCase = ClearAllDataUseCase;
