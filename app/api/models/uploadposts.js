import mongoose from "mongoose";

const uploadPost = new mongoose.Schema(
  {autherId:{ ref: 'clientpersonaldatas',type: String},
      authorEmail: 
      {
        ref: 'clientpersonaldatas',
       type: String, require: true,  
       lowercase: true,
 
   
    },
      
      title: {
      type: String,
      required: true,
      lowercase: true
    },
    keyword: {
        type: Array,
        
      },
       description:{
        type:String,
      lowercase: true,
      required:true,
       },
       post_media:{
        type:String,  lowercase: true,
        required:true,
       } ,
       visibility:{type:String,lowercase:true,required:true},
       like:{type:Number,default:0},
       dislike:{type:Number,default:0},
       comments:{type:Array}, 
dateandtime:{type:Date},

  },
  { timestamps: true }
);
mongoose.models = {};


const uploadPosts =
  mongoose.models.uploadPosts ||
  mongoose.model("uploadPosts", uploadPost);
export default uploadPosts;