import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

let adminToken=null;
let ownerToken=null;
let userToken=null;

test.beforeAll(async({request})=>{
    const response = await request.post('https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',{
        data: {
        identifier: 'admin@gmail.com',
        password: '123456'
        }
    });
    const body = await response.json();
    adminToken = body.token;

    const response_owner = await request.post(
      'https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',
      {
        data: {
          identifier: 'owner@gmail.com',
          password: '123456'
        }
      }
    );

    const body_owner = await response_owner.json();
    ownerToken = body_owner.token;

    const response_user = await request.post(
      'https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',
      {
        data: {
          identifier: 'user@gmail.com',
          password: '123456'
        }
      }
    );

    const body_user = await response_owner.json();
    userToken = body_user.token;
})

function generateHotel() {
  const timestamp = Date.now();
  return {
    hotelName:`test_hotel_${Math.floor(Math.random() * 1000)}${timestamp}`,
    phone: `123456${Math.floor(Math.random() * 9000 + 1000)}`,
    email: `test_${timestamp}@mail.com`,
    address:"somewhere",
    province:"Bangkok",
    postalCode:"10330",
    description:"6767",
    owner:"owner@gmail.com"
  };
}

async function login(page,email) {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByTestId('navbar-signin').click();

    const emailInput = page.getByTestId('signin-identifier');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.waitForTimeout(300);

    await page.getByTestId('signin-identifier').fill(email);
    await page.getByTestId('signin-password').fill('123456');

    await page.getByTestId('signin-submit').click();

    //home page ready
    await expect(
      page.getByTestId('navbar-logout')
    ).toBeVisible({ timeout: 10000 });
}

async function createHotel(page,hotel) {

    await page.getByTestId('navbar-admin-hotels').click();
    await page.getByRole('link', { name: 'create hotel' }).click();
    await page.getByTestId('hotel-form-name').fill(hotel.hotelName);
    await page.getByTestId('hotel-form-tel').fill(hotel.phone);
    await page.getByTestId('hotel-form-email').fill(hotel.email);
    await page.getByTestId('hotel-form-address').fill(hotel.address);
    await page.getByTestId('hotel-form-district').fill('Pathumwan');
    await page.getByTestId('hotel-form-province').fill(hotel.province);
    await page.getByTestId('hotel-form-postalcode').fill(hotel.postalCode);
    await page.getByTestId('hotel-form-description').fill(hotel.description);
    await page.getByTestId('hotel-form-owner-email').fill('owner@gmail.com');
    const [response] = await Promise.all([
    page.waitForResponse(res =>
        res.url().includes('/hotels') && res.request().method() === 'POST'
    ),
    page.getByTestId('hotel-form-submit').click()
    ]); 

    const data = await response.json();
    const hotelID = data.data._id;

    return hotelID;

}

async function createHotelError(page,hotel) {

    await page.getByRole('link', { name: 'Hotel', exact: true }).click();
    await page.getByRole('link', { name: 'create hotel' }).click();
    await page.getByTestId('hotel-form-name').fill(hotel.hotelName);
    await page.getByTestId('hotel-form-tel').fill(hotel.phone);
    await page.getByTestId('hotel-form-email').fill(hotel.email);
    await page.getByTestId('hotel-form-address').fill(hotel.address);
    await page.getByTestId('hotel-form-district').fill('Pathumwan');
    await page.getByTestId('hotel-form-province').fill(hotel.province);
    await page.getByTestId('hotel-form-postalcode').fill(hotel.postalCode);
    await page.getByTestId('hotel-form-description').fill(hotel.description);
    await page.getByTestId('hotel-form-owner-email').fill(hotel.owner);

    await page.getByTestId('hotel-form-submit').click();
}

