const axios = require("axios").default;
const token = "G%JDJWCgR*WVE_X0LRR7S^NuZuU;ObCbVAX3OaFJBBL9JiWID0UfXnXyO1GERQRzRPKFK^RcRINhOfETRaBOI$MPOEROMlU;FDCP"

class ThaiPost {
    async getToken() {
        let result = null;
        await axios({
            url: "https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token",
            method: "POST",
            headers: {
                "Authorization": "Token " + token
            }
        }).then((response) => {
            result = response.data
        }).catch((error) => console.error(error));
        return result;
    }

    async getItems(barcode) {
        let result = null;
        const authToken = await this.getToken();
        console.log(authToken)
        const params = {
            status: "all",
            language: "TH",
            barcode: [barcode]
        }
        await axios({
            url: "https://trackapi.thailandpost.co.th/post/api/v1/track",
            method: "POST",
            headers: {
                "Authorization": "Token " + authToken.token
            },
            data: params
        }).then((response) => {
            result = response.data
        }).catch((error) => console.error(error));
        return result
    }
}

module.exports = new ThaiPost();