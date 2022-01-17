const mongoose=require('mongoose');
const SalleSchema=new mongoose.Schema({
    type:{
        type:String,
        required:[true,'Vous devez entrer le type de la salle !'],
        trim:true
    },
    nom:{
        type:String,
        required:[true,'Vous devez entre le nom de la salle !'],
        trim:true
    },
    bloc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bloc',
        required:[true,'Vous devez entrez l\'id du bloc']
    }
})
module.exports=mongoose.model('Salle',SalleSchema);