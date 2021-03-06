import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Invoice } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, invoice

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  invoice = await Invoice.create({})
})

test('POST /	invoices 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ product: 'test', price: 'test', name: 'test', email: 'test', phone: 'test', message: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.product).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.message).toEqual('test')
})

test('GET /	invoices 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /	invoices/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
})

test('GET /	invoices/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /	invoices/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: adminSession, product: 'test', price: 'test', name: 'test', email: 'test', phone: 'test', message: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(body.product).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.message).toEqual('test')
})

test('PUT /	invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /	invoices/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('PUT /	invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, product: 'test', price: 'test', name: 'test', email: 'test', phone: 'test', message: 'test' })
  expect(status).toBe(404)
})

test('DELETE /	invoices/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /	invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /	invoices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('DELETE /	invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
