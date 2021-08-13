const express = require('express');
const router = express.Router();

const Project = require('../models/project');
const Model = require('../models/model');

router.get('/', (req, res, next) => {
    // res.render('projects/index', { title: 'Watch Shop' });
    Project.find((err, projects) =>{
        if (err) {
            console.log(err);
        }
        else{
            res.render('projects/index', {
                title: 'Watch Shop',
                dataset: projects 
            });
        }
    });
});

 router.get('/add', (req, res, next) => {
    // res.render('projects/add', { title: 'Add a new Project' });
    Model.find((err, models)=> {
        if (err) {
            console.log(err);
        }
        else {
            res.render('projects/add',{
            title: 'Add a new project',
            models: models
             });
        }
    }).sort({ name: 1 });   
 });
 

router.post('/add', (req, res, next) => {
    Project.create({
        name: req.body.name,
        price: req.body.price,
        model: req.body.model,
        color: req.body.color
    }, (err, newProject) =>{
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/projects');
        }
    });
});

router.get('/delete/:_id', (req, res, next)=>{
    Project.remove(
        { _id: req.params._id},
        (err)=> {
            if(err) {
                console.log(err);
            }
            else{
                res.redirect('/projects'); 
            }
        }
    )
})

router.get('/edit/:_id', (req, res, next) => {
   // res.render('projects/edit', {title: 'Update a Project' });
   Project.findById(req.params._id, (err, project) => {
    if (err) {
        console.log(err);
    }
    else {
        Model.find((err, models) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render('projects/edit', {
                    title: 'Update a Project',
                    project: project,
                    models: models
                })
            }
        }).sort({ name: 1 });
    }
})
});

router.post('/edit/:_id', (res, req, next) => {
    Project.findOneAndUpdate(
        {
            name: req.body.name,
            price: req.body.price,
            model: req.body.model,
            color: req.body.color
        },
        (err, updatedProject) => {
            if(err) {
                console.log(err);
            }
            else{
                 res.redirect('projects');
                 
            }
        }
    )
});
module.exports = router;