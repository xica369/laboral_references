const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const candidates = require('../candidates.json')

//shows all candidates with basic information
router.get('/', (req, res) => {
    res.json(candidates);
});

//creates a new candidate
router.post('/new', (req, res) => {
    const { name, last_name, phone, address } = req.body;
    if (name && last_name && phone && address) {
        const id = candidates.length + 1;
        const newCandidate = {id, ...req.body};
        candidates.push(newCandidate);
        res.json(candidates);
    } else {
        res.status(500).json({error: 'There was an error'});
    }
});

//delete an especific candidate
router.delete('/delete/:candidate_id', (req, res) => {
    const { candidate_id } = req.params;
    _.each(candidates, (candidate, i) => {
        if (candidate.id == candidate_id) {
            candidates.splice(i, 1);
        }
    });
    res.json(candidates);
});

//update a candidate
router.put('/update/:candidate_id', (req, res) => {
    const { candidate_id } = req.params;
    const { name, last_name, phone, address } = req.body;
    if (name && last_name && phone && address) {
        _.each(candidates, (candidate, i) => {
            if (candidate.id == candidate_id) {
                candidate.name = name;
                candidate.last_name = last_name;
                candidate.phone = phone;
                candidate.address = address
            }
        });
        res.json(candidates);
    } else {
        res.status(500).json({error: "There was an error"});
    }
});

module.exports = router;