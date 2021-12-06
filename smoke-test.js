// Os "smoke tests" são testes automatizados para garantir que
// a aplicação está funcionando corretamente. Eles fazem parte
// de um conjunto de testes chamado testes de integração onde
// a aplicação é testada num ambiente real (integrando todos os módulos)
// mais próximo de produção possível.

// Para estes testes utilizamos o Selenium Web Driver, que tem integração
// com diversos browsers. Nestes testes usamos o Chrome mas é possível utilizar
// os testes em mais de um browser se tiver a máquina configurada corretamente.

// Selenium: https://www.selenium.dev/
// Selenium Webdriver para Node.js: https://www.npmjs.com/package/selenium-webdriver

const {Builder, By, Key, until} = require('selenium-webdriver');

// Nesta linha a URL para ser testada na linha de comando como um argumento.
// Isso significa que os mesmos testes podem ser rodados em qualquer ambiente: local, dev, stage, prod, etc.
// Para rodar os testes apontando para o ambiente local, use o comando: node smoke-test.js
// Para rodar num ambiente específico, use o comando: node smoke-test.js {url}, exemplo:  node smoke-test.js https://test-cicd-02.herokuapp.com/
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
    // Mude esta linha para testar em outros browsers
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
