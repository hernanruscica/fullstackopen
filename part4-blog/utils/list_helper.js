
const Blog = require('../models/BlogModel');

const dummy = (blogs) => { 
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    blogs.sort((a, b) => b.likes - a.likes);
    const maxLikes = blogs[0].likes;
    const topBlogs = blogs.filter(blog => blog.likes === maxLikes);
    if (topBlogs.length > 1) {        
        const newArray = new Array();
        newArray.push(topBlogs[0]);
        return newArray;
    }
    return topBlogs;
}
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  dummy, totalLikes, favoriteBlog, initialBlogs, blogsInDb
}