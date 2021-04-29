const mongojs= require('mongojs');

const databaseUrl= "snakedb";
const collections= ["scores"];

const db= mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("Database Error:", error);
  });

module.exports= {
    saveHighScore: (data) => {
        db.scores.insert({
            name: data.name,
            score: data.score
        })
    },
    sendHighest: (cb) => {
        db.scores.find().sort({"score": -1}).limit(5).toArray((err, data) => {
            if (err) {
                throw err;
            } else cb(data);
        });
        
    }
}