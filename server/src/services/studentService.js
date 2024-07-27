const prisma = require('../prisma/prismaClient');

const getStudentsService = (teacherId) => {
  return prisma.student.findMany({
    where: { teacherId },
  });
};

const addStudentService = (name, teacherId) => {
  return prisma.student.create({
    data: { name, teacherId },
  });
};

const updateStudentService = (id, name, teacherId) => {
  return prisma.student.update({
    where: { id: parseInt(id, 10) },
    data: { name, teacherId },
  });
};

const deleteStudentService = async (id) => {
  await prisma.mark.deleteMany({
    where: { studentId: parseInt(id, 10) },
  });

  await prisma.subjectStudent.deleteMany({
    where: { studentId: parseInt(id, 10) },
  });

  await prisma.student.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = { getStudentsService, addStudentService, updateStudentService, deleteStudentService };
