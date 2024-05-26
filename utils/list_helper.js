const totalLikes = (blogs) => {
    const likeCount = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likeCount;
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    return blogs.reduce((max, blog) => max.likes >= blog.likes ? max : blog);
}

module.exports = {
    totalLikes,
    favoriteBlog,
}