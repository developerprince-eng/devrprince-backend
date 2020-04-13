import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Invoice, { schema } from './model'

const router = new Router()
const { product, price, name, email, phone, message } = schema.tree

/**
 * @api {post} /	invoices Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiParam product Invoice's product.
 * @apiParam price Invoice's price.
 * @apiParam name Invoice's name.
 * @apiParam email Invoice's email.
 * @apiParam phone Invoice's phone.
 * @apiParam message Invoice's message.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 */
router.post('/',
  body({ product, price, name, email, phone, message }),
  create)

/**
 * @api {get} /	invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of invoices.
 * @apiSuccess {Object[]} rows List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /	invoices/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /	invoices/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam product Invoice's product.
 * @apiParam price Invoice's price.
 * @apiParam name Invoice's name.
 * @apiParam email Invoice's email.
 * @apiParam phone Invoice's phone.
 * @apiParam message Invoice's message.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ product, price, name, email, phone, message }),
  update)

/**
 * @api {delete} /	invoices/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
