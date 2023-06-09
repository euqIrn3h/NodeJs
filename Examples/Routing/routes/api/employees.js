const { da } = require('date-fns/locale');
const express = require('express');
const router = express.Router();

const data = {};
data.employees = require('../../data/data.json');

router.route('/')
    .get( (req, res) => {
        res.json(data.employees);
    })
    .post( (req,res) => {
        res.json({
            "firstname": req.body.firstname
        });
    })
    .put( (req,res) => {
        res.json({
            "firstname": req.body.firstname
        });
    })
    .delete( (req,res) => {
        res.json({ "id": req.body.id});
    });

router.route('/:id')
    .get( (req,res) => {
        res.json({ "id": req.params.id });
    });

module.exports = router;
