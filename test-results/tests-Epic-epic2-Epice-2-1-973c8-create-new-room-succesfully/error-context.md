# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Epic\epic2.test.js >> Epice 2-1 Hotel Owner can create new room >> TC8-1 Hotel owner create new room succesfully
- Location: tests\Epic\epic2.test.js:149:10

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: apiRequestContext.delete: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - /url: /owner/hotels
          - img [ref=e15]
          - generic [ref=e18]: Hotel Management
        - link "Bookings" [ref=e19] [cursor=pointer]:
          - /url: /owner/bookings
          - img [ref=e20]
          - generic [ref=e24]: Bookings
        - link "owner" [ref=e26] [cursor=pointer]:
          - /url: /account
          - img [ref=e27]
          - generic [ref=e30]: owner
        - button "Logout" [ref=e31] [cursor=pointer]:
          - img [ref=e32]
          - generic [ref=e35]: Logout
  - alert [ref=e36]
  - main [ref=e37]:
    - generic [ref=e38]:
      - paragraph [ref=e39]: Hotel list
      - heading "Manage your hotels" [level=1] [ref=e40]
      - paragraph [ref=e41]: This page shows only hotels assigned to your owner account.
    - generic [ref=e42]:
      - article [ref=e43]:
        - img "test_hotel_822" [ref=e45]
        - generic [ref=e46]:
          - generic [ref=e47]:
            - paragraph [ref=e48]: Bangkok
            - heading "test_hotel_822" [level=2] [ref=e49]
            - paragraph [ref=e50]: somewhere, Bangkok
          - generic [ref=e51]:
            - generic [ref=e52]:
              - paragraph [ref=e53]: somewhere
              - paragraph [ref=e54]: "1234563045"
              - paragraph [ref=e55]: "Postal code: 10330"
            - generic [ref=e56]:
              - generic [ref=e57]:
                - paragraph [ref=e58]: Booking rule
                - paragraph [ref=e59]: Up to 3 Nights
              - link "Detail" [ref=e60] [cursor=pointer]:
                - /url: /owner/hotels/69edc29f7cac358742353366
                - img [ref=e62]
                - generic [ref=e65]: Detail
      - article [ref=e66]:
        - img "test_hotel_950" [ref=e68]
        - generic [ref=e69]:
          - generic [ref=e70]:
            - paragraph [ref=e71]: Bangkok
            - heading "test_hotel_950" [level=2] [ref=e72]
            - paragraph [ref=e73]: somewhere, Bangkok
          - generic [ref=e74]:
            - generic [ref=e75]:
              - paragraph [ref=e76]: somewhere
              - paragraph [ref=e77]: "1234568713"
              - paragraph [ref=e78]: "Postal code: 10330"
            - generic [ref=e79]:
              - generic [ref=e80]:
                - paragraph [ref=e81]: Booking rule
                - paragraph [ref=e82]: Up to 3 Nights
              - link "Detail" [ref=e83] [cursor=pointer]:
                - /url: /owner/hotels/69edc23bc457da5b4cd29015
                - img [ref=e85]
                - generic [ref=e88]: Detail
      - article [ref=e89]:
        - img "test_hotel_736" [ref=e91]
        - generic [ref=e92]:
          - generic [ref=e93]:
            - paragraph [ref=e94]: Bangkok
            - heading "test_hotel_736" [level=2] [ref=e95]
            - paragraph [ref=e96]: somewhere, Bangkok
          - generic [ref=e97]:
            - generic [ref=e98]:
              - paragraph [ref=e99]: somewhere
              - paragraph [ref=e100]: "1234562175"
              - paragraph [ref=e101]: "Postal code: 10330"
            - generic [ref=e102]:
              - generic [ref=e103]:
                - paragraph [ref=e104]: Booking rule
                - paragraph [ref=e105]: Up to 3 Nights
              - link "Detail" [ref=e106] [cursor=pointer]:
                - /url: /owner/hotels/69edc02d7cac358742353364
                - img [ref=e108]
                - generic [ref=e111]: Detail
      - article [ref=e112]:
        - img "test_hotel_740" [ref=e114]
        - generic [ref=e115]:
          - generic [ref=e116]:
            - paragraph [ref=e117]: Bangkok
            - heading "test_hotel_740" [level=2] [ref=e118]
            - paragraph [ref=e119]: somewhere, Bangkok
          - generic [ref=e120]:
            - generic [ref=e121]:
              - paragraph [ref=e122]: somewhere
              - paragraph [ref=e123]: "1234568845"
              - paragraph [ref=e124]: "Postal code: 10330"
            - generic [ref=e125]:
              - generic [ref=e126]:
                - paragraph [ref=e127]: Booking rule
                - paragraph [ref=e128]: Up to 3 Nights
              - link "Detail" [ref=e129] [cursor=pointer]:
                - /url: /owner/hotels/69edbfdfc457da5b4cd29012
                - img [ref=e131]
                - generic [ref=e134]: Detail
      - article [ref=e135]:
        - img "test_hotel_481" [ref=e137]
        - generic [ref=e138]:
          - generic [ref=e139]:
            - paragraph [ref=e140]: Bangkok
            - heading "test_hotel_481" [level=2] [ref=e141]
            - paragraph [ref=e142]: somewhere, Bangkok
          - generic [ref=e143]:
            - generic [ref=e144]:
              - paragraph [ref=e145]: somewhere
              - paragraph [ref=e146]: "1234567103"
              - paragraph [ref=e147]: "Postal code: 10330"
            - generic [ref=e148]:
              - generic [ref=e149]:
                - paragraph [ref=e150]: Booking rule
                - paragraph [ref=e151]: Up to 3 Nights
              - link "Detail" [ref=e152] [cursor=pointer]:
                - /url: /owner/hotels/69edbf54b41e56c8b08ef9d0
                - img [ref=e154]
                - generic [ref=e157]: Detail
      - article [ref=e158]:
        - img "test_hotel_451" [ref=e160]
        - generic [ref=e161]:
          - generic [ref=e162]:
            - paragraph [ref=e163]: Bangkok
            - heading "test_hotel_451" [level=2] [ref=e164]
            - paragraph [ref=e165]: somewhere, Bangkok
          - generic [ref=e166]:
            - generic [ref=e167]:
              - paragraph [ref=e168]: somewhere
              - paragraph [ref=e169]: "1234565884"
              - paragraph [ref=e170]: "Postal code: 10330"
            - generic [ref=e171]:
              - generic [ref=e172]:
                - paragraph [ref=e173]: Booking rule
                - paragraph [ref=e174]: Up to 3 Nights
              - link "Detail" [ref=e175] [cursor=pointer]:
                - /url: /owner/hotels/69edbed47cac358742353362
                - img [ref=e177]
                - generic [ref=e180]: Detail
    - generic [ref=e181]:
      - button "Previous" [disabled] [ref=e182]
      - generic [ref=e183]: Page 1 of 4
      - button "Next" [ref=e184]
