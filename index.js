const express = require('express');
const app = express();
const connection = require('./database/db');

// models
const Question = require('./models/Question');
const Reply = require('./models/Reply');

require('dotenv').config();

connection
  .authenticate()
  .then(() => {
    console.log('Database connection successful 🌅');
  })
  .catch((error)=> {
    console.error(error);
  }); 

let port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  Question
    .findAll({
      raw: true,
      order: [
        ['id', 'DESC']
      ] 
    })
    .then(data => {
      res.render('index', {
        data: data 
      });
    });
});

app.get('/questions/add', (req, res) => {
  res.render('./questions/add');
});

app.get('/questions/edit/:id', (req, res) => {

  let id = req.params.id;

  Question
    .findOne({ where: { id: id } })
    .then(question => {
      if(question == undefined) {
        res.redirect('/');  
      } 

      res.render('./questions/edit', {
        question: question 
      });
    });
});

app.get('/questions/open/:id', (req, res) => {

  let id = req.params.id;

  Question
    .findOne({ where: { id: id } })
    .then(question => {
      
      if(question == undefined) {
        res.redirect('/');  
      }

      Reply
        .findAll({ 
          where: { questionId: id },
          order: [
            ['id', 'DESC']
          ] 
        })
        .then(replies => {
          if(replies != undefined) {
            res.render('./questions/open', {
              question: question,
              replies: replies 
            });
          }
      });      
    });
});

app.post('/questions/remove/', (req, res) => {
  
  let id = req.body.questionId;
  
  Reply
    .destroy({ where: { questionId: id } })
    .then(() => {
      Question
        .destroy({ where: { id: id } })
        .then(() => {
          res.redirect('/');
        });
    });
    
});

app.post('/questions/edit', (req, res) => {
  
  let questionId = req.body.questionId;
  let title = req.body.title;
  let description = req.body.description;

  Question
    .update(
      { title: title, description: description },
      { where: { id: questionId } }
    );

  Question
    .findOne({ where: { id: questionId } })
    .then(question => {
      res.render('./questions/edit', {
        question: question,
        updated: true
      });
    });
});

app.post('/replies/remove/', (req, res) => {
  
  let questionId = req.body.questionId;
  let replyId = req.body.replyId;
  
  Reply
    .destroy({ where: { id: replyId } })
    .then(() => {
      res.redirect('/questions/open/' + questionId);
    });
});

app.post('/questions/addQuestion', (req, res) => {
  
  let title = req.body.title;
  let description = req.body.description;
  let questionId = 0;
  
  Question
    .create({
      title: title,
      description: description
    })
    .then((result) => {
      questionId = result.id;
    });

  Question
    .findOne({ where: { id: questionId } })
    .then(() => {
      res.render('./questions/add', {
        created: true
      });
    });
});

app.post('/questions/addReply', (req, res) => {
  
  let reply = req.body.reply;
  let questionId = req.body.questionId;

  Reply
    .create({
      reply: reply,
      questionId : questionId
    })
    .then(() => {
      res.redirect('/questions/open/' + questionId);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🔥`);
});
