const express = require('express');
const router = express.Router();

const Model = require('../models/model');


router.get('/',(req, res, next) => {
    Model.find((err,models) => {
        if (err) {
            console.log(err);
        }
        else{
            res.render('models/index', {
                title: 'Model List',
                dataset: models
            });
        }
    });
});
router.get('/add', (req, res, next)=> {
    res.render('models/add', { title: 'Add a new Model'});
});

router.post('/add', (req, res, next)=>{
    Model.create({
        name: req.body.name
    }, (err, newModel)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/models');
        }

    });
});

module.exports = router;