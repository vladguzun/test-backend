const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prismaClient');
require('dotenv').config();

const registerService = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.teacher.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};

const loginService = async (email, password) => {
  const teacher = await prisma.teacher.findUnique({
    where: { email },
  });

  if (teacher && await bcrypt.compare(password, teacher.password)) {
    return jwt.sign({ email: teacher.email, id: teacher.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  return null;
};

module.exports = { registerService, loginService };
