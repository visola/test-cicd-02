const {Builder, By, Key, until} = require('selenium-webdriver');

const url = process.argv[2] || 'http://localhost:3000';

async function clearForm(driver) {
    await driver.findElement(By.css('[name=operand1]')).clear()
    await driver.findElement(By.css('[name=operand2]')).clear()
}

async function operate(driver, operand1, operand2, operator) {
    await clearForm(driver);
    await driver.findElement(By.css('[name=operand1]')).sendKeys(operand1);
    await driver.findElement(By.css('[name=operand2]')).sendKeys(operand2);
    await driver.findElement(By.css(`[name=operator] > [value=${operator}]`)).click();

    await driver.findElement(By.css('form')).submit();
}

async function assertResultIs(driver, message) {
    await driver.wait(until.elementTextIs(
        await driver.findElement(By.css('p')),
        message
    ), 1000);
}

(async function suite() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);

        const form = await driver.findElement(By.css('form'));

        console.log('Teste: 10 + 20');
        await operate(driver, '10', '20', 'sum');
        await assertResultIs(driver, 'Seu resultado é: 30');
        
        console.log('Teste: 30 - 20');
        await operate(driver, '30', '20', 'subtract');
        await assertResultIs(driver, 'Seu resultado é: 10');
        
        console.log('Teste: 10 * 5');
        await operate(driver, '10', '5', 'multiply');
        await assertResultIs(driver, 'Seu resultado é: 50');
        
        console.log('Teste: 50 / 5');
        await operate(driver, '50', '5', 'divide');
        await assertResultIs(driver, 'Seu resultado é: 10');

    } catch (e) {
        console.log("Erro ao executar os testes");
        console.log('-----');
        console.error('Exceção foi', e);
        console.log('-----');
        const text = await driver.findElement(By.css('p')).getText();
        console.log(`Texto no resultado é: ${text}`);
    } finally {
        await driver.quit();
    }
})();