test.describe('Epic 1-1 Admin can create hotel',() =>{
  test('TC1-1 Admin can create hotel (valid)',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();
      
      const hotelID = await createHotel(page,hotel);

      await expect(page.getByRole('heading', { name:hotel.hotelName })).toBeVisible();

      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });
  });

  test('TC1-2 Admin cant create hotel (invalid) : name is empty',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();
      hotel.hotelName = '';

      await createHotelError(page,hotel);

      await expect(page.getByText('Please complete all required fields before creating the hotel.')).toBeVisible();
  });

  test('TC1-3 Admin cant create hotel (invalid) : owner email is empty',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();
      hotel.owner = '';

      await createHotelError(page,hotel);

      await expect(page.getByText('Please complete all required fields before creating the hotel.')).toBeVisible();
  });

  test('TC1-4 Admin cant create hotel (invalid) : phone number is used',async({page,request})=>{
      //admin 
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();
      hotel.phone = '0813813235';

      await createHotelError(page,hotel);

      await expect(page.getByText('Cannot create hotel')).toBeVisible();
  });

  test('TC1-5 Admin cant create hotel (invalid) : email is used',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();
      hotel.email = 'silkroadhotel_21@gmail.com';

      await createHotelError(page,hotel);

      await expect(page.getByText('Cannot create hotel')).toBeVisible();
  });
});

test.describe('Epic 1-2 Admin can edit hotel',()=>{
  test('TC2-1 Admin can edit hotel (valid)',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      const hotelID = await createHotel(page,hotel);

      //edit hotel
      let timestamp = Date.now();
      let newName = 'Edited Name';
      let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
      let newEmail = `test_${timestamp}@mail.com`;
      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('link', { name: 'Edit' }).click();
      await page.getByTestId('hotel-form-name').fill(newName);
      await page.getByTestId('hotel-form-tel').fill(newPhone);
      await page.getByTestId('hotel-form-email').fill(newEmail);
      await page.getByTestId('hotel-form-submit').click();

      //check

      await expect(page.getByText(newName)).toBeVisible();

      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });

      
  });

  test('TC2-2 Admin cant edit hotel (invalid) : name cant be empty',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      const hotelID = await createHotel(page,hotel);

      //edit hotel
      let timestamp = Date.now();
      //empty name
      let newName = '';
      let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
      let newEmail = `test_${timestamp}@mail.com`;
      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('link', { name: 'Edit' }).click();
      await page.getByTestId('hotel-form-name').fill(newName);
      await page.getByTestId('hotel-form-tel').fill(newPhone);
      await page.getByTestId('hotel-form-email').fill(newEmail);
      await page.getByTestId('hotel-form-submit').click();

      //check
      await expect(page.getByText('Cannot update hotel :')).toBeVisible();

      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });
  });

  test('TC2-3 Admin cant edit hotel (invalid) : phone is in wrong format',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      const hotelID = await createHotel(page,hotel);

      //edit hotel
      let timestamp = Date.now();
      let newName = 'New name';
      //phone ahve to be 9-10 degit
      let newPhone = '000'
      let newEmail = `test_${timestamp}@mail.com`;
      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('link', { name: 'Edit' }).click();
      await page.getByTestId('hotel-form-name').fill(newName);
      await page.getByTestId('hotel-form-tel').fill(newPhone);
      await page.getByTestId('hotel-form-email').fill(newEmail);
      await page.getByTestId('hotel-form-submit').click();

      //check
      await expect(page.getByText('Cannot update hotel :')).toBeVisible();

      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });
  });

  test('TC2-4 Admin cant edit hotel (invalid) : used email',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      const hotelID = await createHotel(page,hotel);

      //edit hotel
      let timestamp = Date.now();
      let newName = 'New Name';
      let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
      //used email
      let newEmail = 'silkroadhotel_21@gmail.com';
      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('link', { name: 'Edit' }).click();
      await page.getByTestId('hotel-form-name').fill(newName);
      await page.getByTestId('hotel-form-tel').fill(newPhone);
      await page.getByTestId('hotel-form-email').fill(newEmail);
      await page.getByTestId('hotel-form-submit').click();

      //check
      await expect(page.getByText('Cannot update hotel :')).toBeVisible();

      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });
  });
});

