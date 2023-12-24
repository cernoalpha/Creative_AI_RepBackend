const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const rateLimit = require('express-rate-limit');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { generatePosters } = require('./posterController');
const { verifyToken } = require('./verifyToken');

const admin = require('firebase-admin');
const serviceAccount = require('./creative-ai-364b0-firebase-adminsdk-peeu1-e828829410.json');


const app = express();
app.enable('trust proxy');
const PORT = process.env.PORT || 3001;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://creative-ai-364b0-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const posterLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 10, 
    message: 'Too many requests For poster generation, please try again later after 1 hr.',
});

app.use(cors());
app.use(express.json());
app.use('/poster', posterLimiter);

const fetch = require('node-fetch'); 



app.post('/poster',verifyToken, generatePosters);

app.get('/', (req, res) => {
    res.status(200).contentType('text/plain').send('Server shaddy Rep is healthy 😀🥳');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





