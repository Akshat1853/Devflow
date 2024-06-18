import {model,models,Document, Schema} from "mongoose";

export interface IInteraction extends Document {
    user:Schema.Types.ObjectId;
    action:'string';
    question:Schema.Types.ObjectId[];// refrece to questions
    answer:Schema.Types.ObjectId[];// refrece to answers
    tags:Schema.Types.ObjectId[];// refrece to tags
    createdAt:Date;
}

const InteractionSchema =new Schema ({
   user:{type :Schema.Types.ObjectId,ref:'User',required:true},
    action:{type:String,required:true},
    question:[{type:Schema.Types.ObjectId,ref:'Question'}],
    answer:[{type:Schema.Types.ObjectId,ref:'Answer'}],
    tags:[{type:Schema.Types.ObjectId,ref:'Tag'}],
    createdAt:{type:Date,default:Date.now}

})

const Interaction=models.Interaction || model('Interaction',InteractionSchema);

export default Interaction;