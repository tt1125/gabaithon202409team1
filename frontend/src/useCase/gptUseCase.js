import GptRepository from "@/repository/gptRepository"

export default class GptUseCase {
    constructor(
        gptRepository = new GptRepository(),
    ) {
        this.gptRepository = gptRepository;
    }

    async sendMessage(queryText, sendMessages, currentPosition) {
        try {
            const result = await this.gptRepository.sendMessage(queryText, sendMessages, currentPosition)
            return result
        } catch (e) {
            throw new Error(e.message)
        }
    }
}