import { Blogs } from '.'
import { User } from '../user'

let user, blogs

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  blogs = await Blogs.create({ user, title: 'test', category: 'test', likes: 'test', dislikes: 'test', content: 'test', image_url: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = blogs.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blogs.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(blogs.title)
    expect(view.category).toBe(blogs.category)
    expect(view.likes).toBe(blogs.likes)
    expect(view.dislikes).toBe(blogs.dislikes)
    expect(view.content).toBe(blogs.content)
    expect(view.image_url).toBe(blogs.image_url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = blogs.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blogs.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(blogs.title)
    expect(view.category).toBe(blogs.category)
    expect(view.likes).toBe(blogs.likes)
    expect(view.dislikes).toBe(blogs.dislikes)
    expect(view.content).toBe(blogs.content)
    expect(view.image_url).toBe(blogs.image_url)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
