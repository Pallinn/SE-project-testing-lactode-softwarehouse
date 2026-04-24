import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

let adminToken=null;

test.beforeAll(async({request})=>{
    const response = await request.post('https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',{
        data: {
        identifier: 'admin@gmail.com',
        password: '123456'
        }
    });
    const body = await response.json();
    adminToken = body.token;
})

function generateHotel() {
  const timestamp = Date.now();
  return {
    hotelName:`test_hotel_${Math.floor(Math.random() * 1000)}`,
    phone: `123456${Math.floor(Math.random() * 9000 + 1000)}`,
    email: `test_${timestamp}@mail.com`,
    address:"somewhere",
    province:"Bangkok",
    postalCode:"10330",
    description:"6767"
  };
}

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
      page.getByRole('button', { name: 'Logout' })
    ).toBeVisible({ timeout: 10000 });
}

async function createHotel(page) {

    const hotel = generateHotel();

    await page.getByRole('link', { name: 'Hotel', exact: true }).click();
    await page.getByRole('link', { name: 'create hotel' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(hotel.hotelName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(hotel.phone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(hotel.email);
    await page.getByRole('textbox', { name: 'Huai Kwang, Central, 342 Rama' }).fill(hotel.address);
    await page.getByRole('textbox', { name: 'Bangkok' }).fill(hotel.province);
    await page.getByRole('textbox', { name: '12345' }).fill(hotel.postalCode);
    await page.getByRole('textbox', { name: 'A beautiful beachfront hotel' }).fill(hotel.description);
    await page.getByRole('textbox', { name: 'owner@example.com' }).fill('owner@gmail.com');
    await page.getByRole('button', { name: 'Swimming Pool' }).click();
    await page.getByRole('button', { name: 'Room Service' }).click();
    await page.getByRole('button', { name: 'Heating' }).click();
    const [response] = await Promise.all([
    page.waitForResponse(res =>
        res.url().includes('/hotels') && res.request().method() === 'POST'
    ),
    page.getByRole('button', { name: 'create' }).click()
    ]); 

    const data = await response.json();
    const hotelID = data.data._id;

    return hotelID;

}

test('TC1-1 Admin can create hotel (valid)',async({page,request})=>{
    //admin
    await login(page,'admin@gmail.com');

    const hotelID = await createHotel(page);

    await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
    });
});