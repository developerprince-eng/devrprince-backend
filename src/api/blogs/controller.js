import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Blogs } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Blogs.create({ ...body, user })
    .then((blogs) => blogs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Blogs.count(query)
    .then(count => Blogs.find(query, select, cursor)
      .populate('user')
      .then((blogs) => ({
        count,
        rows: blogs.map((blogs) => blogs.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Blogs.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((blogs) => blogs ? blogs.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Blogs.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((blogs) => blogs ? Object.assign(blogs, body).save() : null)
    .then((blogs) => blogs ? blogs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((blogs) => blogs ? blogs.remove() : null)
    .then(success(res, 204))
    .catch(next)
