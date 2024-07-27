const { registerService, loginService } = require('../services/authService');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await registerService(email, password);
    res.json({ teacher });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).send('Error registering teacher');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
};

module.exports = { register, login };
