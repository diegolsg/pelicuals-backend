const {Router} = require('express');
const Genero = require('../models/Genero');
const {validationResult,check} = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion','invalid.descripcion').not().isEmpty()
], async function (req,res){
    try {
        console.log('aqui');
        const errors =validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({mensaje: errors.array()});
        }
        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;
        genero = await genero.save();
        res.send(genero);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ocurrido');
    }});

    router.put('/:generoId', [
        check('nombre','invalid.nombre').not().isEmpty(),
        check('estado','invalid.estado').isIn(['Activo','Inactivo']),
        check('descripcion','invalid.descripcion').not().isEmpty()
    ], async function (req,res){
        try {
            console.log('aqui');
            const errors =validationResult(req);
            if(!errors.isEmpty){
                return res.status(400).json({mensaje: errors.array()});
            }
            let genero = await Genero.findById(req.params.generoId);
            if (!genero){
                return res.status(400).send('genero no existe');
            }
            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;
            genero.fechaActualizacion = new Date;
            genero = await genero.save();
            res.send(genero);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('error ocurrido');
        }});
module.exports = router;