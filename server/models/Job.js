import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// import { Schema } from "mongoose";

export const JobSchema = new Schema({
  jobTitle: { type: String, required: true, maxlength: 40 },
  jobSalary: { type: Number, required: true, maxlength: 10 },
  jobCompany: { type: String, required: true, maxlength: 40 },
  jobHours: { type: Number, required: true, maxlength: 2 },
  jobDesc: { type: String, default: '' },

  //REVIEW gets the id of the poster by finding the account linked with auth0
  posterId: { type: ObjectId, required: true, ref: 'Account' }

  //REVIEW virtuals are a way to put extra data into the api array - useful to dynamically add properies/data to an object
}, { timestamps: true, toJSON: { virtuals: true } })



// REVIEW virtual is how you find the details of the referenced collection in DbContext - inject specifc details later using populate
JobSchema.virtual('poster', {
  localField: 'posterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})