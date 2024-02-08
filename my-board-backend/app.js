const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost/myboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 게시글 전체 조회
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// 게시글 생성
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
