import mongoose from "mongoose";

const likePost = new mongoose.Schema(
  {autherId:{ ref: 'clientpersonaldatas',type: String},
    postId:{ ref: 'uploadposts',type:String},
     
dateandtime:{type:Date, default: Date.now },

  }
 
);
mongoose.models = {};


const likePosts =
  mongoose.models.likePosts ||
  mongoose.model("likePosts", likePost);
export default likePosts;