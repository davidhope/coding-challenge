'use strict';

const express = require('express')
const app = express()
const db = require('./db.js');

app.use(express.json());

app.get('/api', async (req, res) => {
  res.json('healthy');
});

app.get('/api/providers', (req, res) => {

    db.connect((connectedDb) => {
      let providers = db.query(connectedDb, 'select * from providers');

        if (providers) {
            res.json(providers);
        } else {
            res.sendStatus(404);
        }
    });

    
});



// app.put('/api/articles/:name/upvote', async (req, res) => {
//     const { name } = req.params;
//     const { uid } = req.user;

//     const article = await db.collection('articles').findOne({ name });

//     if (article) {
//         const upvoteIds = article.upvoteIds || [];
//         const canUpvote = uid && !upvoteIds.includes(uid);
   
//         if (canUpvote) {
//             await db.collection('articles').updateOne({ name }, {
//                 $inc: { upvotes: 1 },
//                 $push: { upvoteIds: uid },
//             });
//         }

//         const updatedArticle = await db.collection('articles').findOne({ name });
//         res.json(updatedArticle);
//     } else {
//         res.send('That article doesn\'t exist');
//     }
// });

// app.post('/api/appointments', async (req, res) => {
//     const { name } = req.params;
//     const { text } = req.body;
//     const { email } = req.user;

//     if (article) {
//         res.json(article);
//     } else {
//         res.send('That article doesn\'t exist!');
//     }
// });

db.connect((connectedDb) => {
  
  db.init(connectedDb);
  db.provision(connectedDb);

  console.log('Successfully connected to database!');
  app.listen(8000, () => {
      db.close(connectedDb);
      console.log('Server is listening on port 8000');
  });
})