const {Router} = require('express');
const Productora = require('../models/Productora');
const {validationResult,check} = require('express-validator');

const router = Router();

router.get('/', async function (req,res){
    try {
        const productoras = await Productora.find();
        res.send(productoras);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ocurrido');
    }
});

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('slogan','invalid.slogan').not().isEmpty(),
    check('descripcion','invalid.descripcion').not().isEmpty(),
], async function (req,res){
    try {
        console.log('aqui');
        const errors =validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({mensaje: errors.array()});
        }
        let productora = new Productora();
        productora.nombreProductora = req.body.nombreProductora;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora = await productora.save();
        res.send(productora);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error ocurrido');
    }});

    router.put('/:productoraId', [
        check('nombre','invalid.nombre').not().isEmpty(),
        check('estado','invalid.estado').isIn(['Activo','Inactivo']),
        check('slogan','invalid.slogan').not().isEmpty(),
        check('descripcion','invalid.descripcion').not().isEmpty(),
    ], async function (req,res){
        try {
            console.log('aqui');
            const errors =validationResult(req);
            if(!errors.isEmpty){
                return res.status(400).json({mensaje: errors.array()});
            }
            let productora = await Productora.findById(req.params.productoraId);
            if (!productora){
                return res.status(400).send('productora no existe');
            }
            productora.nombreProductora = req.body.nombreProductora;
            productora.estado = req.body.estado;
            productora.slogan = req.body.slogan;
            productora.descripcion = req.body.descripcion;
            productora.fechaActualizacion = new Date;
            productora = await productora.save();
            res.send(productora);
            
        } catch (error) {
            console.log(error);
            res.status(500).send('error ocurrido');
        }});
module.exports = router;