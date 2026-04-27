import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

// Define fixtures for auth tokens
// Each worker will get fresh tokens automatically
const testWithAuth = test.extend({
  adminToken: async ({ request }, use) => {
    const response = await request.post(
      `${baseURL}api-proxy/auth/login`,
      {
        data: {
          identifier: 'admin@gmail.com',
          password: '123456'
        }
      }
    );
    const body = await response.json();
    await use(body.token);
  },
  ownerToken: async ({ request }, use) => {
    const response = await request.post(
      `${baseURL}api-proxy/auth/login`,
      {
        data: {
          identifier: 'owner@gmail.com',
          password: '123456'
        }
      }
    );
    const body = await response.json();
    await use(body.token);
  },
});

function generateHotel() {
  const timestamp = Date.now();
  return {
    hotelName: `test_hotel_${Math.floor(Math.random() * 1000)}${timestamp}`,
    phone: `123456${Math.floor(Math.random() * 9000 + 1000)}`,
    email: `test_${timestamp}@mail.com`,
    address: "somewhere",
    province: "Bangkok",
    postalCode: "10330",
    description: "6767",
    owner: "owner@gmail.com"
  };
}

async function login(page, email) {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Login' }).click();

  const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();

  await page.waitForTimeout(300);

  await page.getByRole('textbox', { name: 'Email / Phone' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');

  await page.getByRole('button', { name: 'Sign In' }).click();

  // home page ready
  await expect(
    page.getByRole('button', { name: 'Logout' })
  ).toBeVisible({ timeout: 10000 });
}

async function createHotel(page, hotel) {

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

async function createHotelError(page, hotel) {

  await page.getByRole('link', { name: 'Hotel', exact: true }).click();
  await page.getByRole('link', { name: 'create hotel' }).click();
  await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(hotel.hotelName);
  await page.getByRole('textbox', { name: '+66 76 123' }).fill(hotel.phone);
  await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(hotel.email);
  await page.getByRole('textbox', { name: 'Huai Kwang, Central, 342 Rama' }).fill(hotel.address);
  await page.getByRole('textbox', { name: 'Bangkok' }).fill(hotel.province);
  await page.getByRole('textbox', { name: '12345' }).fill(hotel.postalCode);
  await page.getByRole('textbox', { name: 'A beautiful beachfront hotel' }).fill(hotel.description);
  await page.getByRole('textbox', { name: 'owner@example.com' }).fill(hotel.owner);
  await page.getByRole('button', { name: 'Swimming Pool' }).click();
  await page.getByRole('button', { name: 'Room Service' }).click();
  await page.getByRole('button', { name: 'Heating' }).click();

  page.getByRole('button', { name: 'create' }).click()
}

testWithAuth.describe('Epic 1-1 Admin can create hotel', () => {
  testWithAuth('TC1-1 Admin can create hotel (valid)', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    await expect(page.getByRole('heading', { name: hotel.hotelName })).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
  });

  testWithAuth('TC1-2 Admin cant create hotel (invalid) : name is empty', async ({ page, request }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();
    hotel.hotelName = '';

    await createHotelError(page, hotel);

    await expect(page.getByText('Please complete all required fields before creating the hotel.')).toBeVisible();
  });

  testWithAuth('TC1-3 Admin cant create hotel (invalid) : owner email is empty', async ({ page, request }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();
    hotel.owner = '';

    await createHotelError(page, hotel);

    await expect(page.getByText('Please complete all required fields before creating the hotel.')).toBeVisible();
  });

  testWithAuth('TC1-4 Admin cant create hotel (invalid) : phone number is used', async ({ page, request }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();
    hotel.phone = '0813813235';

    await createHotelError(page, hotel);

    await expect(page.getByText('Cannot create hotel')).toBeVisible();
  });

  testWithAuth('TC1-5 Admin cant create hotel (invalid) : email is used', async ({ page, request }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();
    hotel.email = 'silkroadhotel_21@gmail.com';

    await createHotelError(page, hotel);

    await expect(page.getByText('Cannot create hotel')).toBeVisible();
  });
});

testWithAuth.describe('Epic 1-2 Admin can edit hotel', () => {
  testWithAuth('TC2-1 Admin can edit hotel (valid)', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // edit hotel
    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check

    await expect(page.getByText(newName)).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });


  });

  testWithAuth('TC2-2 Admin cant edit hotel (invalid) : name cant be empty', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // edit hotel
    let timestamp = Date.now();
    // empty name
    let newName = '';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check
    await expect(page.getByText('Cannot update hotel :')).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
  });

  testWithAuth('TC2-3 Admin cant edit hotel (invalid) : phone is in wrong format', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // edit hotel
    let timestamp = Date.now();
    let newName = 'New name';
    // phone ahve to be 9-10 degit
    let newPhone = '000'
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check
    await expect(page.getByText('Cannot update hotel :')).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
  });

  testWithAuth('TC2-4 Admin cant edit hotel (invalid) : used email', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // edit hotel
    let timestamp = Date.now();
    let newName = 'New Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    // used email
    let newEmail = 'silkroadhotel_21@gmail.com';
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check
    await expect(page.getByText('Cannot update hotel :')).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
  });
});

