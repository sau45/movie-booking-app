const { default: mongoose } = require("mongoose")



const MovieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cast:{
        type:[String],
        required:true
    },
    language:{       
        type:String,
        required:true
    },
    trailerUrl:{
        type:String,
        required:true

    }

},{
    timestamps:true
})


module.exports = mongoose.model("Movie", MovieSchema);

