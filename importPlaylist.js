const fs = require('fs').promises;
const path = require('path');
const dbConnect = require('../server/dbConnect.js');

async function importPlaylist() {
    const filePath = path.join(__dirname, 'data', 'playlist.json');
    const db = await dbConnect();
    const collection = db.collection('Playlist');

    try {
        const fileContent = await fs.readFile(filePath);
        const playlistData = JSON.parse(fileContent.toString());
        const result = await collection.insertMany(playlistData);
        console.log(`${result.insertedCount} éléments ont été insérés.`);
    } catch (error) {
        console.error('Erreur lors de l\'importation de la playlist:', error);
    }
}

importPlaylist().catch(console.error);