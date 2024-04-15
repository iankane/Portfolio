const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT);

app.get('/api/customers', (req, res) => {
    res.send(req.params.customers);
})

app.post('/api/customers', (req, res) => {
    res.send(req.params.customers);
})
