import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

let adminToken=null;
let ownerToken=null;
let userToken=null;

let hotelID;

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

    const responseUser = await request.post('https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',{
        data: {
        identifier: 'user@gmail.com',
        password: '123456'
        }
    });
    const bodyUser = await responseUser.json();
    userToken = bodyUser.token;
});

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
    await page.getByRole('link', { name: 'Login' }).click();

    const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Email / Phone' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/auth/login') && res.status() === 200
    ),
    page.getByRole('button', { name: 'Sign In' }).click()
    ]);

    //confirm login success
    await expect(
        page.getByRole('button', { name: 'Logout' })
    ).toBeVisible();
}

async function createHotel(page,hotel) {

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

async function createRoom(page,hotelID){
    await page.goto(`${baseURL}owner/hotels/${hotelID}`);

    await page.getByRole('link', { name: 'Create Room' }).click();
    await page.getByLabel('Room TypeSelect room').selectOption('double');
    await page.getByPlaceholder('10').fill('2');
    await page.getByPlaceholder('4').fill('2');
    await page.getByPlaceholder('2').fill('2');
    await page.getByPlaceholder('500').fill('1200');
    await page.getByLabel('Bed TypeSelect bed').selectOption('double');
    await page.getByRole('textbox', { name: 'Description' }).fill('description');

    await page.waitForTimeout(1000);

    const [response] = await Promise.all([
    page.waitForResponse(res =>
        res.url().includes('/rooms') && res.request().method() === 'POST'
    ),
    page.getByRole('button', { name: 'create' }).click()
    ]); 

    const data = await response.json();
    const roomID = data.data._id;

    return roomID;
}

async function cleanUp(request,hotelID,roomID){
    if (hotelID && roomID) {
        await request.delete(
        `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}/rooms/${roomID}`,
        {headers: {Authorization: `Bearer ${ownerToken}`}});
    }
    if (hotelID) {
        await request.delete(
        `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`,
        {headers: {Authorization: `Bearer ${adminToken}`}});
    }
    
}

test.describe('Epic 2-1 Hotel Owner can create new room',()=>{
    test('TC8-1 Hotel owner create new room succesfully',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            roomID = await createRoom(page,hotelID);

            await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
            await expect(page.getByText('available :')).toBeVisible();
            await expect(page.getByText('max 2 adults')).toBeVisible();
            await expect(roomID).not.toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });

    test('TC8-2 Hotel owner create new room unsuccesfully : room type is empty',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            //create room
            await page.goto(`${baseURL}owner/hotels/${hotelID}`);

            await page.getByRole('link', { name: 'Create Room' }).click();
            //await page.getByLabel('Room TypeSelect room').selectOption('double');
            await page.getByPlaceholder('10').fill('2');
            await page.getByPlaceholder('4').fill('2');
            await page.getByPlaceholder('2').fill('2');
            await page.getByPlaceholder('500').fill('1200');
            await page.getByLabel('Bed TypeSelect bed').selectOption('double');
            await page.getByRole('textbox', { name: 'Description' }).fill('description');

            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'create' }).click();

            //check
            await expect(page.getByText('Please select room type.')).toBeVisible();
            await expect(roomID).toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });

    test('TC8-3 Hotel owner create new room unsuccesfully : room amount is empty',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            //create room
            await page.goto(`${baseURL}owner/hotels/${hotelID}`);

            await page.getByRole('link', { name: 'Create Room' }).click();
            await page.getByLabel('Room TypeSelect room').selectOption('double');
            // await page.getByPlaceholder('10').fill('2');
            await page.getByPlaceholder('4').fill('2');
            await page.getByPlaceholder('2').fill('2');
            await page.getByPlaceholder('500').fill('1200');
            await page.getByLabel('Bed TypeSelect bed').selectOption('double');
            await page.getByRole('textbox', { name: 'Description' }).fill('description');

            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'create' }).click();

            //check
            await expect(page.getByText('Please enter a valid available number.')).toBeVisible();
            await expect(roomID).toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });

    test('TC8-4 Hotel owner create new room unsuccesfully : people is empty',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            //create room
            await page.goto(`${baseURL}owner/hotels/${hotelID}`);

            await page.getByRole('link', { name: 'Create Room' }).click();
            await page.getByLabel('Room TypeSelect room').selectOption('double');
            await page.getByPlaceholder('10').fill('2');
            // await page.getByPlaceholder('4').fill('2');
            await page.getByPlaceholder('2').fill('2');
            await page.getByPlaceholder('500').fill('1200');
            await page.getByLabel('Bed TypeSelect bed').selectOption('double');
            await page.getByRole('textbox', { name: 'Description' }).fill('description');

            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'create' }).click();

            //check
            await expect(page.getByText('Please enter valid people per room.')).toBeVisible();
            await expect(roomID).toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });

    test('TC8-5 Hotel owner create new room unsuccesfully : bed type is not selected',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            //create room
            await page.goto(`${baseURL}owner/hotels/${hotelID}`);

            await page.getByRole('link', { name: 'Create Room' }).click();
            await page.getByLabel('Room TypeSelect room').selectOption('double');
            await page.getByPlaceholder('10').fill('2');
            await page.getByPlaceholder('4').fill('2');
            await page.getByPlaceholder('2').fill('2');
            await page.getByPlaceholder('500').fill('1200');
            // await page.getByLabel('Bed TypeSelect bed').selectOption('double');
            await page.getByRole('textbox', { name: 'Description' }).fill('description');

            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'create' }).click();

            //check
            await expect(page.getByText('Please select bed type.')).toBeVisible();
            await expect(roomID).toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });

    test('TC8-5 Hotel owner create new room unsuccesfully : bed count > 5',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');

            //create room
            await page.goto(`${baseURL}owner/hotels/${hotelID}`);

            await page.getByRole('link', { name: 'Create Room' }).click();
            await page.getByLabel('Room TypeSelect room').selectOption('double');
            await page.getByPlaceholder('10').fill('2'); //room Amount
            await page.getByPlaceholder('4').fill('2'); //people
            await page.getByPlaceholder('2').fill('6'); //Bed
            await page.getByPlaceholder('500').fill('1200'); //price
            await page.getByLabel('Bed TypeSelect bed').selectOption('double');
            await page.getByRole('textbox', { name: 'Description' }).fill('description');

            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'create' }).click();

            //check
            await expect(page.getByText('Cannot have more than 5 bed')).toBeVisible();
            await expect(roomID).toBeNull();
        }finally{
            await cleanUp(request,hotelID,roomID);
        }
    });
});

