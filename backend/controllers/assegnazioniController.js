const AssegnazioneCorso = require('../models/AssegnazioneCorso');
const CorsoAcademy = require('../models/CorsoAcademy');

exports.getAssegnazioni = async (req, res) => {
  try {
    const { stato, categoria, corso, dipendente } = req.query;
    const filter = {};

    if (req.userRole === 'dipendente') {
      filter.dipendenteId = req.userId;
    } else if (dipendente) {
      filter.dipendenteId = dipendente;
    }

    if (stato) filter.stato = stato;
    if (corso) filter.corsoId = corso;

    let query = AssegnazioneCorso.find(filter)
      .populate('corsoId')
      .populate('dipendenteId', 'nome cognome email');

    if (categoria) {
      const corsiByCat = await CorsoAcademy.find({ categoriaId: categoria }).select('_id');
      const corsiIds = corsiByCat.map(c => c._id);
      filter.corsoId = { $in: corsiIds };
      query = AssegnazioneCorso.find(filter)
        .populate('corsoId')
        .populate('dipendenteId', 'nome cognome email');
    }

    const assegnazioni = await query;
    res.json({ success: true, data: assegnazioni });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssegnazioneById = async (req, res) => {
  try {
    const assegnazione = await AssegnazioneCorso.findById(req.params.id)
      .populate('corsoId')
      .populate('dipendenteId', 'nome cognome email');

    if (!assegnazione) {
      return res.status(404).json({ success: false, message: 'Assegnazione non trovata' });
    }

    if (req.userRole === 'dipendente' && assegnazione.dipendenteId._id.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Non autorizzato' });
    }

    res.json({ success: true, data: assegnazione });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAssegnazione = async (req, res) => {
  try {
    const { corsoId, dipendenteId, dataScadenza } = req.body;

    if (!corsoId) return res.status(400).json({ success: false, message: 'Corso è obbligatorio' });
    if (!dipendenteId) return res.status(400).json({ success: false, message: 'Dipendente è obbligatorio' });
    if (!dataScadenza) return res.status(400).json({ success: false, message: 'Data scadenza è obbligatoria' });

    const corso = await CorsoAcademy.findById(corsoId);
    if (!corso) return res.status(404).json({ success: false, message: 'Corso non trovato' });
    if (!corso.attivo) return res.status(400).json({ success: false, message: 'Corso non attivo' });

    const scadenza = new Date(dataScadenza);
    const oggi = new Date();
    if (scadenza < oggi) {
      return res.status(400).json({ success: false, message: 'Data scadenza non può essere nel passato' });
    }

    const assegnazione = new AssegnazioneCorso({
      corsoId,
      dipendenteId,
      dataScadenza: scadenza
    });

    await assegnazione.save();
    await assegnazione.populate('corsoId');
    await assegnazione.populate('dipendenteId', 'nome cognome email');
    res.status(201).json({ success: true, data: assegnazione });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAssegnazione = async (req, res) => {
  try {
    const assegnazione = await AssegnazioneCorso.findById(req.params.id);
    if (!assegnazione) return res.status(404).json({ success: false, message: 'Assegnazione non trovata' });

    Object.assign(assegnazione, req.body);
    await assegnazione.save();
    await assegnazione.populate('corsoId');
    await assegnazione.populate('dipendenteId', 'nome cognome email');
    res.json({ success: true, data: assegnazione });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.completaAssegnazione = async (req, res) => {
  try {
    const assegnazione = await AssegnazioneCorso.findById(req.params.id);
    if (!assegnazione) return res.status(404).json({ success: false, message: 'Assegnazione non trovata' });

    if (req.userRole === 'dipendente' && assegnazione.dipendenteId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Non autorizzato' });
    }

    assegnazione.stato = 'Completato';
    assegnazione.dataCompletamento = new Date();
    await assegnazione.save();

    await assegnazione.populate('corsoId');
    await assegnazione.populate('dipendenteId', 'nome cognome email');
    res.json({ success: true, data: assegnazione });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.annullaAssegnazione = async (req, res) => {
  try {
    const assegnazione = await AssegnazioneCorso.findByIdAndUpdate(
      req.params.id,
      { stato: 'Annullato' },
      { new: true }
    ).populate('corsoId').populate('dipendenteId', 'nome cognome email');

    if (!assegnazione) return res.status(404).json({ success: false, message: 'Assegnazione non trovata' });
    res.json({ success: true, data: assegnazione });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssegnazione = async (req, res) => {
  try {
    const assegnazione = await AssegnazioneCorso.findByIdAndDelete(req.params.id);
    if (!assegnazione) return res.status(404).json({ success: false, message: 'Assegnazione non trovata' });
    res.json({ success: true, message: 'Assegnazione eliminata' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
