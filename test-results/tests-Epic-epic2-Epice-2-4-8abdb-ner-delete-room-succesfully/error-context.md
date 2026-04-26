# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Epic\epic2.test.js >> Epice 2-4 Hotel Owner can delete  room >> TC11-1 Hotel owner delete room succesfully
- Location: tests\Epic\epic2.test.js:447:10

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('No rooms available for this hotel yet.')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('No rooms available for this hotel yet.')

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
  - main [ref=e36]:
    - generic [ref=e37]:
      - link "Back" [ref=e38] [cursor=pointer]:
        - /url: /owner/hotels
        - generic [ref=e39]: Back
      - link "Edit" [ref=e40] [cursor=pointer]:
        - /url: /owner/hotels/69ee1dfa7903abea33623410/edit
        - generic [ref=e41]: Edit
    - generic [ref=e42]:
      - img "Photo" [ref=e44]
      - generic [ref=e45]:
        - heading "test_hotel_984" [level=1] [ref=e46]
        - paragraph [ref=e47]: somewhere, somewhere, Bangkok
        - paragraph [ref=e48]: "6767"
        - generic [ref=e49]:
          - generic [ref=e50]:
            - img [ref=e51]
            - text: "1234566314"
          - generic [ref=e53]:
            - img [ref=e54]
            - text: test_1777212920981@mail.com
      - generic [ref=e57]:
        - heading "Facilities" [level=2] [ref=e58]
        - generic [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e61]
            - generic [ref=e65]: Swimming Pool
          - generic [ref=e66]:
            - img [ref=e67]
            - generic [ref=e70]: Room Service
          - generic [ref=e71]:
            - img [ref=e72]
            - generic [ref=e76]: Heating
      - generic [ref=e77]:
        - heading "Availability" [level=2] [ref=e78]
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]:
              - textbox [ref=e82] [cursor=pointer]
              - generic [ref=e83]: "-"
              - textbox [ref=e84] [cursor=pointer]
            - generic [ref=e86]:
              - img [ref=e87]
              - spinbutton [ref=e90]
              - generic [ref=e91]: people
          - button "Search" [ref=e92] [cursor=pointer]:
            - generic [ref=e93]: Search
      - generic [ref=e94]:
        - generic [ref=e95]:
          - heading "Rooms" [level=2] [ref=e96]
          - link "Create Room" [ref=e97] [cursor=pointer]:
            - /url: /owner/hotels/69ee1dfa7903abea33623410/rooms/create
            - generic [ref=e98]: Create Room
        - generic [ref=e100]:
          - img "double" [ref=e102]
          - generic [ref=e103]:
            - heading "double" [level=3] [ref=e104]
            - paragraph [ref=e105]: double
            - paragraph [ref=e106]: "available : 2"
            - generic [ref=e107]:
              - img [ref=e108]
              - text: max 2 adults
          - link "Detail" [ref=e112] [cursor=pointer]:
            - /url: /owner/hotels/69ee1dfa7903abea33623410/rooms/69ee1e05b19ef4d5f9c477ea
            - generic [ref=e113]: Detail
  - alert [ref=e114]
