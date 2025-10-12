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
module.exports = {
  dummy, totalLikes, favoriteBlog
}