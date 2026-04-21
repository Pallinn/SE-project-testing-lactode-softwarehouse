import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

function generateUser() {
  const timestamp = Date.now();
  return {
    firstName: 'humYai',
    lastName: 'Hum Lek',
    username: `Hum${Math.floor(Math.random() * 1000)}`,
    email: `test_${timestamp}@mail.com`,
    phone: `123-456-${Math.floor(Math.random() * 9000 + 1000)}`,
    password: '123456'
  };
}

const user = generateUser();

async function regis(page) {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Register' }).click();

    // ✅ รอให้ form พร้อมก่อน
    const emailInput = page.getByRole('textbox', { name: 'Email' });

    // ✅ รอให้ใช้ได้จริง (ไม่ใช่แค่เห็น)
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
    await page.getByRole('textbox', { name: 'Username' }).fill(user.username);
    await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Telephone Number' }).fill(user.phone);
    await page.getByRole('textbox', { name: 'Password' }).fill(user.password);

    await page.getByRole('checkbox', { name: 'I agree to the Privacy Policy' }).check();

    const btn = page.getByRole('button', { name: 'Sign Up' });
    await expect(btn).toBeEnabled();
    await btn.click();

    await expect(
      page.getByText('Sign in')
    ).toBeVisible({ timeout: 5000 });
}

async function login_myProfile(page){
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Login' }).click();

    // ✅ รอให้ form พร้อมก่อน
    const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.waitForTimeout(300);

    await page.getByRole('textbox', { name: 'Email / Phone' }).click();
    await page.getByRole('textbox', { name: 'Email / Phone' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(
     page.getByRole('link', { name: user.username })
    ).toBeVisible({ timeout: 10000 });
    await page.getByRole('link', { name: user.username }).click();

    await expect(page.getByText('My Profile')).toBeVisible();
    await page.waitForTimeout(500);
}

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await regis(page);

  await page.close();
});

test('user should see the correct information',async({page})=>{
    await login_myProfile(page);

    await expect(page.getByRole('paragraph').filter({ hasText: user.firstName + ' ' + user.lastName})).toBeVisible();
    await expect(page.getByRole('main').getByText(user.username, { exact: true })).toBeVisible();
    await expect(page.getByText(user.phone)).toBeVisible();
    await expect(page.getByRole('heading', { name: user.firstName + ' ' + user.lastName, exact: true })).toBeVisible();
    await expect(page.getByRole('complementary').getByText(user.email)).toBeVisible();

});

test('user can edit profile (first name)',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('changed_firstName');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await expect(page.getByRole('paragraph').filter({ hasText: 'changed_firstName' + ' ' + user.lastName })).toBeVisible();

});

test('user can edit profile (last name)',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('changed_lastName');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await expect(page.getByRole('paragraph').filter({ hasText: 'changed_firstName' + ' ' + 'changed_lastName' })).toBeVisible();

});


test('user can edit profile (tel)',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Phone Number' }).click();
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('000-000-0000');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await expect(page.getByText('000-000-0000')).toBeVisible();

});

test('user can edit profile (email)',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('changed@gmail.com');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await expect(page.getByRole('complementary').getByText('changed@gmail.com')).toBeVisible();

    //change back

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
    await page.getByRole('button', { name: 'Update Profile' }).click();

    await page.waitForTimeout(500);
});

//invalid change profile

test('user cant edit profile (email) : invalid format',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await page.waitForTimeout(500);

    await expect(page.getByRole('button', { name: 'Update Profile' })).toBeVisible();

});

test('user cant edit profile (tel) : invalid format',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Profile' }).click();

    await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Phone Number' }).click();
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('000-000');
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    await page.waitForTimeout(500);

    await expect(page.getByRole('button', { name: 'Update Profile' })).toBeVisible();

});

//CHANGE PASSWORD

test('user can change password',async({page})=>{
    await login_myProfile(page);

    await page.getByRole('button', { name: 'Change Password' }).click();

    await page.getByRole('textbox', { name: 'Current Password' }).click();
    await page.getByRole('textbox', { name: 'Current Password' }).fill('123456');
    await page.getByRole('textbox', { name: 'New Password', exact: true }).click();
    await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('changedPassword');
    await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
    await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('changedPassword');
    await page.getByRole('button', { name: 'Update Password' }).click();

    await page.getByRole('navigation').getByRole('button', { name: 'Logout' }).click();

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Login' }).click();

    const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEditable();

    await page.waitForTimeout(300);

    await page.getByRole('textbox', { name: 'Email / Phone' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    await page.waitForTimeout(300);

    await page.getByRole('button', { name: 'Sign In' }).click();

    // ✅ รอให้ redirect เสร็จ
    await expect(page.getByRole('link', { name: 'user' })).toBeVisible();
});