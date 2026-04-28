# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Epic\epic2.test.js >> Epic 2-6 Admin can view room >> TC13-1 Admin can view their hotel
- Location: tests\Epic\epic2.test.js:507:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "LACTODE SOFEWARE HOUSE" [ref=e4] [cursor=pointer]:
        - /url: /
        - img [ref=e6]
        - generic [ref=e10]:
          - generic [ref=e11]: LACTODE
          - generic [ref=e12]: SOFEWARE HOUSE
      - navigation [ref=e13]:
        - link "Hotel Management" [ref=e14] [cursor=pointer]:
          - /url: /owner/dashboard
          - img [ref=e15]
          - generic [ref=e18]: Hotel Management
        - link "Hotel Ranking" [ref=e19] [cursor=pointer]:
          - /url: /ranking
          - img [ref=e20]
          - generic [ref=e26]: Hotel Ranking
        - link "Bookings" [ref=e27] [cursor=pointer]:
          - /url: /owner/bookings
          - img [ref=e28]
          - generic [ref=e32]: Bookings
        - link "owner" [ref=e34] [cursor=pointer]:
          - /url: /account
          - img [ref=e35]
          - generic [ref=e38]: owner
        - button "Logout" [ref=e39] [cursor=pointer]:
          - img [ref=e40]
          - generic [ref=e43]: Logout
  - alert [ref=e44]
  - generic [ref=e47]:
    - generic [ref=e48]:
      - paragraph [ref=e49]: Create room
      - heading "Add room for your hotel" [level=1] [ref=e50]
      - paragraph [ref=e51]: Fill information for test_hotel_2921777382588670.
    - generic [ref=e52]:
      - button "cancel" [ref=e53] [cursor=pointer]:
        - generic [ref=e54]: cancel
      - button "create" [active] [ref=e55] [cursor=pointer]:
        - generic [ref=e56]: create
    - generic [ref=e57]:
      - paragraph [ref=e59]: No photos available
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e63]:
            - heading "Main picture" [level=3] [ref=e64]
            - paragraph [ref=e65]: This image will be used as the room cover photo.
          - textbox "picture url" [ref=e67]
        - generic [ref=e68]:
          - generic [ref=e69]:
            - generic [ref=e70]:
              - heading "Additional pictures" [level=3] [ref=e71]
              - paragraph [ref=e72]: Add up to 9 more image URLs.
            - generic [ref=e73]: 0/9
          - generic [ref=e75]:
            - textbox "picture url" [ref=e78]
            - button "+" [ref=e79]
    - generic [ref=e80]:
      - generic [ref=e81]:
        - paragraph [ref=e82]: Room Type
        - combobox "Room Type" [ref=e83]:
          - option "Select room type"
          - option "Single"
          - option "Double" [selected]
          - option "Twin"
          - option "Suite"
          - option "Deluxe"
          - option "Family"
          - option "Studio"
      - generic [ref=e84]:
        - generic [ref=e85]: Room Amount
        - spinbutton [ref=e86]: "2"
      - generic [ref=e87]:
        - generic [ref=e88]: Price
        - spinbutton [ref=e89]: "1200"
      - generic [ref=e90]:
        - generic [ref=e91]: People
        - spinbutton [ref=e92]: "2"
      - generic [ref=e93]:
        - paragraph [ref=e94]: Bed Type
        - combobox "Bed Type" [ref=e95]:
          - option "Select bed type"
          - option "Single"
          - option "Double" [selected]
          - option "Queen"
          - option "King"
          - option "Twin"
      - generic [ref=e96]:
        - generic [ref=e97]: Bed
        - spinbutton [ref=e98]: "2"
    - generic [ref=e99]:
      - paragraph [ref=e100]: Description
      - textbox "Description" [ref=e101]:
        - /placeholder: A beautiful beachfront hotel with stunning sunset views, offering modern rooms, comfortable facilities, and excellent service.
        - text: description
    - generic [ref=e102]:
      - paragraph [ref=e103]: Facilities
      - generic [ref=e104]:
        - button "Free Wi-Fi" [ref=e105] [cursor=pointer]:
          - img [ref=e106]
          - generic [ref=e110]: Free Wi-Fi
        - button "Air Conditioning" [ref=e111] [cursor=pointer]:
          - img [ref=e112]
          - generic [ref=e116]: Air Conditioning
        - button "Heating" [ref=e117] [cursor=pointer]:
          - img [ref=e118]
          - generic [ref=e122]: Heating
        - button "TV" [ref=e123] [cursor=pointer]:
          - img [ref=e124]
          - generic [ref=e127]: TV
        - button "Minibar" [ref=e128] [cursor=pointer]:
          - img [ref=e129]
          - generic [ref=e131]: Minibar
        - button "In-room Safe" [ref=e132] [cursor=pointer]:
          - img [ref=e133]
          - generic [ref=e136]: In-room Safe
        - button "Bathroom" [ref=e137] [cursor=pointer]:
          - img [ref=e138]
          - generic [ref=e141]: Bathroom
        - button "Balcony" [ref=e142] [cursor=pointer]:
          - img [ref=e143]
          - generic [ref=e145]: Balcony
        - button "Kitchen" [ref=e146] [cursor=pointer]:
          - img [ref=e147]
          - generic [ref=e152]: Kitchen
        - button "Shower" [ref=e153] [cursor=pointer]:
          - img [ref=e154]
          - generic [ref=e157]: Shower
        - button "Bathtub" [ref=e158] [cursor=pointer]:
          - img [ref=e159]
          - generic [ref=e162]: Bathtub
        - button "Hair Dryer" [ref=e163] [cursor=pointer]:
          - img [ref=e164]
          - generic [ref=e168]: Hair Dryer
        - button "Iron" [ref=e169] [cursor=pointer]:
          - img [ref=e170]
          - generic [ref=e173]: Iron
        - button "Work Desk" [ref=e174] [cursor=pointer]:
          - img [ref=e175]
          - generic [ref=e178]: Work Desk
        - button "Sofa" [ref=e179] [cursor=pointer]:
          - img [ref=e180]
          - generic [ref=e183]: Sofa
        - button "Telephone" [ref=e184] [cursor=pointer]:
          - img [ref=e185]
          - generic [ref=e187]: Telephone
        - button "Coffee Maker" [ref=e188] [cursor=pointer]:
          - img [ref=e189]
          - generic [ref=e194]: Coffee Maker
        - button "Dining Area" [ref=e195] [cursor=pointer]:
          - img [ref=e196]
          - generic [ref=e201]: Dining Area
        - button "Work Area" [ref=e202] [cursor=pointer]:
          - img [ref=e203]
          - generic [ref=e206]: Work Area
        - button "Room Service" [ref=e207] [cursor=pointer]:
          - img [ref=e208]
          - generic [ref=e211]: Room Service
    - paragraph [ref=e212]: Please sign in first.
