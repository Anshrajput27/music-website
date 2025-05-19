const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow CORS for local frontend
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve songs statically
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// API to get list of songs
app.get('/api/songs', (req, res) => {
    const songsDir = path.join(__dirname, 'songs');
    fs.readdir(songsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to list songs' });
        }
        // Only mp3 files
        const songFiles = files.filter(f => f.endsWith('.mp3'));
        // Return as array of objects
        const songs = songFiles.map(filename => ({
            title: path.parse(filename).name,
            artist: "ANSH",
            src: `/songs/${filename}`
        }));
        res.json(songs);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});