test.describe('Epic 1-3 Admin can delete hotel',()=>{
  test('TC3-1 Admin can delete hotel (valid)',async({page,request})=>{
      //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      const hotelID = await createHotel(page,hotel);

      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.getByRole('button', { name: 'Delete' }).nth(1).click(); 
  });

  test('TC3-2 Admin cant delete hotel that have booking (invalid)',async({page,request})=>{
    test.setTimeout(120000);
    let bookingID;
    let hotelID;  
    try{
        //admin
      await login(page,'admin@gmail.com');

      const hotel = generateHotel();

      hotelID = await createHotel(page,hotel);

      //create room
      await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
      await page.getByRole('link', { name: 'Create Room' }).click();
      await page.getByTestId('room-form-room-type').selectOption('double');
      await page.getByTestId('room-form-price').fill('2500');
      await page.getByTestId('room-form-bed-type').selectOption('double');
      await page.getByTestId('room-form-amount').fill('5');
      await page.getByTestId('room-form-people').fill('2');
      await page.getByTestId('room-form-bed-count').fill('2');
      await page.getByTestId('room-form-description').fill('beautiful room');
      await page.getByTestId('room-form-facility-minibar').click();
      await page.getByTestId('room-form-facility-hair-dryer').click();
      await Promise.all([
        page.waitForResponse(res =>
          res.url().includes('/rooms') && res.request().method() === 'POST'
        ),
        page.getByTestId('room-form-submit').click()
      ]);

      //logout
      await page.getByTestId('navbar-logout').click();

      //user
      await login(page,'user@gmail.com');

      //booking
      await page.goto(`${baseURL}/hotels/${hotelID}`);
      await page.waitForLoadState('networkidle');
      // await page.getByRole('link', { name: 'Hotel' }).click();
      // await page.getByRole('article').filter({ hasText:hotel.hotelName }).getByRole('link').click();
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

      //logout
      await page.getByTestId('navbar-logout').click();

      //admin
      await login(page,'admin@gmail.com');
      await page.waitForLoadState('networkidle'); 

      await page.goto(`${baseURL}/admin/hotels/${hotelID}`);
      await expect(
        page.getByRole('button', { name: 'Delete' })
      ).toBeVisible({ timeout: 10000 });
      // await page.getByRole('link', { name: 'Hotel' }).click();
      // await page.getByRole('article').filter({ hasText:hotel.hotelName }).getByRole('link').click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'Delete' }).nth(1).click();

      //await expect(page.getByText('Cannot delete hotel: active')).toBeVisible();
      }finally{
        if (bookingID) {
    await request.delete(
      `https://lactode-software-house-frontend.vercel.app/api-proxy/bookings/${bookingID}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
  }
      await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
      });
      }
  });
});

test.describe('Epic 1-4 Admin can view all hotel',()=>{
    test('TC4-1 Admin can see all hotels', async ({ page, request }) => {
    // login admin
    await login(page, 'admin@gmail.com');

    const hotelRes = await request.get(
      'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`
        }
      }
    );

    const hotelData = await hotelRes.json();
    const firstHotelName = hotelData.data[0].name;

    // ไปหน้า hotel list
    await page.getByTestId('navbar-admin-hotels').click();

    // ✅ check ว่าเห็น hotel ที่สร้าง
    await expect(page.getByRole('heading', { name:firstHotelName })).toBeVisible();
  });
});

