const express = require('express')
const routes = require('./routes');

const cors = require('cors')

require('./database')

const app = express()
const port = 3000

const corsOptions ={
    origin:'http://localhost:3006', 
    credentials:true,                   //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.json())
app.use(routes);

app.listen(port, () => console.log(`Server is running in port ${port}`))