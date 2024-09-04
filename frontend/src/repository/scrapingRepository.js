export default class ScrapingRepository {

    async getStoreUrlByName(storeName) {
        const apiKey = "700ae201b4d3ba6c";  // ここにあなたのAPIキーを入力
        const url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

        const params = new URLSearchParams({
            key: apiKey,
            keyword: storeName,  // 店名をキーワードとして使用
            count: "1",  // 取得する件数（1件のみ）
            format: "json"  // レスポンス形式 (jsonを推奨)
        });

        try {
            const response = await fetch(`${url}?${params}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }


}


