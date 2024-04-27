import mongoose from "mongoose";

const SavedNotes = new mongoose.Schema(
  
    {autherId:{ ref: 'clientpersonaldatas',type: String},
    postId:{ ref: 'uploadposts',type:String},
      
  },
  { timestamps: true }
);
mongoose.models = {};


const savednotes =
  mongoose.models.SavedNotes ||
  mongoose.model("savednotes", SavedNotes);
export default savednotes;