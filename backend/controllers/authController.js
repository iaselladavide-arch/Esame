const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (id, ruolo) => {
  return jwt.sign({ id, ruolo }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, cognome, email, password, confirmPassword, ruolo } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Le password non coincidono' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email già registrata' });
    }

    user = new User({
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.toLowerCase(),
      password,
      ruolo: ruolo || 'dipendente'
    });

    await user.save();

    const token = generateToken(user._id, user.ruolo);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        ruolo: user.ruolo
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Email o password non validi' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email o password non validi' });
    }

    const token = generateToken(user._id, user.ruolo);
    res.json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        ruolo: user.ruolo
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      user: {
        id: user._id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        ruolo: user.ruolo
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
