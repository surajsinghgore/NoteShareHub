import mongoose from "mongoose";

const disLikePost = new mongoose.Schema(
  {autherId:{ ref: 'clientpersonaldatas',type: String},
    postId:{ ref: 'uploadposts',type:String},
     
dateandtime:{type:Date, default: Date.now },

  }
 
);
mongoose.models = {};


const disLikePosts =
  mongoose.models.disLikePosts ||
  mongoose.model("disLikePosts", disLikePost);
export default disLikePosts;