import { test, expect } from '@playwright/test';

const baseURL = 'https://lactode-software-house-frontend.vercel.app/';

function generateUser() {
  const timestamp = Date.now();
  return {
    firstName: 'FN',
    lastName: 'LN',
    username: `test${Math.floor(Math.random() * 1000)}`,
    email: `test_${timestamp}@mail.com`,
    phone: `123-456-${Math.floor(Math.random() * 9000 + 1000)}`,
    password: '123456'
  };
}

async function goToRegister(page) {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();

  // ✅ รอให้ form พร้อมก่อน
  const emailInput = page.getByRole('textbox', { name: 'Email' });

  // ✅ รอให้ใช้ได้จริง (ไม่ใช่แค่เห็น)
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();
}

async function fillRegisterForm(page, user, agreePolicy = true) {
  await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
  await page.getByRole('textbox', { name: 'Username' }).fill(user.username);
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Telephone Number' }).fill(user.phone);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);

  if (agreePolicy) {
    await page.getByRole('checkbox', { name: 'I agree to the Privacy Policy' }).check();
  }
}

async function submitRegister(page) {
  const btn = page.getByRole('button', { name: 'Sign Up' });

  // ✅ ensure button ready
  await expect(btn).toBeEnabled();

  await btn.click();
}

// ---------------- TESTS ----------------

test.describe('Registration and login', () => {

  //valid regis

  test('should register a user', async ({ page }) => {
    const user = generateUser();

    await goToRegister(page);
    await fillRegisterForm(page, user);
    await submitRegister(page);

    // ✅ FIX: รอ toast แบบถูกต้อง (ไม่ใช้ waitForTimeout)
    await expect(
      page.getByText('Sign in')
    ).toBeVisible({ timeout: 5000 });
  });

  //invalid regis
  
  test('should show error when email exists', async ({ page }) => {
    const user = generateUser();

    // create first user
    await goToRegister(page);
    await fillRegisterForm(page, user);
    await submitRegister(page);

    // register again with same email
    await goToRegister(page);
    await fillRegisterForm(page, {
      ...generateUser(),
      email: 'user@gmail.com'
    });
    await submitRegister(page);

    await expect(page.getByText('This email is already taken.')).toBeVisible();
  });

  test('should show error when phone exists', async ({ page }) => {
    const user = generateUser();

    await goToRegister(page);
    await fillRegisterForm(page, user);
    await submitRegister(page);

    await goToRegister(page);
    await fillRegisterForm(page, {
      ...generateUser(),
      phone: "875-391-7323"
    });
    await submitRegister(page);

    await expect(page.getByText('Telephone already exists')).toBeVisible();
  });

  test('should require policy', async ({ page }) => {
    const user = generateUser();

    await goToRegister(page);
    await fillRegisterForm(page, user, false);

    await expect(
      page.getByRole('button', { name: 'Sign Up' })
    ).toBeDisabled();
  });

  test('invalid email format', async ({ page }) => {
    const user = generateUser();

    await goToRegister(page);
    await fillRegisterForm(page, {
      ...generateUser(),
      email: 'invalid_email'
    });

    await expect(
      page.getByText('Please enter a valid email.')
    ).toBeVisible();
  });

  test('invalid phone format', async ({ page }) => {
    const user = generateUser();

    await goToRegister(page);
    await fillRegisterForm(page, {
      ...generateUser(),
      email: 'invalid_email'
    });

    await expect(
      page.getByText('Telephone number must be in')
    ).toBeDisabled();
  });

  //valid LOGIN

  test('should login', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'Email / Phone' }).fill('user@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // ✅ รอให้ redirect เสร็จ
    await expect(page.getByRole('link', { name: 'user' })).toBeVisible();
  });

  //INVALID LOGIN

  test('LOGIN no field provided', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Please provide your email/')).toBeVisible();
  });

});