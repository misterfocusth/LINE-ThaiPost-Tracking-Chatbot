const line = require('@line/bot-sdk');
const express = require("express");
const axios = require("axios").default;
const ThaiPost = require("./thaipost")
const msgTemplate = require("./msgTemplate")
const lineHelper = require("./lineHelper");

const config = {
    channelAccessToken: "J9y4dPef00T7SdpJzxJHf8SKgYIuqT+JWGreDWw+y3Y5dR6WKQ5u7pqaGGtOJEOEdbAqRMN+/t0gQjjPx7RNi9C8TVXxjGzvD4bfh0mT0gIP85X5Le3toH0gNnU7ZD2OLkjTWUe2U7qtFTDCKTye+AdB04t89/1O/w1cDnyilFU=",
    channelSecret: "d00d4d478d004ef80f24583787e464c6",
};

const client = new line.Client(config);
const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

async function handleEvent(event) {
    console.log(event)
    const { replyToken, message, type } = event;
    if (type === "message" && message.type === "text") {
        const barcode = message.text
        console.log(barcode)
        const trackResult = await ThaiPost.getItems(barcode)
        const items = trackResult["response"]["items"][barcode]
        let payload = null
        if (items.length <= 0) {
            payload = msgTemplate.trackNotFound();
        } else {
            let body = []
            items.forEach((row) => {
                body.push(msgTemplate.trackBody(row))
            })
            payload = msgTemplate.trackHeader(barcode, body);
        }
        await lineHelper.reply(replyToken, payload);
        console.log(payload)
    }
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server are now started on port : " + port);
})