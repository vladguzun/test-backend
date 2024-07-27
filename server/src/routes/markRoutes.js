const express = require('express');
const { getMarks, addMark, updateMark, deleteMark } = require('../controllers/markController');
const router = express.Router();

router.get('/', getMarks);
router.post('/', addMark);
router.put('/', updateMark);
router.delete('/:id', deleteMark);

module.exports = router;
