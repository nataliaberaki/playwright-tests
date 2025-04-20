import{test, expect} from '@playwright/test';

test('Submisson Form Customer Care Message', async ({page}) =>{
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    //user login
    await page.fill('input[name="username"]', 'Danny');
    await page.fill('input[name="password"]', 'abcd1234');
    await page.click('input[type="submit"]');

    //fail when login in
    const errorLogin = await page.locator('h1.title', {hasText: 'Error!'}).isVisible();
    if (errorLogin) {
        throw new Error('Login failed: check your username or password!');
    }

    //customer care page
    await page.click('a[href*="contact.htm"]');

    //Form 
    await page.fill('input[name="name"]', 'Medina Ysabel Berselona Borillo');
    await page.fill('input[name="email"]', 'medinki@gmail.com');
    await page.fill('input[name="phone"]', '12345678');
    await page.fill('textarea[name="message"]', 'Test Message');

    //submit form
    await page.click('input[type="submit"]');

    //optimal output: check is passed
    await expect(page.getByText('A Customer Care Representative will be contacting you.')).toBeVisible();
});
