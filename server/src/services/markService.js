const prisma = require('../prisma/prismaClient');

const getMarksService = (teacherId) => {
  return prisma.mark.findMany({
    where: {
      student: {
        teacherId,
      },
    },
  });
};

const addMarkService = async (score, studentId, subjectId) => {
  const existingMark = await prisma.mark.findUnique({
    where: {
      studentId_subjectId: {
        studentId: parseInt(studentId, 10),
        subjectId: parseInt(subjectId, 10),
      },
    },
  });

  if (existingMark) {
    throw new Error('Mark already exists for this student and subject');
  }

  return prisma.mark.create({
    data: {
      score: parseInt(score, 10),
      studentId: parseInt(studentId, 10),
      subjectId: parseInt(subjectId, 10),
    },
  });
};

const updateMarkService = (score, studentId, subjectId) => {
  return prisma.mark.update({
    where: {
      studentId_subjectId: {
        studentId: parseInt(studentId, 10),
        subjectId: parseInt(subjectId, 10),
      },
    },
    data: { score: parseInt(score, 10) },
  });
};

const deleteMarkService = (id) => {
  return prisma.mark.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = { getMarksService, addMarkService, updateMarkService, deleteMarkService };
