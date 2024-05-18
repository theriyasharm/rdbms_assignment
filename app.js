const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


app.get('/data', (req, res) => {
    const query = 'SELECT ID, Name, Salary FROM cake.employee';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error querying the database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
});


app.post('/data', (req, res) => {
    const newData = req.body;
    const query = 'INSERT INTO cake.employee SET ?'; 
    db.query(query, newData, (err, result) => {
        if (err) {
            console.error('Error inserting data into the database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Data added successfully' });
    });
});


app.delete('/data/:id', (req, res) => {
    const idToDelete = req.params.id;
    const query = `DELETE FROM cake.employee WHERE ID = ${idToDelete}`; 
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting data from the database', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
