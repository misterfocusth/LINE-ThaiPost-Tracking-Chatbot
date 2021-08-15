const axios = require("axios").default;

const channelAccessToken = process.env.CAT;
const channelSecret = process.env.CS;

class lineHelper {
    async reply(replyToken, payload) {
        const params = {
            replyToken: replyToken,
            messages: [payload]
        }
        await axios({
            url: "https://api.line.me/v2/bot/message/reply",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + channelAccessToken
            },
            data: params
        }).catch((error) => console.error(error))
    }
}

module.exports = new lineHelper();
