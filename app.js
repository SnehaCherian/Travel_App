const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const postsRouter = require('./routes/posts');
const callbackRequestsRouter = require('./routes/callback-requests');
const emailsRouter = require('./routes/emails');
const usersRouter = require('./routes/users');
const Post = require('./models/posts').Post;
const auth = require('./controllers/auth');
require("dotenv").config();

app.set('view engine', 'ejs');
const url=process.env.DB_URL;

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});
//mongoose.connect('mongodb://localhost:27017/travelsDB', { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false });
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
    
})
app.get('/login', (req, resp) => {
    resp.render('login');
})
app.listen(3000, () => console.log('Listening 3000...'));