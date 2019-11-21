const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const laboral_references = require('../laboral_references.json')

//shows the laboral references of an especific candidate
router.get('/:candidate_id', (req, res) => {
    let references = [];
    const { candidate_id } = req.params;
    _.each(laboral_references, (laboral_reference, i) => {
        if (laboral_reference.candidate_id == candidate_id) {
            references.push(laboral_reference);
        }
    });
    res.json(references);
});

//creates a new laboral reference to a candidate
router.post('/new', (req, res) => {
    const { company_name, contact_name, start_at, leave_at, candidate_id } = req.body;
    if (company_name && contact_name && start_at && leave_at) {
        const id = laboral_references.length + 1;
        const newLaboralReference = {id, ...req.body};
        laboral_references.push(newLaboralReference);
        res.json(laboral_references);
    } else {
        res.status(500).json({error: 'There was an error'});
    }
});

//deletes an especific laboral reference
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    _.each(laboral_references, (laboral_reference, i) => {
        if (laboral_reference.id == id) {
            laboral_references.splice(i, 1);
        }
    });
    res.json(laboral_references);
});

//deletes all laboral references to an especific candidate
router.delete('/delete_all/:candidate_id', (req, res) => {
    const { candidate_id } = req.params;
    _.each(laboral_references, (laboral_reference, i) => {
        if (laboral_reference.candidate_id == candidate_id) {
            laboral_references.splice(i, 1);
        }
    });
    res.json(laboral_references);
});

//updates an especific laboral reference
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { company_name, contact_name, start_at, leave_at } = req.body;
    if (company_name&& contact_name&& start_at && leave_at) {
        _.each(laboral_references, (laboral_reference, i) => {
            if (laboral_reference.id == id) {
                laboral_reference.company_name= company_name;
                laboral_reference.contact_name= contact_name;
                laboral_reference.start_at = start_at;
                laboral_reference.leave_at = leave_at
            }
        });
        res.json(laboral_references);
    } else {
        res.status(500).json({error: "There was an error"});
    }
});

module.exports = router;