```

# Test source

```ts
  369 | 
  370 |         const hotelRes = await request.get(
  371 |         'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
  372 |         {
  373 |             headers: {
  374 |             Authorization: `Bearer ${ownerToken}`
  375 |             }
  376 |         }
  377 |         );
  378 |         const hotelData = await hotelRes.json();
  379 |         const firstHotelID = hotelData.data[0]._id;
  380 | 
  381 |         const roomRes = await request.get(
  382 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${firstHotelID}/rooms`,
  383 |         {
  384 |             headers: {
  385 |             Authorization: `Bearer ${ownerToken}`
  386 |             }
  387 |         }
  388 |         );
  389 |         const roomData = await roomRes.json();
  390 |         const firstRoomID = roomData.data[0].roomType;
  391 | 
  392 |         await page.goto(`${baseURL}/owner/hotels/${firstHotelID}`);
  393 |         
  394 |         await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
  395 | 
  396 |     });
  397 | });
  398 | test.describe('Epice 2-3 Hotel Owner can edit  room',()=>{
  399 |     test('TC10-1 Hotel owner edit room succesfully',async({page,request})=>{
  400 |         let roomID = null;
  401 |         let hotelID = null;
  402 |         let newDescription = 'Room with seaside beach view'
  403 |         let newPrice = '2000'
  404 |         let newPeople = '4'
  405 |         let newRoomType = 'Suite'
  406 |         let newBedType = 'Queen'
  407 |         try{
  408 |             //admin
  409 |             await login(page,'admin@gmail.com');
  410 | 
  411 |             const hotel = generateHotel();
  412 | 
  413 |             hotelID = await createHotel(page,hotel);
  414 | 
  415 |             await page.getByRole('button', { name: 'Logout' }).click();
  416 |             await login(page,'owner@gmail.com');
  417 |             roomID = await createRoom(page,hotelID);
  418 | 
  419 |             await page.goto(`${baseURL}owner/hotels/${hotelID}/rooms/${roomID}`);
  420 |             await page.getByRole('link', { name: 'Edit' }).click();
  421 | 
  422 |             await page.getByPlaceholder('500').fill(newPrice);
  423 |             await page.getByPlaceholder('4').fill(newPeople);
  424 |             await page.getByLabel('Room TypeSelect room').selectOption(newRoomType);
  425 |             await page.getByLabel('Bed TypeSelect bed').selectOption(newBedType);
  426 |             await page.getByRole('textbox', { name: 'Description' }).fill(newDescription)
  427 | 
  428 |             
  429 |             await page.getByRole('button', { name: 'save change' }).click();
  430 |             await page.waitForTimeout(1000);
  431 |            
  432 |             await expect(page.getByRole('textbox', { name: 'Description' })).toContainText(newDescription);
  433 |             await expect(page.getByText(`${newPrice} baht/day${newPeople} people${newBedType}`)).toBeVisible
  434 |             await expect(page.getByText(`Room Type ${newRoomType}`)).toBeVisible();
  435 |         }finally{
  436 |            try {
  437 |                 await cleanUp(hotelID, roomID);
  438 |             } catch (err) {
  439 |                 console.error("Cleanup failed:", err);
  440 |             }
  441 |         }
  442 |     });
  443 |     
  444 | });
  445 | 
  446 | test.describe('Epice 2-4 Hotel Owner can delete  room',()=>{
  447 |     test.only('TC11-1 Hotel owner delete room succesfully',async({page,request})=>{
  448 |         let roomID = null;
  449 |         let hotelID = null;
  450 |         try{
  451 |             //admin
  452 |             await login(page,'admin@gmail.com');
  453 | 
  454 |             const hotel = generateHotel();
  455 | 
  456 |             hotelID = await createHotel(page,hotel);
  457 | 
  458 |             await page.getByRole('button', { name: 'Logout' }).click();
  459 |             await login(page,'owner@gmail.com');
  460 |             roomID = await createRoom(page,hotelID);
  461 |             console.log(roomID)
  462 |             await page.goto(`${baseURL}owner/hotels/${hotelID}/rooms/${roomID}`);
  463 | 
  464 |             await page.getByRole('button', { name: 'Delete' }).click();
  465 |             await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  466 | 
  467 |             await page.waitForTimeout(1000);
  468 |             await page.goto(`${baseURL}owner/hotels/${hotelID}`);
> 469 |             await expect(page.getByText('No rooms available for this hotel yet.')).toBeVisible();
      |                                                                                    ^ Error: expect(locator).toBeVisible() failed
  470 |            
  471 |         }finally{
  472 |            try {
  473 |                 await cleanUp(hotelID, roomID);
  474 |             } catch (err) {
  475 |                 console.error("Cleanup failed:", err);
  476 |             }
  477 |         }
  478 |     });
  479 |     
  480 | });
  481 | 
  482 | 
  483 | test.describe('Epic 2-5 user can view room',()=>{
  484 |     test('TC12-1 User can view their hotel',async({page,request})=>{
  485 |         await login(page, 'user@gmail.com');
  486 | 
  487 |         const hotelRes = await request.get(
  488 |         'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
  489 |         {
  490 |             headers: {
  491 |             Authorization: `Bearer ${userToken}`
  492 |             }
  493 |         }
  494 |         );
  495 |         const hotelData = await hotelRes.json();
  496 |         const firstHotelID = hotelData.data[0]._id;
  497 | 
  498 |         const roomRes = await request.get(
  499 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${firstHotelID}/rooms`,
  500 |         {
  501 |             headers: {
  502 |             Authorization: `Bearer ${userToken}`
  503 |             }
  504 |         }
  505 |         );
  506 |         const roomData = await roomRes.json();
  507 |         const firstRoomID = roomData.data[0].roomType;
  508 | 
  509 |         await page.goto(`${baseURL}/hotels/${firstHotelID}`);
  510 |         
  511 |         await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
  512 | 
  513 |     });
  514 | });
  515 | 
  516 | test.describe('Epic 2-6 Admin can view room',()=>{
  517 |     test('TC13-1 Admin can view their hotel',async({page,request})=>{
  518 |         await login(page, 'admin@gmail.com');
  519 | 
  520 |         const hotelRes = await request.get(
  521 |         'https://lactode-software-house-frontend.vercel.app/api-proxy/hotels',
  522 |         {
  523 |             headers: {
  524 |             Authorization: `Bearer ${adminToken}`
  525 |             }
  526 |         }
  527 |         );
  528 |         const hotelData = await hotelRes.json();
  529 |         const firstHotelID = hotelData.data[0]._id;
  530 | 
  531 |         const roomRes = await request.get(
  532 |         `https://lactode-software-house-frontend.vercel.app/api-proxy/hotels/${firstHotelID}/rooms`,
  533 |         {
  534 |             headers: {
  535 |             Authorization: `Bearer ${adminToken}`
  536 |             }
  537 |         }
  538 |         );
  539 |         const roomData = await roomRes.json();
  540 |         const firstRoomID = roomData.data[0].roomType;
  541 | 
  542 |         await page.goto(`${baseURL}/admin/hotels/${firstHotelID}`);
  543 |         
  544 |         await expect(page.getByRole('heading', { name: 'double' })).toBeVisible();
  545 | 
  546 |     });
  547 | });
  548 | 
  549 | 
```