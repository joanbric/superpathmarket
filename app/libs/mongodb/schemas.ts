import { Schema } from 'mongoose'

export const sketchSchema = new Schema({
  store_id: Number,
  nodes: [Object]
})
