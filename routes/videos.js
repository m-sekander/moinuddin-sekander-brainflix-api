const express = require("express");
const router = express.Router();

const fs = require("fs");

const crypto = require("crypto");

function readVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

router.get('/', (req, res) => {
    const videos = readVideos();

    const strippedVideos = videos.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        }
    })

    res.json(strippedVideos);
})


module.exports = router;