import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

async function login(page,email) {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Login' }).click();

    const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.waitForTimeout(300);

    await page.getByRole('textbox', { name: 'Email / Phone' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    await page.getByRole('button', { name: 'Sign In' }).click();

    //home page ready
    await expect(
      page.getByRole('link', { name: 'user' })
    ).toBeVisible({ timeout: 10000 });
}

test('should count total hotels across all pages', async ({ page }) => {
  await login(page, 'user@gmail.com');
  await page.getByRole('link', { name: 'Hotel' }).click();

  let total = 0;

  while (true) {
    // รอให้ card โหลดก่อน
    const cards = page.getByTestId('hotel-card'); //this shit
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    total += count;

    // หา next button
    const nextBtn = page.getByRole('button', { name: 'Next' });

    // ถ้าไม่มีหรือ disabled → หยุด
    if (!(await nextBtn.isVisible()) || await nextBtn.isDisabled()) {
      break;
    }

    await nextBtn.click();
  }

});

test('guest should see the hotel list',async({page})=>{
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    const apiRes = await request.get('https://lactode-software-house-frontend.vercel.app/hotels');
    const apiData = await apiRes.json();

    await page.getByRole('link', { name: 'Hotel' }).click();

    const uiCount = await page.locator('.hotel-card').count();

    expect(uiCount).toBe(apiData.length);
});

test('user should see the hotel list',async({page})=>{
    await login(page,'user@gmail.com');


    await page.getByRole('link', { name: 'Hotel' }).click();


});