```

# Test source

```ts
  41  |     address:"somewhere",
  42  |     province:"Bangkok",
  43  |     postalCode:"10330",
  44  |     description:"6767",
  45  |     owner:"owner@gmail.com"
  46  |   };
  47  | }
  48  | 
  49  | async function login(page,email) {
  50  |     await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  51  |     await page.getByRole('link', { name: 'Login' }).click();
  52  | 
  53  |     const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
  54  |     await expect(emailInput).toBeVisible();
  55  |     await expect(emailInput).toBeEditable();
  56  | 
  57  |     await page.waitForTimeout(300);
  58  | 
  59  |     await page.getByRole('textbox', { name: 'Email / Phone' }).fill(email);
  60  |     await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  61  | 
  62  |     await Promise.all([
  63  |     page.waitForResponse(res =>
  64  |       res.url().includes('/auth/login') && res.status() === 200
  65  |     ),
  66  |     page.getByRole('button', { name: 'Sign In' }).click()
  67  |     ]);
  68  | 
  69  |     // 🔥 รอให้ browser set cookie / localStorage เสร็จ
  70  |     await page.waitForLoadState('networkidle');
  71  | 
  72  |     // 🔥 confirm login success
  73  |     await expect(
  74  |         page.getByRole('button', { name: 'Logout' })
  75  |     ).toBeVisible();
  76  | }
  77  | 
  78  | async function createHotel(page,hotel) {
  79  | 
  80  |     await page.getByRole('link', { name: 'Hotel', exact: true }).click();
  81  |     await page.getByRole('link', { name: 'create hotel' }).click();
  82  |     await page.getByRole('textbox', { name: 'Resort Villa brabra' }).fill(hotel.hotelName);
  83  |     await page.getByRole('textbox', { name: '+66 76 123' }).fill(hotel.phone);
  84  |     await page.getByRole('textbox', { name: 'contact@sunsetparadise.com' }).fill(hotel.email);
  85  |     await page.getByRole('textbox', { name: 'Huai Kwang, Central, 342 Rama' }).fill(hotel.address);
  86  |     await page.getByRole('textbox', { name: 'Bangkok' }).fill(hotel.province);
  87  |     await page.getByRole('textbox', { name: '12345' }).fill(hotel.postalCode);
  88  |     await page.getByRole('textbox', { name: 'A beautiful beachfront hotel' }).fill(hotel.description);
  89  |     await page.getByRole('textbox', { name: 'owner@example.com' }).fill('owner@gmail.com');
  90  |     await page.getByRole('button', { name: 'Swimming Pool' }).click();
  91  |     await page.getByRole('button', { name: 'Room Service' }).click();
  92  |     await page.getByRole('button', { name: 'Heating' }).click();
  93  |     const [response] = await Promise.all([
  94  |     page.waitForResponse(res =>
  95  |         res.url().includes('/hotels') && res.request().method() === 'POST'
  96  |     ),
  97  |     page.getByRole('button', { name: 'create' }).click()
  98  |     ]); 
  99  | 
  100 |     const data = await response.json();
  101 |     const hotelID = data.data._id;
  102 | 
  103 |     return hotelID;
  104 | }
  105 | 
  106 | async function createRoom(page,hotelID){
  107 |     await page.goto(`${baseURL}owner/hotels/${hotelID}`);
  108 | 
  109 |     await page.getByRole('link', { name: 'Create Room' }).click();
  110 |     await page.getByLabel('Room TypeSelect room').selectOption('double');
  111 |     await page.getByPlaceholder('10').fill('2');
  112 |     await page.getByPlaceholder('4').fill('2');
  113 |     await page.getByPlaceholder('2').fill('2');
  114 |     await page.getByPlaceholder('500').fill('1200');
  115 |     await page.getByLabel('Bed TypeSelect bed').selectOption('double');
  116 |     await page.getByRole('textbox', { name: 'Description' }).fill('description');
  117 |     await page.getByRole('button', { name: 'create' }).click();
  118 | 
  119 |     page.waitForTimeout(1000);
  120 | 
  121 |     const [response] = await Promise.all([
  122 |     page.waitForResponse(res =>
  123 |         res.url().includes('/rooms') && res.request().method() === 'POST'
  124 |     ),
  125 |     page.getByRole('button', { name: 'create' }).click()
  126 |     ]); 
  127 | 
  128 |     const data = await response.json();
  129 |     const roomID = data.data._id;
  130 | 
  131 |     return roomID;
  132 | }
  133 | 
  134 | async function cleanUp(request,hotelID,roomID){
  135 |     if (hotelID && roomID) {
  136 |         await request.delete(
  137 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}/rooms/${roomID}`,
  138 |         {headers: {Authorization: `Bearer ${ownerToken}`}});
  139 |     }
  140 |     if (hotelID) {
> 141 |         await request.delete(
      |                             ^ Error: apiRequestContext.delete: Target page, context or browser has been closed
  142 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${hotelID}`,
  143 |         {headers: {Authorization: `Bearer ${adminToken}`}});
  144 |     }
  145 |     
  146 | }
  147 | 
  148 | test.describe('Epice 2-1 Hotel Owner can create new room',()=>{
  149 |     test.only('TC8-1 Hotel owner create new room succesfully',async({page,request})=>{
  150 |         let roomID = null;
  151 |         let hotelID = null;
  152 |         try{
  153 |             //admin
  154 |             await login(page,'admin@gmail.com');
  155 | 
  156 |             const hotel = generateHotel();
  157 | 
  158 |             hotelID = await createHotel(page,hotel);
  159 | 
  160 |             await page.getByRole('button', { name: 'Logout' }).click();
  161 |             await login(page,'owner@gmail.com');
  162 | 
  163 |             roomID = await createRoom(page,hotelID);
  164 | 
  165 |             await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
  166 |             await expect(page.getByText('available :')).toBeVisible();
  167 |             await expect(page.getByText('max 2 adults')).toBeVisible();
  168 |             await expect(roomID).not.toBeNull();
  169 |         }finally{
  170 |             await cleanUp(request,hotelID,roomID);
  171 |         }
  172 |     });
  173 | });
  174 | 
```