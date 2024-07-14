import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  email: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
  onDuty: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model('Student', studentSchema); //colection: mongo буде брати документи з колекції students - тобто переведе наш Student до нижнього регістру і зробить множину додавши в кінці закінчення s

export { Student };
