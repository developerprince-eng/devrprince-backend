import mongoose, { Schema } from 'mongoose'

const invoiceSchema = new Schema({
  product: {
    type: String
  },
  price: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  message: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      product: this.product,
      price: this.price,
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
