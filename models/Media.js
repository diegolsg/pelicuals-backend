const{Schema,model}= require('mongoose')

const mediaSchema = Schema({
    serial:{type: String,required: true, unique: true},
    titulo:{type: String, required: true},
    sinopsis:{type: String, required: true},
    urlPelicula:{type: String, required: true},
    imagenPortada:{type: String, required: true},
    anoEstreno:{type: Number,required: true, unique: false},
    director:{type: Schema.Types.ObjectId, ref: 'Director', required: true},
    genero:{type: Schema.Types.ObjectId, ref: 'Genero', required: true},
    productora:{type: Schema.Types.ObjectId, ref: 'Productora', required: true},
    tipo:{type: Schema.Types.ObjectId, ref: 'Tipo', required: true},
    fechaCreacion:{type: Date, required: true},
    fechaActualizacion:{type: Date, required: true},
});
module.exports = model('Media',mediaSchema)