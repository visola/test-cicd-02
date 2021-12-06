const express = require('express')
const app = express()
const port = process.env.PORT || '3000';

const calculator = require('./calculator');

app.get('/calculate', (req, res) => {
    const result = calculator.calculate(req.query.operand1, req.query.operand2, req.query.operator);
    res.json({ result });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
