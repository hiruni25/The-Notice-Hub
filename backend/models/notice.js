const mongoose = require ('mongoose')

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title title'],
        trim: true,
        maxLength: [100, 'Titke name cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please enter content']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notice', noticeSchema);