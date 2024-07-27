const { getSubjectsService, addSubjectService, updateSubjectService, deleteSubjectService } = require('../services/subjectService');

const getSubjects = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const subjects = await getSubjectsService(teacherId);
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
};

const addSubject = async (req, res) => {
  const { name, studentIds } = req.body;
  const teacherId = req.user.id;
  try {
    const subject = await addSubjectService(name, studentIds);
    res.status(201).json(subject);
  } catch (error) {
    console.error('Error adding subject:', error);
    res.status(500).send('Error adding subject');
  }
};

const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, studentIds } = req.body;
  const teacherId = req.user.id;
  try {
    const subject = await updateSubjectService(id, name, studentIds);
    res.json(subject);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).send('Error updating subject');
  }
};

const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSubjectService(id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).send('Error deleting subject');
  }
};

module.exports = { getSubjects, addSubject, updateSubject, deleteSubject };
