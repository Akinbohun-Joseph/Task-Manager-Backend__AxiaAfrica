const express =  require('express')
const authMiddleware =require('./middleware/authMiddleware')
const jwtConfig = require('./config/jwtConfig')
const connectDB = require('./DBconnection/MongoDBconnect')
const userRoutes = require('./routes/userRoutes')
const TaskRoutes = require('./routes/TaskRoutes')
const authorizeRole = require('./middleware/authorizeRole')
const authMiddleware = require('./middleware/authMiddleware')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT

connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api', userRoutes)
app.use('/api', TaskRoutes) 


app.get('/', (req, res)=>{
    res.send ('Task Manager API is running!')
})
app.listen(5000, ()=> console.log('listening on ${port}' ))