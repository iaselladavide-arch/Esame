const CorsoAcademy = require('../models/CorsoAcademy');
const AssegnazioneCorso = require('../models/AssegnazioneCorso');

exports.getCorsi = async (req, res) => {
  try {
    const { categoria, attivo } = req.query;
    const filter = {};

    if (categoria) filter.categoriaId = categoria;
    if (attivo !== undefined) filter.attivo = attivo === 'true';

    const corsi = await CorsoAcademy.find(filter).populate('categoriaId', 'nome');
    res.json({ success: true, data: corsi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCorsoById = async (req, res) => {
  try {
    const corso = await CorsoAcademy.findById(req.params.id).populate('categoriaId');
    if (!corso) return res.status(404).json({ success: false, message: 'Corso non trovato' });
    res.json({ success: true, data: corso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCorso = async (req, res) => {
  try {
    const { titolo, descrizione, categoriaId, durataOre, obbligatorio } = req.body;

    if (!titolo?.trim()) return res.status(400).json({ success: false, message: 'Titolo è obbligatorio' });
    if (!descrizione?.trim()) return res.status(400).json({ success: false, message: 'Descrizione è obbligatoria' });
    if (!categoriaId) return res.status(400).json({ success: false, message: 'Categoria è obbligatoria' });
    if (!durataOre || durataOre <= 0) return res.status(400).json({ success: false, message: 'Durata deve essere > 0' });

    const corso = new CorsoAcademy({
      titolo: titolo.trim(),
      descrizione: descrizione.trim(),
      categoriaId,
      durataOre,
      obbligatorio: obbligatorio || false
    });

    await corso.save();
    await corso.populate('categoriaId', 'nome');
    res.status(201).json({ success: true, data: corso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCorso = async (req, res) => {
  try {
    const corso = await CorsoAcademy.findById(req.params.id);
    if (!corso) return res.status(404).json({ success: false, message: 'Corso non trovato' });

    Object.assign(corso, req.body);
    await corso.save();
    await corso.populate('categoriaId', 'nome');
    res.json({ success: true, data: corso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.disattivaCorso = async (req, res) => {
  try {
    const corso = await CorsoAcademy.findByIdAndUpdate(
      req.params.id,
      { attivo: false },
      { new: true }
    ).populate('categoriaId', 'nome');

    if (!corso) return res.status(404).json({ success: false, message: 'Corso non trovato' });
    res.json({ success: true, data: corso });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCorso = async (req, res) => {
  try {
    const assegnazioni = await AssegnazioneCorso.findOne({ corsoId: req.params.id });
    if (assegnazioni) {
      return res.status(400).json({ success: false, message: 'Corso non può essere eliminato: ha assegnazioni' });
    }

    const corso = await CorsoAcademy.findByIdAndDelete(req.params.id);
    if (!corso) return res.status(404).json({ success: false, message: 'Corso non trovato' });
    res.json({ success: true, message: 'Corso eliminato' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
