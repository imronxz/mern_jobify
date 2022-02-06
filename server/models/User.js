import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Harap masukkan nama!'],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Harap masukkan email!'],
    validate: {
      validator: validator.isEmail,
      message: 'Harap masukkan email yang valid!',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Minimal 6 Karakter'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'My Location',
  },
});

/* 
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
*/
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', UserSchema);
