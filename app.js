require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/')

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// middlewears
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use((req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
