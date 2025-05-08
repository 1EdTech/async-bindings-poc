"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCountsUseCase = void 0;
class GetCountsUseCase {
    constructor(personRepo, courseRepo) {
        this.personRepo = personRepo;
        this.courseRepo = courseRepo;
    }
    async execute() {
        const personCount = await this.personRepo.getCount();
        const courseCount = await this.courseRepo.getCount();
        return { personCount, courseCount };
    }
}
exports.GetCountsUseCase = GetCountsUseCase;
