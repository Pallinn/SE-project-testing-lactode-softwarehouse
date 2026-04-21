# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\user\profile.test.js >> user can change password
- Location: tests\user\profile.test.js:204:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'user' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'user' })

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
        - link "Hotel" [ref=e14] [cursor=pointer]:
          - /url: /hotels
          - img [ref=e15]
          - generic [ref=e18]: Hotel
        - link "Login" [ref=e20] [cursor=pointer]:
          - /url: /signin
          - img [ref=e21]
          - generic [ref=e24]: Login
  - alert [ref=e25]
  - main [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Sign in" [level=1] [ref=e29]
        - paragraph [ref=e30]: Use your email or phone number to access the booking system.
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: Email / Phone
          - textbox "Email / Phone" [ref=e33]:
            - /placeholder: example@gmail.com or 012-345-6789
            - text: test_1776785302247@mail.com
        - generic [ref=e34]:
          - text: Password
          - textbox "Password" [ref=e35]: changedPassword
        - paragraph [ref=e36]: Please provide email or username and password
        - button "Sign In" [ref=e37]
        - paragraph [ref=e38]:
          - text: No account yet?
          - link "Register" [ref=e39] [cursor=pointer]:
            - /url: /register
```

# Test source

```ts
  136 |     await expect(page.getByText('000-000-0000')).toBeVisible();
  137 | 
  138 | });
  139 | 
  140 | test('user can edit profile (email)',async({page})=>{
  141 |     await login_myProfile(page);
  142 | 
  143 |     await page.getByRole('button', { name: 'Change Profile' }).click();
  144 | 
  145 |     await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
  146 | 
  147 |     await page.getByRole('textbox', { name: 'Email' }).click();
  148 |     await page.getByRole('textbox', { name: 'Email' }).fill('changed@gmail.com');
  149 |     await page.getByRole('button', { name: 'Update Profile' }).click();
  150 |     
  151 |     await expect(page.getByRole('complementary').getByText('changed@gmail.com')).toBeVisible();
  152 | 
  153 |     //change back
  154 | 
  155 |     await page.getByRole('button', { name: 'Change Profile' }).click();
  156 | 
  157 |     await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
  158 | 
  159 |     await page.getByRole('textbox', { name: 'Email' }).click();
  160 |     await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  161 |     await page.getByRole('button', { name: 'Update Profile' }).click();
  162 | 
  163 |     await page.waitForTimeout(500);
  164 | });
  165 | 
  166 | //invalid change profile
  167 | 
  168 | test('user cant edit profile (email) : invalid format',async({page})=>{
  169 |     await login_myProfile(page);
  170 | 
  171 |     await page.getByRole('button', { name: 'Change Profile' }).click();
  172 | 
  173 |     await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
  174 | 
  175 |     await page.getByRole('textbox', { name: 'Email' }).click();
  176 |     await page.getByRole('textbox', { name: 'Email' }).fill('invalid');
  177 |     await page.getByRole('button', { name: 'Update Profile' }).click();
  178 |     
  179 |     await page.waitForTimeout(500);
  180 | 
  181 |     await expect(page.getByRole('button', { name: 'Update Profile' })).toBeVisible();
  182 | 
  183 | });
  184 | 
  185 | test('user cant edit profile (tel) : invalid format',async({page})=>{
  186 |     await login_myProfile(page);
  187 | 
  188 |     await page.getByRole('button', { name: 'Change Profile' }).click();
  189 | 
  190 |     await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
  191 | 
  192 |     await page.getByRole('textbox', { name: 'Phone Number' }).click();
  193 |     await page.getByRole('textbox', { name: 'Phone Number' }).fill('000-000');
  194 |     await page.getByRole('button', { name: 'Update Profile' }).click();
  195 |     
  196 |     await page.waitForTimeout(500);
  197 | 
  198 |     await expect(page.getByRole('button', { name: 'Update Profile' })).toBeVisible();
  199 | 
  200 | });
  201 | 
  202 | //CHANGE PASSWORD
  203 | 
  204 | test('user can change password',async({page})=>{
  205 |     await login_myProfile(page);
  206 | 
  207 |     await page.getByRole('button', { name: 'Change Password' }).click();
  208 | 
  209 |     await page.getByRole('textbox', { name: 'Current Password' }).click();
  210 |     await page.getByRole('textbox', { name: 'Current Password' }).fill('123456');
  211 |     await page.getByRole('textbox', { name: 'New Password', exact: true }).click();
  212 |     await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('changedPassword');
  213 |     await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
  214 |     await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('changedPassword');
  215 |     await page.getByRole('button', { name: 'Update Password' }).click();
  216 | 
  217 |     await page.getByRole('navigation').getByRole('button', { name: 'Logout' }).click();
  218 | 
  219 |     await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  220 |     await page.getByRole('link', { name: 'Login' }).click();
  221 | 
  222 |     const emailInput = page.getByRole('textbox', { name: 'Email / Phone' });
  223 |     await expect(emailInput).toBeVisible();
  224 |     await expect(emailInput).toBeEditable();
  225 | 
  226 |     await page.waitForTimeout(300);
  227 | 
  228 |     await page.getByRole('textbox', { name: 'Email / Phone' }).fill(user.email);
  229 |     await page.getByRole('textbox', { name: 'Password' }).fill('changedPassword');
  230 | 
  231 |     await page.waitForTimeout(300);
  232 | 
  233 |     await page.getByRole('button', { name: 'Sign In' }).click();
  234 | 
  235 |     // ✅ รอให้ redirect เสร็จ
> 236 |     await expect(page.getByRole('link', { name: 'user' })).toBeVisible();
      |                                                            ^ Error: expect(locator).toBeVisible() failed
  237 | });
```