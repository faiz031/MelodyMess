import express from 'express';
import { join } from 'path';
import playlistRoutes from './routes/playlistRoutes.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(playlistRoutes);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:${port}`);
});
