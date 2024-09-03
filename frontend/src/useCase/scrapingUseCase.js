import ScrapingRepository from "@/repository/scrapingRepository";

export default class ScrapingUseCase {
    constructor(
        gptRepository = new ScrapingRepository(),
    ) {
        this.gptRepository = gptRepository;
    }

    async getShopInfo(location, name) {
        try {
            const shopDetails = await this.scrapingRepository.getShopInfo(location, name);
            return shopDetails;
        } catch (error) {
            console.error('Error fetching shop details:', error);
            throw error;
        }
    }
}