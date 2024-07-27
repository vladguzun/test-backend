const { getStudentsService, addStudentService, updateStudentService, deleteStudentService } = require('../services/studentService');

const getStudents = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const students = await getStudentsService(teacherId);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students');
  }
};

const addStudent = async (req, res) => {
  const { name } = req.body;
  const teacherId = req.user.id;
  try {
    const student = await addStudentService(name, teacherId);
    res.json(student);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Error adding student');
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const teacherId = req.user.id;
  try {
    const student = await updateStudentService(id, name, teacherId);
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Error updating student');
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteStudentService(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Error deleting student');
  }
};

module.exports = { getStudents, addStudent, updateStudent, deleteStudent };
