const axios = require('axios');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);

async function getStreamFromURL(url) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    const path = `/tmp/${Date.now()}.png`; // Temporary file path
    const writer = createWriteStream(path);

    await streamPipeline(response.data, writer);

    return path; // Return the file path
}

global.utils = { getStreamFromURL };

module.exports = {
    config: {
        name: "paircats",
        version: "1.0",
        author: "Samir Œ",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Gửi một cặp ảnh mèo ngẫu nhiên",
            en: "Send a pair of random cat images"
        },
        longDescription: {
            vi: "Lấy và gửi một cặp ảnh mèo ngẫu nhiên từ The Cat API",
            en: "Fetch and send a pair of random cat images from The Cat API"
        },
        category: "fun",
        guide: {
            vi: "Sử dụng lệnh như sau:\npaircats",
            en: "Use the command as follows:\npaircats"
        }
    },
    onStart: async function ({ api, message, args, event }) {
        const apiUrl = 'https://api.thecatapi.com/v1/images/search?&mime_types=png&format=json&order=RANDOM&limit=2';

        try {
            const response = await axios.get(apiUrl);
            const images = response.data.slice(0, 2); 

            if (images.length < 2) {
                return message.reply("Không tìm thấy đủ ảnh mèo.");
            }

            const attachments = await Promise.all(
                images.map(async (image) => {
                    const path = await global.utils.getStreamFromURL(image.url);
                    return api.sendMessage({ body: "", attachment: createReadStream(path) }, event.threadID);
                })
            );

            message.reply({ body: "Here's the cat pair", attachment: attachments });
        } catch (error) {
            console.error(error);
            message.reply("Đã xảy ra lỗi khi lấy ảnh mèo. Vui lòng thử lại sau.");
        }
    }
};
