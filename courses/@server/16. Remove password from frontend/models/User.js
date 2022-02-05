import mongoose from 'mongoose';
import validator from 'validator';


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


export default mongoose.model('User', UserSchema);
