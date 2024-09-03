const express = require('express');
const dbConnect = require('../server/dbConnect.js'); // Assurez-vous que le chemin est correct
const app = express();
const port = 3000;

app.get('/playlist', async (req, res) => {
    try {
        const db = await dbConnect();
        const collection = db.collection('playlist');
        const playlist = await collection.find({}).toArray();
        res.json(playlist);
    } catch (error) {
        console.error('Erreur lors de la récupération de la playlist:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://mongodb://localhost/)::${port}`);
});