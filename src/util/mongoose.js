const { default: mongoose } = require("mongoose")

module.exports = {
    multipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map(mongooseArray => mongooseArray.toObject());
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}