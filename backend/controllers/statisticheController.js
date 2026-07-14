const AssegnazioneCorso = require('../models/AssegnazioneCorso');
const CorsoAcademy = require('../models/CorsoAcademy');

exports.getStatistiche = async (req, res) => {
  try {
    const { mese, categoria, dipendente } = req.query;
    const filter = {};

    // Filtrare per mese (formato: 2026-05)
    if (mese) {
      const [year, month] = mese.split('-');
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      filter.dataAssegnazione = { $gte: startDate, $lte: endDate };
    }

    if (dipendente) filter.dipendenteId = dipendente;

    const assegnazioni = await AssegnazioneCorso.find(filter)
      .populate('corsoId')
      .populate('dipendenteId', 'nome cognome');

    // Aggregare per categoria
    const statsPerCategoria = {};

    for (const assegnazione of assegnazioni) {
      if (!assegnazione.corsoId) continue;

      const categoriaId = assegnazione.corsoId.categoriaId.toString();

      if (!statsPerCategoria[categoriaId]) {
        statsPerCategoria[categoriaId] = {
          categoria: assegnazione.corsoId.categoriaId.toString(),
          numeroAssegnazioni: 0,
          numeroCompletamenti: 0
        };
      }

      statsPerCategoria[categoriaId].numeroAssegnazioni++;
      if (assegnazione.stato === 'Completato') {
        statsPerCategoria[categoriaId].numeroCompletamenti++;
      }
    }

    // Convertire a array e aggiungere percentuale
    const result = Object.values(statsPerCategoria).map(stat => ({
      categoria: stat.categoria,
      numeroAssegnazioni: stat.numeroAssegnazioni,
      numeroCompletamenti: stat.numeroCompletamenti,
      percentualeCompletamento: stat.numeroAssegnazioni > 0
        ? ((stat.numeroCompletamenti / stat.numeroAssegnazioni) * 100).toFixed(2)
        : 0
    }));

    // Popolare i nomi delle categorie
    const categorieMap = await CorsoAcademy.distinct('categoriaId', { categoriaId: { $in: result.map(r => r.categoria) } });
    const categorie = await require('../models/Categoria').find({ _id: { $in: categorieMap } });
    const categorieDict = {};
    categorie.forEach(c => {
      categorieDict[c._id.toString()] = c.nome;
    });

    const finalResult = result.map(r => ({
      ...r,
      categoriaNome: categorieDict[r.categoria] || 'Sconosciuta'
    }));

    res.json({ success: true, data: finalResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
