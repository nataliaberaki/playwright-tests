import { test, expect } from '@playwright/test';


//logger inn før hver test
test.beforeEach(async ({ page }) => {
    console.log("Kjører før hver test");

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', 'Bruker');
    await page.fill('input[name="password"]', 'bruker123');
    await page.click('input[type="submit"]');

    // Sjekk om login feilet
    if (await page.locator('h1.title:has-text("Error!")').isVisible()) {
        throw new Error('Login failed: check your username or password!');
    }
});

// Logg ut etter hver test
test.afterEach(async ({ page }) => {
    console.log('Logger ut etter testen');
    await page.goto('https://parabank.parasoft.com/parabank/logout.htm');
});

//tester om man kan lage ny bruker
test('new Account', async ({page})=>{

//ny bruker
    await page.click('a[href *="openaccount.htm"]');

//velg checking account
await page.selectOption('select#type', '0');

//velger eksisterende konto
await page.selectOption('select[name="fromAccountId"]', '51972');

// Send betaling
await page.click('input[type="button"]');

// Sjekk at betalingen ble gjennomført
await expect(page.locator('h1').filter({ hasText: 'Account Opened!'})).toHaveText('Account Opened!');
});

