const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose'); //to close the connection after the tests
const Blog = require('../models/BlogModel');
const supertest = require('supertest'); //to test the express app, the api itself

const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
  const cleared = await Blog.deleteMany()
  //console.log('cleared ', cleared);  
  const response = await Blog.insertMany(listHelper.initialBlogs)
  //console.log('inserted ', response.length);
  
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ];
  const biggerList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 7,
        __v: 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  });

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList);
    assert.strictEqual(result, 19);
  });

  //console.log('favoriteBlog tests', listHelper.favoriteBlog(biggerList));
  test('favorite blog', () => {
    const result = listHelper.favoriteBlog(biggerList);
    //console.log(result);
    assert.deepStrictEqual(result, [
      {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: 'Michael Chan', 
          url: 'https://reactpatterns.com/', 
          likes: 7, 
          __v: 0
        }
    ]);
    });
});
/**/
test('blog posts in the JSON format', async () => {
  const response =  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);    
  assert.strictEqual(response.body.length, listHelper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});