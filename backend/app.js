const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config()
const router = require('./src/routes/router.js')
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require('./src/middleware/errorHandler.js');
const http = require('http')
const { Server } = require('socket.io');
const axios = require('axios');
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json({ 'type': 'application/json' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(router);
app.use(errorHandler)

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('Connected to DB')).catch(err => console.log(err))


io.on('connection', (socket) => {
    
    socket.on('message', async (data) => {
        socket.emit('message', { user: '', txt: data })
        if (data.includes('hungry') || data.includes('Hungry')) {
            setTimeout(() => {
                socket.emit('botMsg', { user: 'Foodea Bot', txt: 'What would you like to eat ?' })
            }, 950)
        }

        async function fetchMeals(url) {
            const response = await axios.get(url);
            return response.data
        }
        const link = `https://api.spoonacular.com/recipes/complexSearch?apiKey=d151b189eb3b4d309fbf342d79dac994&includeIngredients=${ data.split(' ').join(',') }`
        const meals = await fetchMeals(link)

        socket.emit('meals', meals)
    })
})



const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server up and running on port: ${ PORT }`)
})