const mongoose=require('mongoose');

const recipeSchema=new mongoose.Schema({
    dishName:{
        type:String,
        required:true
    },
    cookingTime:{
      type:Number,
      required:true
    },
    url:{
        type:String,
        required:true
    }

})

const recipeModel=mongoose.model('favs',recipeSchema);
module.exports=recipeModel;
