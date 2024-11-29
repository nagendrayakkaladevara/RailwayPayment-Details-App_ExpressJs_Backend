require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/');
const Visitor = require('./models/counterAppModel');
const VisitorPolling = require('./models/counterAppModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/track-visitor', async (req, res) => {
    try {
        let visitor = await Visitor.findOne();

        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count += 1;
        }
        
        await visitor.save();

        res.json({ message: 'Visitor count updated', count: visitor.count });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/track-polling-visitor', async (req, res) => {
    try {
        let visitor = await VisitorPolling.findOne();

        if (!visitor) {
            visitor = new VisitorPolling({ count: 1 });
        } else {
            visitor.count += 1;
        }
        
        await visitor.save();

        res.json({ message: 'Visitor count updated', count: visitor.count });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: '404 Not Found' });
});

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
