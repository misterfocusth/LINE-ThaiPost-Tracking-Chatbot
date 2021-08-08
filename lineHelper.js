const axios = require("axios").default;

const channelAccessToken = "J9y4dPef00T7SdpJzxJHf8SKgYIuqT+JWGreDWw+y3Y5dR6WKQ5u7pqaGGtOJEOEdbAqRMN+/t0gQjjPx7RNi9C8TVXxjGzvD4bfh0mT0gIP85X5Le3toH0gNnU7ZD2OLkjTWUe2U7qtFTDCKTye+AdB04t89/1O/w1cDnyilFU="
const channelSecret = "d00d4d478d004ef80f24583787e464c6";

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
