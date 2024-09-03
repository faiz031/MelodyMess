const dbConnect = require('../server/dbConnect.js');

async function testConnection() {
    try {
        const db = await dbConnect();
        const collections = await db.listCollections().toArray();
        console.log('Collections dans la base de données :');
        collections.forEach((collection) => console.log(collection.name));
    } catch (err) {
        console.error('Erreur lors du test de la connexion à MongoDB:', err);
    }
}

testConnection();