test.describe('Epic 2-2 Hotel Owner can view room',()=>{
    test('TC9-1 Hotel Owner can view their hotel',async({page,request})=>{
        let hotelID;
        let roomID;

        await login(page,'admin@gmail.com');

        const hotel = generateHotel();

        hotelID = await createHotel(page,hotel);

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page,'owner@gmail.com');

        roomID = await createRoom(page,hotelID);

        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
        await expect(roomID).not.toBeNull();

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page, 'owner@gmail.com');

        await page.goto(`${baseURL}/owner/hotels/${hotelID}`);
        
        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();


    });
});
test.describe('Epice 2-3 Hotel Owner can edit  room',()=>{
    test('TC10-1 Hotel owner edit room succesfully',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        let newDescription = 'Room with seaside beach view'
        let newPrice = '2000'
        let newPeople = '4'
        let newRoomType = 'Suite'
        let newBedType = 'Queen'
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');
            roomID = await createRoom(page,hotelID);

            await page.goto(`${baseURL}owner/hotels/${hotelID}/rooms/${roomID}`);
            await page.getByRole('link', { name: 'Edit' }).click();

            await page.getByPlaceholder('500').fill(newPrice);
            await page.getByPlaceholder('4').fill(newPeople);
            await page.getByLabel('Room TypeSelect room').selectOption(newRoomType);
            await page.getByLabel('Bed TypeSelect bed').selectOption(newBedType);
            await page.getByRole('textbox', { name: 'Description' }).fill(newDescription)

            
            await page.getByRole('button', { name: 'save change' }).click();
            await page.waitForTimeout(1000);
           
            await expect(page.getByRole('textbox', { name: 'Description' })).toContainText(newDescription);
            await expect(page.getByText(`${newPrice} baht/day${newPeople} people${newBedType}`)).toBeVisible
            await expect(page.getByText(`Room Type ${newRoomType}`)).toBeVisible();
        }finally{
           try {
                await cleanUp(hotelID, roomID);
            } catch (err) {
                // console.error("Cleanup failed:", err);
            }
        }
    });
    
});

test.describe('Epice 2-4 Hotel Owner can delete  room',()=>{
    test('TC11-1 Hotel owner delete room succesfully',async({page,request})=>{
        let roomID = null;
        let hotelID = null;
        try{
            //admin
            await login(page,'admin@gmail.com');

            const hotel = generateHotel();

            hotelID = await createHotel(page,hotel);

            await page.getByRole('button', { name: 'Logout' }).click();
            await login(page,'owner@gmail.com');
            roomID = await createRoom(page,hotelID);
            await page.goto(`${baseURL}owner/hotels/${hotelID}/rooms/${roomID}`);

            await page.getByRole('button', { name: 'Delete' }).click();
            await page.getByRole('button', { name: 'Delete' }).nth(1).click();

            await page.waitForTimeout(1000);
           //TODO : still can't find 
            await expect(page.getByText('No rooms available for this')).toBeVisible();
           
        }finally{
           try {
                await cleanUp(hotelID, roomID);
            } catch (err) {
                // console.error("Cleanup failed:", err);
            }
        }
    });
    
});


test.describe('Epic 2-5 user can view room',()=>{
    test('TC12-1 User can view all room in hotel',async({page,request})=>{
        
        let hotelID;
        let roomID;

        await login(page,'admin@gmail.com');

        const hotel = generateHotel();

        hotelID = await createHotel(page,hotel);

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page,'owner@gmail.com');

        roomID = await createRoom(page,hotelID);

        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
        await expect(roomID).not.toBeNull();

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page, 'user@gmail.com');

        await page.goto(`${baseURL}/hotels/${hotelID}`);
        
        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();

    });
});

test.describe('Epic 2-6 Admin can view room',()=>{
    test('TC13-1 Admin can view their hotel',async({page,request})=>{
        let hotelID;
        let roomID;

        await login(page,'admin@gmail.com');

        const hotel = generateHotel();

        hotelID = await createHotel(page,hotel);

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page,'owner@gmail.com');

        roomID = await createRoom(page,hotelID);

        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
        await expect(roomID).not.toBeNull();

        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page, 'admin@gmail.com');

        await page.goto(`${baseURL}/admin/hotels/${hotelID}`);
        
        await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();


    });
});

