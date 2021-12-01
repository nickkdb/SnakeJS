const Score= require("../models/score");

module.exports= {
    saveHighScore: (data) => {
        Score.create({
            name: data.name,
            score: data.score
        })
    },
    sendHighest: (cb) => {
        Score.find().sort({"score": -1}).limit(5).exec((err, data) => {
            if (err) {
                throw err;
            } else cb(data);
        }); 
    }
}