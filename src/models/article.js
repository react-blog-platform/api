import * as mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  uid: String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: false,
  },
  visits: {
    type: Number,
    default: 0
  },
  stars: {
    type: Number,
    default: 0
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articleType'
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articleTag'
  }],
  createTime: Number,
  lastEditTime: Number,
  enabled: Boolean,  // 是否可见

})

export default mongoose.model('Article', ArticleSchema)