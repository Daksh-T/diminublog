# DiminuBlog - A tiny blogging app built using Express.js
DiminuBlog is lightweight and tiny, supports tags and has support for using Markdown to format posts.
![Screenshot of the homepage](/public/images/screenshot.png)

## How to use
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Go to `localhost:3000` to view the blog!

## How to add posts
1. Create a new Markdown file in the `posts` directory with the format
```markdown
2023-08-21
Post title
#tags #go #here
```
2. You can store images in the `public/images` directory and link to them in your posts using Markdown syntax, or you can also use HTML image embedding syntax.
3. Refresh to see your post!

## Updating tag descriptions
Use ``tagDescriptions.json`` to update the descriptions of tags. The format is
```json
{
    "tag1": "Description of tag1",
    "tag2": "Description of tag2"
}
```

## Contributing
This project is open to contributions. Feel free to open an issue or a pull request.
