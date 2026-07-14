const Categoria = require('../models/Categoria');

exports.getCategorie = async (req, res) => {
  try {
    const categorie = await Categoria.find();
    res.json({ success: true, data: categorie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { nome, descrizione } = req.body;

    if (!nome?.trim()) return res.status(400).json({ success: false, message: 'Nome è obbligatorio' });

    const categoria = new Categoria({
      nome: nome.trim(),
      descrizione: descrizione?.trim() || ''
    });

    await categoria.save();
    res.status(201).json({ success: true, data: categoria });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
