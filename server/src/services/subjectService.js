const prisma = require('../prisma/prismaClient');

const getSubjectsService = (teacherId) => {
  return prisma.subject.findMany({
    where: {
      students: {
        some: {
          student: {
            teacherId,
          },
        },
      },
    },
    include: {
      students: {
        include: {
          student: true,
        },
      },
    },
  });
};

const addSubjectService = (name, studentIds) => {
  return prisma.subject.create({
    data: {
      name,
      students: studentIds.length > 0 ? {
        create: studentIds.map(studentId => ({
          student: { connect: { id: studentId } },
        })),
      } : undefined,
    },
  });
};

const updateSubjectService = (id, name, studentIds) => {
  return prisma.subject.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      students: {
        deleteMany: {},
        create: studentIds.map(studentId => ({
          student: { connect: { id: studentId } },
        })),
      },
    },
  });
};

const deleteSubjectService = async (id) => {
  await prisma.mark.deleteMany({
    where: { subjectId: parseInt(id, 10) },
  });

  await prisma.subjectStudent.deleteMany({
    where: { subjectId: parseInt(id, 10) },
  });

  await prisma.subject.delete({
    where: { id: parseInt(id, 10) },
  });
};

module.exports = { getSubjectsService, addSubjectService, updateSubjectService, deleteSubjectService };
