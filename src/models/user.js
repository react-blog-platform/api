import * as mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  salt: {  // 盐值
    type: String,
    required: true,
  },

  name: {
    type: String
  },

  role: {  // 角色  普通用户or管理员
    type: String,
    default: 'user',
  },

  state: { // 标识用户状态，方便管理 
    type: Number,
    default: 0
  }

})

export default mongoose.model('User', UserSchema)