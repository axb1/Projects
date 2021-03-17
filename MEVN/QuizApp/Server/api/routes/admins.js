const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin.length >= 1) {
            return res.status(422).json({
                message: 'Mail already exists'
            })
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.json.status(500).json({
                        error: err
                    });
                } else {
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    admin
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Admin created'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
        }
    })
    .catch();

});


router.post('/login', (req, res, next) => {
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if(admin.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcryptjs.compare(req.body.password, admin[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                }) 
            }
            if (result) {
                const token = jwt.sign({
                    email: admin[0].email,
                    adminId: admin[0].adminId
                }, "secret",  {expiresIn: "1h"}, )
                return res.status(200).json({
                    message: 'Auth succesful',
                    token: token
                })
            }
            return res.status(401).json({
                message: 'Auth failed'
            }) 
        })
    })
    .catch()
})

router.delete('/:adminId', (req, res, next) => {
    Admin.deleteOne({_id: req.params.adminId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Admin deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;