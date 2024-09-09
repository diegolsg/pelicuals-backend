const {Router} = require('express');
const Media = require('../models/Media');
const {validationResult,check} = require('express-validator');

const router = Router();

router.get('/', async function (req,res){
    try {
        const medias = await Media.find();
        res.send(medias);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ocurrido');
    }
});

router.post('/', [
    check('serial','invalid.serial').not().isEmpty(),
    check('titulo','invalid.titulo').not().isEmpty(),
    check('sinopsis','invalid.sipnosis').not().isEmpty(),
    check('urlPelicula','invalid.urlPelicula').not().isEmpty(),
    check('imagenPortada','invalid.imagenPortada').not().isEmpty(),
    check('anoEstreno','invalid.anoEstreno').not().isEmpty(),
    check('director','invalid.director').not().isEmpty(),
    check('genero','invalid.genero').not().isEmpty(),
    check('productora','invalid.productora').not().isEmpty(),
    check('tipo','invalid.tipo').not().isEmpty(),
    
   
], async function (req,res){
    try {
        console.log('aqui');
        const errors =validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({mensaje: errors.array()});
        }
        const existePelicualPorSerial = await Media.findOne({serial:req.body.serial});
        if(existePelicualPorSerial){
            return res.status(400).send('Ya existe el serial para otra pelicula o serie')
        }
        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPelicula = req.body.urlPelicula;
        media.imagenPortada = req.body.imagenPortada;
        media.anoEstreno = req.body.anoEstreno;
        media.director = req.body.director._id;
        media.genero = req.body.genero._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        media.fechaCreacion = new Date;
        media.fechaActualizacion = new Date;
        media = await media.save();
        res.send(media);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ocurrido');
    }});

    router.put('/:MediaId', [
        check('serial','invalid.serial').not().isEmpty(),
        check('titulo','invalid.titulo').not().isEmpty(),
        check('sinopsis','invalid.sipnosis').not().isEmpty(),
        check('urlPelicula','invalid.urlPelicula').not().isEmpty(),
        check('imagenPortada','invalid.imagenPortada').not().isEmpty(),
        check('anoEstreno','invalid.anoEstreno').not().isEmpty(),
        check('genero','invalid.genero').not().isEmpty(),
        check('productora','invalid.productora').not().isEmpty(),
        check('tipo','invalid.tipo').not().isEmpty(),
        check('director','invalid.director').not().isEmpty(),
    ], async function (req,res){
        try {
            console.log('aqui');
            const errors =validationResult(req);
            if(!errors.isEmpty){
                return res.status(400).json({mensaje: errors.array()});
            }
            let media = await Media.findById(req.params.MediaId);
            if (!media){
                return res.status(400).send('media no existe');
            }
            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sinopsis = req.body.sinopsis;
            media.urlPelicula = req.body.urlPelicula;
            media.imagenPortada = req.body.imagenPortada;
            media.anoEstreno = req.body.anoEstreno;
            media.genero = req.body.genero._id;
            media.productora = req.body.productora._id;
            media.tipo = req.body.tipo._id;
            media.director = req.body.director._id;
            media.fechaActualizacion = new Date;
            media = await media.save();
            res.send(media);
        
            
        } catch (error) {
            console.log(error);
            res.status(500).send('error ocurrido');
        }});

        router.delete('/:MediaId', async function (req,res){
            try {
                console.log('aqui');
                const errors =validationResult(req);
                if(!errors.isEmpty){
                    return res.status(400).json({mensaje: errors.array()});
                }
                let media = await Media.findById(req.params.MediaId);
                if (!media){
                    return res.status(400).send('media no existe');
                }
                
                await media.deleteOne();
                res.status(200).send({ mensaje: 'Media eliminada con éxito' });
            
                
            } catch (error) {
                console.log(error);
                res.status(500).send('error ocurrido');
            }});
    module.exports = router;
module.exports = router;