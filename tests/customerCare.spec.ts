import{test, expect} from '@playwright/test';

test('Automated page title check', async ({page})=>{
    //step 1 : open the page 
    await page.goto('https://parabank.parasoft.com/parabank/contact.htm');

    //step 2 : verify the title automatically
    await expect(page).toHaveTitle('ParaBank | Customer Care');
    
    //step 3 : interact with elements/buttons
    //await page.click('text=More information');

    //step 4 : assert new page title or URL
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/contact.htm');

})
