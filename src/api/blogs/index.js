import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Blogs, { schema } from './model'

const router = new Router()
const { title, category, likes, dislikes, content, image_url } = schema.tree

/**
 * @api {post} /blogs Create blogs
 * @apiName CreateBlogs
 * @apiGroup Blogs
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Blogs's title.
 * @apiParam category Blogs's category.
 * @apiParam likes Blogs's likes.
 * @apiParam dislikes Blogs's dislikes.
 * @apiParam content Blogs's content.
 * @apiParam image_url Blogs's image_url.
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, category, likes, dislikes, content, image_url }),
  create)

/**
 * @api {get} /blogs Retrieve blogs
 * @apiName RetrieveBlogs
 * @apiGroup Blogs
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of blogs.
 * @apiSuccess {Object[]} rows List of blogs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /blogs/:id Retrieve blogs
 * @apiName RetrieveBlogs
 * @apiGroup Blogs
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /blogs/:id Update blogs
 * @apiName UpdateBlogs
 * @apiGroup Blogs
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Blogs's title.
 * @apiParam category Blogs's category.
 * @apiParam likes Blogs's likes.
 * @apiParam dislikes Blogs's dislikes.
 * @apiParam content Blogs's content.
 * @apiParam image_url Blogs's image_url.
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, category, likes, dislikes, content, image_url }),
  update)

/**
 * @api {delete} /blogs/:id Delete blogs
 * @apiName DeleteBlogs
 * @apiGroup Blogs
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Blogs not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
