import { Invoice } from '.'

let invoice

beforeEach(async () => {
  invoice = await Invoice.create({ product: 'test', price: 'test', name: 'test', email: 'test', phone: 'test', message: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.product).toBe(invoice.product)
    expect(view.price).toBe(invoice.price)
    expect(view.name).toBe(invoice.name)
    expect(view.email).toBe(invoice.email)
    expect(view.phone).toBe(invoice.phone)
    expect(view.message).toBe(invoice.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(view.product).toBe(invoice.product)
    expect(view.price).toBe(invoice.price)
    expect(view.name).toBe(invoice.name)
    expect(view.email).toBe(invoice.email)
    expect(view.phone).toBe(invoice.phone)
    expect(view.message).toBe(invoice.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