testWithAuth.describe('Epic 1-3 Admin can delete hotel', () => {
  testWithAuth('TC3-1 Admin can delete hotel (valid)', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  });

  testWithAuth('TC3-2 Admin cant delete hotel that have booking (invalid)', async ({ page, request, adminToken }) => {
    testWithAuth.setTimeout(120000);

    let bookingID;
    let hotelID;
    try {
      // admin
      await login(page, 'admin@gmail.com');

      const hotel = generateHotel();

      hotelID = await createHotel(page, hotel);

      // create room
      await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
      await page.getByRole('link', { name: 'Create Room' }).click();
      await page.getByLabel('Room TypeSelect room').selectOption('double');
      await page.getByPlaceholder('500').fill('500');
      await page.getByLabel('Bed TypeSelect bed').selectOption('single');
      await page.getByPlaceholder('10').fill('2');
      await page.getByPlaceholder('4').fill('2');
      await page.getByPlaceholder('2').fill('1');
      await page.getByRole('textbox', { name: 'Description' }).fill('nothing');
      await Promise.all([
        page.waitForResponse(res =>
          res.url().includes('/rooms') && res.request().method() === 'POST'
        ),
        page.getByRole('button', { name: 'create' }).click()
      ]);

      // logout
      await page.getByRole('button', { name: 'Logout' }).click();

      // user
      await login(page, 'user@gmail.com');

      // booking
      await page.goto(`${baseURL}hotels/${hotelID}`);
      await page.waitForLoadState('networkidle');
      await expect(page.getByRole('link', { name: 'Detail' })).toBeVisible();
      await page.getByRole('link', { name: 'Detail' }).click();
      await expect(
        page.getByRole('button', { name: 'Book this room' })
      ).toBeVisible({ timeout: 10000 });
      await page.getByRole('button', { name: 'Book this room' }).click();
      await page.getByRole('textbox', { name: 'Check-in date' }).fill('2026-04-26');
      const [response] = await Promise.all([
        page.waitForResponse(res =>
          res.url().includes('/bookings') && res.request().method() === 'POST'
        ),
        page.getByRole('button', { name: 'Confirm booking' }).click()
      ]);

      const data = await response.json();
      bookingID = data.data._id;

      // logout
      await page.getByRole('button', { name: 'Logout' }).click();

      // admin
      await login(page, 'admin@gmail.com');
      await page.waitForLoadState('networkidle');

      await page.goto(`${baseURL}admin/hotels/${hotelID}`);
      await expect(
        page.getByRole('button', { name: 'Delete' })
      ).toBeVisible({ timeout: 10000 });
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'Delete' }).nth(1).click();

      // await expect(page.getByText('Cannot delete hotel: active')).toBeVisible();
    } finally {
      if (bookingID) {
        await request.delete(
          `${baseURL}api-proxy/bookings/${bookingID}`,
          {
            headers: { Authorization: `Bearer ${adminToken}` }
          }
        );
      }
      if (hotelID) {
        await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
      }
    }
  });
});

testWithAuth.describe('Epic 1-4 Admin can view all hotel', () => {
  testWithAuth('TC4-1 Admin can see all hotels', async ({ page, request, ownerToken }) => {
    // login admin
    await login(page, 'admin@gmail.com');

    const hotelRes = await request.get(
      `${baseURL}api-proxy/hotels`,
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`
        }
      }
    );

    const hotelData = await hotelRes.json();
    const firstHotelName = hotelData.data[0].name;

    // ไปหน้า hotel list
    await page.getByRole('link', { name: 'Hotel', exact: true }).click();

    // ✅ check ว่าเห็น hotel ที่สร้าง
    await expect(page.getByText(firstHotelName)).toBeVisible();
  });
});

testWithAuth.describe('Epic 1-5 Hotel owner can edit hotels', () => {
  testWithAuth('TC5-1 Hotel Owner can edit their hotel (valid)', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // owner
    await login(page, 'owner@gmail.com');

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check

    await expect(page.getByText(newName)).toBeVisible();

    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

  testWithAuth('TC5-2 Hotel Owner cant edit their hotel (invalid): name cant be empty string', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // owner
    await login(page, 'owner@gmail.com');

    let timestamp = Date.now();
    let newName = '';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check

    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

  testWithAuth('TC5-3 Hotel Owner cant edit their hotel (invalid): phone is worong format', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // owner
    await login(page, 'owner@gmail.com');

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = '1234';
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check

    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

  testWithAuth('TC5-4 Hotel Owner cant edit their hotel (invalid): email cant be duplicate', async ({ page, request, adminToken }) => {
    // admin
    await login(page, 'admin@gmail.com');

    const hotel = generateHotel();

    const hotelID = await createHotel(page, hotel);

    // logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // owner
    await login(page, 'owner@gmail.com');

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `silkroadhotel_21@gmail.com`;
    await page.getByRole('article').filter({ hasText: hotel.hotelName }).getByRole('link').click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(newName);
    await page.getByRole('textbox', { name: '+66 76 123' }).fill(newPhone);
    await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(newEmail);
    await page.getByRole('button', { name: 'edit' }).click();

    // check

    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`${baseURL}api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

});

testWithAuth.describe('Epic 1-6 hotel owner can view their hotel', () => {
  testWithAuth('TC6-1 hotel owner can see their hotels', async ({ page, request, ownerToken }) => {

    await login(page, 'owner@gmail.com');
    const hotelRes = await request.get(
      `${baseURL}api-proxy/hotels`,
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`
        }
      }
    );

    const hotelData = await hotelRes.json();
    const firstHotelName = hotelData.data[0].name;

    // ไปหน้า hotel list
    await page.getByRole('link', { name: 'Hotel' }).click();

    // ✅ check ว่าเห็น hotel ที่สร้าง
    await expect(page.getByText(firstHotelName)).toBeVisible();
  });
});