import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  
    {autherId:{ ref: 'clientpersonaldatas',type: String},
    postId:{ ref: 'uploadposts',type:String},
     followerWhoNotSeenThePost:[  {
        userId:{
              type: String,
             
          },
         senddateandtime:{type:Date, default: Date.now }
      }
       ] 
  },
  { timestamps: true }
);
mongoose.models = {};


const notificationSchemas =
  mongoose.models.NotificationSchema ||
  mongoose.model("notificationSchema", NotificationSchema);
export default notificationSchemas;