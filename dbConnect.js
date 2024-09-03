import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'PlaylistDB';
let dbInstance = null;

async function dbConnect() {
    if (dbInstance) {
        console.log('Utilisation de la connexion existante à MongoDB.');
        return dbInstance;
    }

    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log('Connecté à MongoDB');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
        throw err;
    }
}

export default dbConnect;
