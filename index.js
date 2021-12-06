const express = require('express')
const app = express()

// Localmente o servidor sobe na porta 3000.
// Quando rodamos no Heroku a porta é configurada por eles e passada como uma variável de ambiente
// e recebid aqui pela variável process.env.PORT.
const port = process.env.PORT || '3000';

// Importando o serviço "Calculadora"
const calculator = require('./calculator');

// Disponibilizando o conteúdo da pasta public como estático na raíz
// http://localhost:3000/ agora aponta para http://localhost:3000/index.html
app.use(express.static('public'))

// O endpoint que faz o cálculo usando o serviço "Calculadora"
app.get('/calculate', (req, res) => {
    const result = calculator.calculate(req.query.operand1, req.query.operand2, req.query.operator);
    res.json({ result });
})

// Inicia o servidor na porta `port`
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
