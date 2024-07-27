const express = require('express');
const { getSubjects, addSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');
const router = express.Router();

router.get('/', getSubjects);
router.post('/', addSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router;
