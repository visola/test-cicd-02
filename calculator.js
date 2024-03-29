// Este é o serviço Calculadora
// Numa aplicação em camadas é comum colocar a lógica de negócio
// na camada de serviços, representado por este módulo.
function calculate(operand1, operand2, operator) {
    switch (operator) {
        case 'sum':
            return parseFloat(operand1) + parseFloat(operand2);
        case 'subtract':
            return parseFloat(operand1) - parseFloat(operand2);
        case 'multiply':
                return parseFloat(operand1) * parseFloat(operand2);
        case 'divide':
            return parseFloat(operand1) / parseFloat(operand2);
    }
}

module.exports = {
    calculate,
}