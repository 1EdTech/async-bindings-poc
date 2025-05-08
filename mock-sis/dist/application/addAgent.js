"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAgentUseCase = void 0;
class AddAgentUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
        const people = await this.repo.getRandomPeople(2);
        if (people.length < 2)
            return null;
        const [person, agent] = people;
        await this.repo.addAgent(person.sourcedId, agent.sourcedId, 'guardian');
        return { personId: person.sourcedId, agentId: agent.sourcedId, agentType: 'guardian' };
    }
}
exports.AddAgentUseCase = AddAgentUseCase;
