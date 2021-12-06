// Os testes unitários para o nosso serviço.
// Aqui garantimos que a lógica de negócio está correta e
// pode ser testada automaticamente e rapidamente num ambiente
// de integração contínua como o GitHub Workflows.

// Para estes testes usamos o Jest: https://jestjs.io/

// Para rodar os testes, na linha de comando rode: "npm test"
const calculator = require('./calculator');

test('1 + 1 = 2', () => {
    expect(calculator.calculate(1, 1, 'sum'))
        .toBe(2);
});

test('10 - 5 = 5', () => {
    expect(calculator.calculate(10, 5, 'subtract')).toBe(5);
});

test('10 * 5 = 50', () => {
    expect(calculator.calculate(10, 5, 'multiply')).toBe(50);
});

test('50 / 5 = 10', () => {
    expect(calculator.calculate(50, 5, 'divide')).toBe(10);
});
