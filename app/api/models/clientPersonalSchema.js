import mongoose from "mongoose";
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const ClientData = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim:true,lowercase: true
    },
      email: 
      {
       type: String, require: true, index:true, 
       trim:true, lowercase: true,unique: true,
       required: 'Email address is required',
       validate: [validateEmail, 'Please fill a valid email address'],
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   
    },
      
      image: {
      type: String,
      required: true,
    },
      
  },
  { timestamps: true }
);
mongoose.models = {};


const clientPersonalData =
  mongoose.models.ClientData ||
  mongoose.model("clientPersonalData", ClientData);
export default clientPersonalData;