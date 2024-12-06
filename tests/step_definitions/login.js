const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium} = require('playwright');
const { expect } = require('@playwright/test'); 

let browser;
let page;

Given('que o usuário está na página de login', async function () {
  // Inicia o navegador e abre uma nova página
  browser = await chromium.launch({ headless: false }); // Defina headless: true para não abrir o navegador visualmente
  page = await browser.newPage();
  await page.goto('https://front.serverest.dev/login'); // Substitua pelo URL da página de login
});

When('o usuário insere as credenciais válidas', async function () {
  // Preenche os campos de login com as credenciais
  await page.fill('[data-testid="email"]', 'eduardocn@yahoo.com.br');
  await page.fill('[data-testid="senha"]', 'Sn00pd0g'); // Substitua pelo seletor correto
  await page.click('[data-testid="entrar"]'); // Substitua pelo seletor correto do botão de login
});

Then('o usuário deve ser redirecionado para a página inicial', async function () {
    // Verifica se a URL da página inicial foi carregada após o login
    await page.waitForNavigation({ waitUntil: 'load' });
    const currentURL = page.url();
  
    // Usando expect do Playwright para verificar se a URL contém o trecho esperado
    expect(currentURL).toContain('https://front.serverest.dev/home'); // Verifica se a URL contém o trecho
  
    await browser.close();
  });