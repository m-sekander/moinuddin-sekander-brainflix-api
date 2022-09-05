const express = require("express");
const router = express.Router();

const fs = require("fs");

const crypto = require("crypto");

function readVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

router.get('/', (_req, res) => {
    const videos = readVideos();

    const strippedVideos = videos.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        }
    })

    if (strippedVideos.length === 0) {
        return res.status(404).json({
            message: "No videos posted, make an upload and request again",
        })
    }

    res.json(strippedVideos);
})

router.get('/:id', (req, res) => {
    const videos = readVideos();

    const foundVideo = videos.find((video) => {
        return video.id === req.params.id
    })

    if (foundVideo === undefined) {
        return res.status(404).json({
            message: "No video with that id exists"
        })
    }

    res.json(foundVideo);
})

router.post('/', (req, res) => {
    console.log(req.body)
    if ((req.body.title === '') || (req.body.description === '')) {
        return res.status(400).json({
            message: "Please fill out all the required information and resubmit"
        })
    }
    if (req.body.image === '') {
        return res.status(400).json({
            message: "Image may not exist or has the wrong file path"
        })
    }

    const newVideo = {
        title: req.body.title,
        channel: "TestUser",
        image: req.body.image,
        description: req.body.description,
        views: "0",
        likes: "0",
        duration: "11:11",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
        id: crypto.randomUUID(),
    };

    const videos = readVideos();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(newVideo);
})


module.exports = router;