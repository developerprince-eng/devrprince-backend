import mongoose, { Schema } from 'mongoose'

const blogsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  category: {
    type: String
  },
  likes: {
    type: String
  },
  dislikes: {
    type: String
  },
  content: {
    type: String
  },
  image_url: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

blogsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      category: this.category,
      likes: this.likes,
      dislikes: this.dislikes,
      content: this.content,
      image_url: this.image_url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Blogs', blogsSchema)

export const schema = model.schema
export default model
