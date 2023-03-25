const listHelper = require('../utils/list_helper');

test('dummy length', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe('total likes', () => {
  const emptyBlog = [];
  const oneBlog = [
    {
      title: 'test',
      author: 'dr. test',
      url: 'dr.test.net',
      likes: 69,
    },
  ];
  const multipleBlogs = [
    {
      title: 'test',
      author: 'dr. test',
      url: 'dr.test.net',
      likes: 69,
    },
    {
      title: 'test',
      author: 'dr. test',
      url: 'dr.test.net',
      likes: 2,
    },
    {
      title: 'test',
      author: 'dr. test',
      url: 'dr.test.net',
      likes: 4,
    },
  ];

  test('empty blog', () => {
    expect(listHelper.totalLikes(emptyBlog)).toBe(0);
  });
  test('one blog', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(69);
  });
  test('multiple blogs', () => {
    expect(listHelper.totalLikes(multipleBlogs)).toBe(75);
  });
});
