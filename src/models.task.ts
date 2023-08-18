// External dependencies
import { ObjectId } from 'mongodb'

// Class Implementation
export default class Task {
  constructor(
    public content: string,
    public status: string,
    public date: Date,
    public _id?: ObjectId
  ) {}
}