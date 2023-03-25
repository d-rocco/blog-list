const dummy = (blogs) => {
  blogs.push('hello');
  return blogs.length;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
  }
};

module.exports = {
  dummy,
  totalLikes,
};