```

# Test source

```ts
  26  |           password: '123456'
  27  |         }
  28  |       }
  29  |     );
  30  | 
  31  |     const body_owner = await response_owner.json();
  32  |     ownerToken = body_owner.token;
  33  | 
  34  |     const responseUser = await request.post('https://lactode-software-house-frontend.vercel.app/api-proxy/auth/login',{
  35  |         data: {
  36  |         identifier: 'user@gmail.com',
  37  |         password: '123456'
  38  |         }
  39  |     });
  40  |     const bodyUser = await responseUser.json();
  41  |     userToken = bodyUser.token;
  42  | });
  43  | 
  44  | function generateHotel() {
  45  |   const timestamp = Date.now();
  46  |   return {
  47  |     hotelName:`test_hotel_${Math.floor(Math.random() * 1000)}${timestamp}`,
  48  |     phone: `123456${Math.floor(Math.random() * 9000 + 1000)}`,
  49  |     email: `test_${timestamp}@mail.com`,
  50  |     address:"somewhere",
  51  |     province:"Bangkok",
  52  |     postalCode:"10330",
  53  |     description:"6767",
  54  |     owner:"owner@gmail.com"
  55  |   };
  56  | }
  57  | 
  58  | async function login(page,email) {
  59  |     await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  60  |     await page.getByRole('link', { name: 'Login' }).click();
  61  | 
  62  |     const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
  63  |     await expect(emailInput).toBeVisible();
  64  |     await expect(emailInput).toBeEditable();
  65  | 
  66  |     await page.waitForTimeout(1000);
  67  | 
  68  |     await page.getByRole('textbox', { name: 'Email / Phone' }).fill(email);
  69  |     await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  70  | 
  71  |     await Promise.all([
  72  |     page.waitForResponse(res =>
  73  |       res.url().includes('/auth/login') && res.status() === 200
  74  |     ),
  75  |     page.getByRole('button', { name: 'Sign In' }).click()
  76  |     ]);
  77  | 
  78  |     //confirm login success
  79  |     await expect(
  80  |         page.getByRole('button', { name: 'Logout' })
  81  |     ).toBeVisible();
  82  | }
  83  | 
  84  | async function createHotel(page,hotel) {
  85  | 
  86  |     await page.getByTestId('navbar-admin-hotels').click();
  87  |     await page.getByRole('link', { name: 'create hotel' }).click();
  88  |     await page.getByTestId('hotel-form-name').fill(hotel.hotelName);
  89  |     await page.getByTestId('hotel-form-tel').fill(hotel.phone);
  90  |     await page.getByTestId('hotel-form-email').fill(hotel.email);
  91  |     await page.getByTestId('hotel-form-address').fill(hotel.address);
  92  |     await page.getByTestId('hotel-form-district').fill('Pathumwan');
  93  |     await page.getByTestId('hotel-form-province').fill(hotel.province);
  94  |     await page.getByTestId('hotel-form-postalcode').fill(hotel.postalCode);
  95  |     await page.getByTestId('hotel-form-description').fill(hotel.description);
  96  |     await page.getByTestId('hotel-form-owner-email').fill('owner@gmail.com');
  97  |     const [response] = await Promise.all([
  98  |     page.waitForResponse(res =>
  99  |         res.url().includes('/hotels') && res.request().method() === 'POST'
  100 |     ),
  101 |     page.getByTestId('hotel-form-submit').click()
  102 |     ]); 
  103 | 
  104 |     const data = await response.json();
  105 |     const hotelID = data.data._id;
  106 | 
  107 |     return hotelID;
  108 | 
  109 | }
  110 | 
  111 | async function createRoom(page,hotelID){
  112 |     await page.goto(`${baseURL}owner/hotels/${hotelID}`);
  113 | 
  114 |     await page.getByRole('link', { name: 'Create Room' }).click();
  115 |     await page.getByLabel('Room TypeSelect room').selectOption('double');
  116 |     await page.getByPlaceholder('10').fill('2');
  117 |     await page.getByPlaceholder('4').fill('2');
  118 |     await page.getByPlaceholder('2').fill('2');
  119 |     await page.getByPlaceholder('500').fill('1200');
  120 |     await page.getByLabel('Bed TypeSelect bed').selectOption('double');
  121 |     await page.getByRole('textbox', { name: 'Description' }).fill('description');
  122 | 
  123 |     await page.waitForTimeout(1000);
  124 | 
  125 |     const [response] = await Promise.all([
> 126 |     page.waitForResponse(res =>
      |          ^ Error: page.waitForResponse: Test timeout of 30000ms exceeded.
  127 |         res.url().includes('/rooms') && res.request().method() === 'POST'
  128 |     ),
  129 |     page.getByRole('button', { name: 'create' }).click()
  130 |     ]); 
  131 | 
  132 |     const data = await response.json();
  133 |     const roomID = data.data._id;
  134 | 
  135 |     return roomID;
  136 | }
  137 | 
  138 | async function cleanUp(request,hotelID,roomID){
  139 |     if (hotelID && roomID) {
  140 |         await request.delete(
  141 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}/rooms/${roomID}`,
  142 |         {headers: {Authorization: `Bearer ${ownerToken}`}});
  143 |     }
  144 |     if (hotelID) {
  145 |         await request.delete(
  146 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`,
  147 |         {headers: {Authorization: `Bearer ${adminToken}`}});
  148 |     }
  149 |     
  150 | }
  151 | 
  152 | test.describe('Epic 2-1 Hotel Owner can create new room',()=>{
  153 |     test('TC8-1 Hotel owner create new room succesfully',async({page,request})=>{
  154 |         let roomID = null;
  155 |         let hotelID = null;
  156 |         try{
  157 |             //admin
  158 |             await login(page,'admin@gmail.com');
  159 | 
  160 |             const hotel = generateHotel();
  161 | 
  162 |             hotelID = await createHotel(page,hotel);
  163 | 
  164 |             await page.getByRole('button', { name: 'Logout' }).click();
  165 |             await login(page,'owner@gmail.com');
  166 | 
  167 |             roomID = await createRoom(page,hotelID);
  168 | 
  169 |             await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
  170 |             await expect(page.getByText('max 2 adults')).toBeVisible();
  171 |             await expect(roomID).not.toBeNull();
  172 |         }finally{
  173 |             await cleanUp(request,hotelID,roomID);
  174 |         }
  175 |     });
  176 | 
  177 |     test('TC8-2 Hotel owner create new room unsuccesfully : room type is empty',async({page,request})=>{
  178 |         let roomID = null;
  179 |         let hotelID = null;
  180 |         try{
  181 |             //admin
  182 |             await login(page,'admin@gmail.com');
  183 | 
  184 |             const hotel = generateHotel();
  185 | 
  186 |             hotelID = await createHotel(page,hotel);
  187 | 
  188 |             await page.getByRole('button', { name: 'Logout' }).click();
  189 |             await login(page,'owner@gmail.com');
  190 | 
  191 |             //create room
  192 |             await page.goto(`${baseURL}owner/hotels/${hotelID}`);
  193 | 
  194 |             await page.getByRole('link', { name: 'Create Room' }).click();
  195 |             //await page.getByLabel('Room TypeSelect room').selectOption('double');
  196 |             await page.getByPlaceholder('10').fill('2');
  197 |             await page.getByPlaceholder('4').fill('2');
  198 |             await page.getByPlaceholder('2').fill('2');
  199 |             await page.getByPlaceholder('500').fill('1200');
  200 |             await page.getByLabel('Bed TypeSelect bed').selectOption('double');
  201 |             await page.getByRole('textbox', { name: 'Description' }).fill('description');
  202 | 
  203 |             await page.waitForTimeout(1000);
  204 |             await page.getByRole('button', { name: 'create' }).click();
  205 | 
  206 |             //check
  207 |             await expect(page.getByText('Please select room type.')).toBeVisible();
  208 |             await expect(roomID).toBeNull();
  209 |         }finally{
  210 |             await cleanUp(request,hotelID,roomID);
  211 |         }
  212 |     });
  213 | 
  214 |     test('TC8-3 Hotel owner create new room unsuccesfully : room amount is empty',async({page,request})=>{
  215 |         let roomID = null;
  216 |         let hotelID = null;
  217 |         try{
  218 |             //admin
  219 |             await login(page,'admin@gmail.com');
  220 | 
  221 |             const hotel = generateHotel();
  222 | 
  223 |             hotelID = await createHotel(page,hotel);
  224 | 
  225 |             await page.getByRole('button', { name: 'Logout' }).click();
  226 |             await login(page,'owner@gmail.com');
```