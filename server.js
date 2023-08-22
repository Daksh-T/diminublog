const express = require('express');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
    html: true, // Allow inline HTML
}
);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

const getPosts = () => {
  const postDir = path.join(__dirname, 'posts');
  const files = fs.readdirSync(postDir);
  const posts = files.map(file => {
      const filePath = path.join(postDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const [dateString, title, tagsString, ...rest] = content.split('\n');

      // Format date
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

      // Split tags string into an array of tags
      const tags = tagsString.split(',').map(tag => tag.trim());

      // Get the file's modification time
      const fileModTime = fs.statSync(filePath).mtime;

      return {
          date: formattedDate,
          title,
          tags,
          content: md.render(rest.join('\n')),
          filename: file,
          modTime: fileModTime
      };
  });

  // Sort the posts by date in descending order, and by modification time as a secondary factor
  posts.sort((a, b) => new Date(b.date) - new Date(a.date) || b.modTime - a.modTime);

  return posts;
};

app.get('/', (req, res) => {
  const posts = getPosts();
  res.render('index', { posts });
});

app.get('/post/:filename', (req, res) => {
  const posts = getPosts();
  const post = posts.find(p => p.filename === req.params.filename);
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

const tagDescriptions = require('./tagDescriptions.json');

app.get('/tag/:tag', (req, res) => {
    const tagName = decodeURIComponent(req.params.tag); // Decode the tag name
    const posts = getPosts();
    const filteredPosts = posts.filter(p => p.tags.includes(req.params.tag));
    const description = tagDescriptions[req.params.tag] || "Description not found";
    res.render('tag', { posts: filteredPosts, tagName: req.params.tag, tagDescription: description });
});