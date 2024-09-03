import axios from 'axios';

HOTPEPPER_API_URL = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/shop';
HOTPEPPER_API_KEY = "700ae201b4d3ba6c"

export default class ScrapingRepository {

    async getShopInfo(locatoin, name) {

        try {
            const response = await axios.get(HOTPEPPER_API_URL, {
                params: {
                    key: HOTPEPPER_API_KEY,
                    id: shopId,
                    format: 'json'
                }
            });

            // レスポンスから必要なデータを取得
            const shopDetails = response.data.results.shop[0];

            return shopDetails;
        } catch (error) {
            console.error('Error fetching shop details:', error);
            throw error;
        }




    }
}