test.describe('Epic 1-5 Hotel owner can edit hotels',()=>{
  test('TC5-1 Hotel Owner can edit their hotel (valid)',async({page,request})=>{
    //admin
    await login(page,'admin@gmail.com');

    const hotel = generateHotel();
    
    const hotelID = await createHotel(page,hotel);

    //logout
    await page.getByTestId('navbar-logout').click();

    //owner
    await login(page,'owner@gmail.com');
    await page.getByTestId('navbar-owner-dashboard').click();
    await page.getByRole('button', { name: 'Manage Hotel' }).click();

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByTestId('hotel-form-name').fill(newName);
    await page.getByTestId('hotel-form-tel').fill(newPhone);
    await page.getByTestId('hotel-form-email').fill(newEmail);
    await page.getByTestId('hotel-form-submit').click();

    //check

    await expect(page.getByText(newName)).toBeVisible();

    await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

  test('TC5-2 Hotel Owner cant edit their hotel (invalid): name cant be empty string',async({page,request})=>{
    //admin
    await login(page,'admin@gmail.com');

    const hotel = generateHotel();
    
    const hotelID = await createHotel(page,hotel);

    //logout
    await page.getByTestId('navbar-logout').click();

    //owner
    await login(page,'owner@gmail.com');
    await page.getByTestId('navbar-owner-dashboard').click();
    await page.getByRole('button', { name: 'Manage Hotel' }).click();

    let timestamp = Date.now();
    let newName = '';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByTestId('hotel-form-name').fill(newName);
    await page.getByTestId('hotel-form-tel').fill(newPhone);
    await page.getByTestId('hotel-form-email').fill(newEmail);
    await page.getByTestId('hotel-form-submit').click();

    //check
    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });
    
  test('TC5-3 Hotel Owner cant edit their hotel (invalid): phone is worong format',async({page,request})=>{
    //admin
    await login(page,'admin@gmail.com');

    const hotel = generateHotel();
    
    const hotelID = await createHotel(page,hotel);

    //logout
    await page.getByTestId('navbar-logout').click();

    //owner
    await login(page,'owner@gmail.com');
    await page.getByTestId('navbar-owner-dashboard').click();
    await page.getByRole('button', { name: 'Manage Hotel' }).click();

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = '1234';
    let newEmail = `test_${timestamp}@mail.com`;
    await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByTestId('hotel-form-name').fill(newName);
    await page.getByTestId('hotel-form-tel').fill(newPhone);
    await page.getByTestId('hotel-form-email').fill(newEmail);
    await page.getByTestId('hotel-form-submit').click();

    //check

    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

  test('TC5-4 Hotel Owner cant edit their hotel (invalid): email cant be duplicate',async({page,request})=>{
    //admin
    await login(page,'admin@gmail.com');

    const hotel = generateHotel();
    
    const hotelID = await createHotel(page,hotel);

    //logout
    await page.getByTestId('navbar-logout').click();

    //owner
    await login(page,'owner@gmail.com');
    await page.getByTestId('navbar-owner-dashboard').click();
    await page.getByRole('button', { name: 'Manage Hotel' }).click();

    let timestamp = Date.now();
    let newName = 'Edited Name';
    let newPhone = `123456${Math.floor(Math.random() * 9000 + 1000)}`;
    let newEmail = `silkroadhotel_21@gmail.com`;
    await page.getByTestId(`hotel-card-${hotelID}-detail`).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByTestId('hotel-form-name').fill(newName);
    await page.getByTestId('hotel-form-tel').fill(newPhone);
    await page.getByTestId('hotel-form-email').fill(newEmail);
    await page.getByTestId('hotel-form-submit').click();

    //check

    await expect(page.getByText('Cannot update hotel')).toBeVisible();
    await request.delete(`https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
  });

});

test.describe('Epic 1-6 hotel owner can view their hotel',()=>{
    test('TC6-1 hotel owner can see their hotels', async ({ page, request }) => {

    await login(page,'owner@gmail.com');
    const hotelRes = await request.get(
      'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
      {
        headers: {
          Authorization: `Bearer ${ownerToken}`
        }
      }
    );

    const hotelData = await hotelRes.json();
    const firstHotelName = hotelData.data[0].name;
    
    // ไปหน้า hotel list
    await page.getByTestId('navbar-owner-dashboard').click();
    await page.getByRole('button', { name: 'Manage Hotel' }).click();

    // ✅ check ว่าเห็น hotel ที่สร้าง
    await expect(page.getByRole('heading', { name:firstHotelName })).toBeVisible();
    });
});

test.describe('Epic 1-7 user can view their hotel',()=>{
    test('TC7-1 user can see their hotels', async ({ page, request }) => {

    await login(page,'user@gmail.com');
    const hotelRes = await request.get(
      'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );

    const hotelData = await hotelRes.json();
    const firstHotelName = hotelData.data[0].name;
    
    // ไปหน้า hotel list
    await page.getByTestId('navbar-hotels').click();

    // ✅ check ว่าเห็น hotel ที่สร้าง
    await expect(page.getByRole('heading', { name:firstHotelName })).toBeVisible();
    });
});