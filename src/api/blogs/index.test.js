import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Blogs } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, blogs

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  blogs = await Blogs.create({ user })
})

test('POST /blogs 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', category: 'test', likes: 'test', dislikes: 'test', content: 'test', image_url: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.dislikes).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.image_url).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /blogs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /blogs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /blogs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(blogs.id)
})

test('GET /blogs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /blogs/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
    .send({ access_token: userSession, title: 'test', category: 'test', likes: 'test', dislikes: 'test', content: 'test', image_url: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(blogs.id)
  expect(body.title).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.likes).toEqual('test')
  expect(body.dislikes).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.image_url).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /blogs/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
    .send({ access_token: anotherSession, title: 'test', category: 'test', likes: 'test', dislikes: 'test', content: 'test', image_url: 'test' })
  expect(status).toBe(401)
})

test('PUT /blogs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(401)
})

test('PUT /blogs/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', category: 'test', likes: 'test', dislikes: 'test', content: 'test', image_url: 'test' })
  expect(status).toBe(404)
})

test('DELETE /blogs/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /blogs/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /blogs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(401)
})

test('DELETE /blogs/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
