import { test, expect } from '@playwright/test';

//logger inn før hver test
test.beforeEach(async ({ page }) => {
    console.log("Kjører før hver test");

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', 'Danny');
    await page.fill('input[name="password"]', 'abcd1234');
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

test('Request Loan', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

     // Gå til loan siden
     await page.click('a[href*="requestloan.htm"]');

     //loan amount
     await page.fill('input[id="amount"]', '100 000');
     await page.fill('input[id="downPayment"]', '10 000');

     //Velg konto
     await page.selectOption('select[name="fromAccountId"]', '13566');

    // click to open new account
    await page.click('input[type="button"]');

    // Sjekk at betalingen ble gjennomført
    await expect(page.locator('h1').filter({ hasText: 'Loan Request Processed' })).toHaveText('Loan Request Processed');

});
