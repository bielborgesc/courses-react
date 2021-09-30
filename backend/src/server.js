const express = require('express')
const routes = require('./routes');

require('./database')


const app = express()
const port = 3000


app.use(express.json())
app.use(routes);

app.listen(port, () => console.log(`Server is running in port ${port}`))