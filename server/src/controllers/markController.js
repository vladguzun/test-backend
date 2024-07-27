const { getMarksService, addMarkService, updateMarkService, deleteMarkService } = require('../services/markService');

const getMarks = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const marks = await getMarksService(teacherId);
    res.json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).send('Error fetching marks');
  }
};

const addMark = async (req, res) => {
  const { score, studentId, subjectId } = req.body;
  try {
    const mark = await addMarkService(score, studentId, subjectId);
    res.json(mark);
  } catch (error) {
    console.error('Error adding mark:', error);
    res.status(500).send('Error adding mark');
  }
};

const updateMark = async (req, res) => {
  const { score, studentId, subjectId } = req.body;
  try {
    const mark = await updateMarkService(score, studentId, subjectId);
    res.json(mark);
  } catch (error) {
    console.error('Error updating mark:', error);
    res.status(500).send('Error updating mark');
  }
};

const deleteMark = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteMarkService(id);
    res.status(200).json({ message: 'Mark deleted successfully' });
  } catch (error) {
    console.error('Error deleting mark:', error);
    res.status(500).send('Error deleting mark');
  }
};

module.exports = { getMarks, addMark, updateMark, deleteMark };
