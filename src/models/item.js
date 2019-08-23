
import * as mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }

})

export default mongoose.model('Item', ItemSchema)