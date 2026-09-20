# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/01-auth.spec.ts >> Authentication >> preserves the session after re-navigation
- Location: tests/e2e/01-auth.spec.ts:151:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /inventory\.html/
Received string:  "https://www.saucedemo.com/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://www.saucedemo.com/"

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username"
    - textbox "Password"
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  60  |     await expect(page.getByTestId('error')).toContainText(credentialsError);
  61  |   });
  62  | 
  63  |   // Summary: Verifies an invalid password is rejected.
  64  |   test('rejects an invalid password', async ({ loginPage, page }) => {
  65  |     await loginPage.navigate();
  66  |     await loginPage.login(config.users.standard, 'wrong_password');
  67  | 
  68  |     await expect(page.getByTestId('error')).toContainText(credentialsError);
  69  |   });
  70  | 
  71  |   // Summary: Verifies both invalid username and password are rejected.
  72  |   test('rejects both invalid credentials', async ({ loginPage, page }) => {
  73  |     await loginPage.navigate();
  74  |     await loginPage.login('wrong_user', 'wrong_password');
  75  | 
  76  |     await expect(page.getByTestId('error')).toContainText(
  77  |       'Username and password do not match',
  78  |     );
  79  |   });
  80  | 
  81  |   // Summary: Verifies empty username and password validation.
  82  |   test('rejects empty credentials', async ({ loginPage, page }) => {
  83  |     await loginPage.navigate();
  84  |     await loginPage.login('', '');
  85  | 
  86  |     await expect(page.getByTestId('error')).toContainText(
  87  |       'Epic sadface: Username is required',
  88  |     );
  89  |   });
  90  | 
  91  |   // Summary: Verifies missing password validation.
  92  |   test('rejects an empty password', async ({ loginPage, page }) => {
  93  |     await loginPage.navigate();
  94  |     await loginPage.login(config.users.standard, '');
  95  | 
  96  |     await expect(page.getByTestId('error')).toContainText(
  97  |       'Epic sadface: Password is required',
  98  |     );
  99  |   });
  100 | 
  101 |   // Summary: Verifies missing username validation.
  102 |   test('rejects an empty username', async ({ loginPage, page }) => {
  103 |     await loginPage.navigate();
  104 |     await loginPage.login('', validPassword);
  105 | 
  106 |     await expect(page.getByTestId('error')).toContainText(
  107 |       'Epic sadface: Username is required',
  108 |     );
  109 |   });
  110 | 
  111 |   // Summary: Verifies usernames are case-sensitive.
  112 |   test('rejects an uppercase username', async ({ loginPage, page }) => {
  113 |     await loginPage.navigate();
  114 |     await loginPage.login('STANDARD_USER', validPassword);
  115 | 
  116 |     await expect(page.getByTestId('error')).toContainText(credentialsError);
  117 |   });
  118 | 
  119 |   // Summary: Verifies passwords are case-sensitive.
  120 |   test('rejects an uppercase password', async ({ loginPage, page }) => {
  121 |     await loginPage.navigate();
  122 |     await loginPage.login(config.users.standard, 'SECRET_SAUCE');
  123 | 
  124 |     await expect(page.getByTestId('error')).toContainText(credentialsError);
  125 |   });
  126 | 
  127 |   // Summary: Verifies leading and trailing username whitespace is rejected.
  128 |   test('rejects username with leading and trailing whitespace', async ({
  129 |     loginPage,
  130 |     page,
  131 |   }) => {
  132 |     await loginPage.navigate();
  133 |     await loginPage.login(` ${config.users.standard} `, validPassword);
  134 | 
  135 |     await expect(page.getByTestId('error')).toContainText(credentialsError);
  136 |   });
  137 | 
  138 |   // Summary: Verifies the login error banner can be dismissed.
  139 |   test('dismisses the login error banner', async ({ loginPage, page }) => {
  140 |     await loginPage.navigate();
  141 |     await loginPage.login('wrong_user', validPassword);
  142 | 
  143 |     const errorBanner = page.getByTestId('error');
  144 |     await expect(errorBanner).toBeVisible();
  145 | 
  146 |     await errorBanner.getByRole('button').click();
  147 |     await expect(errorBanner).toBeHidden();
  148 |   });
  149 | 
  150 |   // Summary: Verifies navigation to the base URL preserves the active session.
  151 |   test('preserves the session after re-navigation', async ({
  152 |     loginPage,
  153 |     page,
  154 |   }) => {
  155 |     await loginPage.navigate();
  156 |     await loginPage.login(config.users.standard, validPassword);
  157 | 
  158 |     await page.goto(config.baseUrl);
  159 | 
> 160 |     await expect(page).toHaveURL(/inventory\.html/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  161 |     await expect(page.getByTestId('inventory-list')).toBeVisible();
  162 |   });
  163 | 
  164 |   // Summary: Verifies logout terminates the session and browser back remains logged out.
  165 |   test('cleans up the session after logout', async ({ loginPage, page }) => {
  166 |     await loginPage.navigate();
  167 |     await loginPage.login(config.users.standard, validPassword);
  168 | 
  169 |     await page.getByRole('button', { name: /open menu/i }).click();
  170 |     await page.getByRole('link', { name: 'Logout' }).click();
  171 | 
  172 |     await expect(page).toHaveURL(/\/$/);
  173 | 
  174 |     await page.goBack();
  175 | 
  176 |     await expect(page).toHaveURL(/\/$/);
  177 |     await expect(loginPage.usernameInput).toBeVisible();
  178 |   });
  179 | });
```