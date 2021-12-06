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
