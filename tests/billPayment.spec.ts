import { test, expect } from '@playwright/test';
//fikk bedskjed av TA om å hente formel fra chat gpt

//generer brukernavn og passord
function generateUsername() {
    return `user_${Math.floor(Math.random() * 100000)}`;
}

let username = generateUsername();
const password = 'abcd1234';

test.beforeAll(async ({ page }) => {
    console.log("Registrerer ny bruker");

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.click('a[href*="register.htm"]');

    await page.fill('input[name="customer.firstName"]', 'Medina Ysabel');
    await page.fill('input[name="customer.lastname"]', 'Bersalona Borillo');
    await page.fill('input[name="customer.address.street"]', 'Silurveien 2');
    await page.fill('input[name="customer.address.city"]', 'Oslo');
    await page.fill('input[name="customer.address.state"]', 'Oslo');
    await page.fill('input[name="customer.address.zipCode"]', '0661');
    await page.fill('input[name="customer.phoneNumber"]', '12345678');
    await page.fill('input[name="customer.ssn"]', '998877665544');
    await page.fill('input[name="customer.username"]', username);
    await page.fill('input[name="customer.password"]', password);
    await page.fill('input[name="repeatedPassword"]', password);

    await page.click('input[type="submit"]');

    // Verifiser at registrering var vellykket
    await expect(page.locator('h1.title')).toHaveText('Welcome ' + username);
});



//logger inn før hver test
test.beforeEach(async ({ page }) => {
    console.log("Logger inn før test");
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');

    // Sjekk at login var vellykket
    await expect(page.locator('h1.title')).not.toHaveText('Error!');
    
    /*
    await page.fill('input[name="username"]', 'Danny');
    await page.fill('input[name="password"]', 'abcd1234');
    await page.click('input[type="submit"]');

    // Sjekk om login feilet
    if (await page.locator('h1.title:has-text("Error!")').isVisible()) {
        throw new Error('Login failed: check your username or password!');
    }
        */



    /* Gå til registerings side
    await page.click('a[href*="register.htm"]');
    
    // Fyll inn register skjema
    await page.fill('input[name="customer.firstName"]', 'Medina Ysabel');
    await page.fill('input[name="customer.lastname"]', 'Bersalona Borillo');
    await page.fill('input[name="customer.address.street"]', 'Silurveien 2');
    await page.fill('input[name="customer.address.city"]', 'Oslo');
    await page.fill('input[name="customer.address.state"]', 'Oslo');
    await page.fill('input[name="customer.address.zipCode"]', '0661');
    await page.fill('input[name="customer.phoneNumber"]', '12345678');
    await page.fill('input[name="customer.ssn"]', '998877665544');
    await page.fill('input[name="customer.username"]', 'Danny Abdi');
    await page.fill('input[name="customer.password"]', 'abcd1234');
    await page.fill('input[name="repeatedPassword"]', 'abcd1234');
    
    //submitter skjema
    await page.click('input[type="submit"]');*/
});



// Logg ut etter hver test
test.afterEach(async ({ page }) => {
    console.log('Logger ut etter testen');
    await page.goto('https://parabank.parasoft.com/parabank/logout.htm');
});




test('Bill Payment', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    // Gå til bill payment-siden
    await page.click('a[href*="billpay.htm"]');

    // Fyll inn betalingsinformasjon
    await page.fill('input[name="payee.name"]', 'Medina Ysabel');
    await page.fill('input[name="payee.address.street"]', 'Silurveien 2');
    await page.fill('input[name="payee.address.city"]', 'Oslo');
    await page.fill('input[name="payee.address.state"]', 'Oslo');
    await page.fill('input[name="payee.address.zipCode"]', '0661');
    await page.fill('input[name="payee.phoneNumber"]', '12345678');
    await page.fill('input[name="payee.accountNumber"]', '12345');
    await page.fill('input[name="verifyAccount"]', '12345');
    await page.fill('input[name="amount"]', '32');

    // Velg konto fra dropdown
    await page.selectOption('select[name="fromAccountId"]', '16674');

    // Send betaling
    await page.click('input[type="button"]');

    // Sjekk at betalingen ble gjennomført
    await expect(page.locator('h1').filter({ hasText: 'Bill Payment Complete' })).toHaveText('Bill Payment Complete');

});
    

