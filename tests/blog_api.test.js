const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper.js');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog(blog)
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('get proper amount of blogs returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs have id as unique identifier', async () => {
  const blogIDs = (await helper.blogsInDB()).map((blog) => blog.id);

  expect(helper.areBlogIDsDefined(blogIDs)).toBeDefined();
});

test('new blog successfully added', async () => {
  const newBlog = {
    title: 'hi',
    author: 'who knows?',
    url: 'idc.com',
    likes: 69,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const titles = (await helper.blogsInDB()).map((blog) => blog.title);

  expect(await helper.blogsInDB()).toHaveLength(
    helper.initialBlogs.length + 1
  );
  expect(titles).toContain('hi');
});

afterAll(async () => {
  await mongoose.connection.close();
});
