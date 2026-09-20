# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/01-auth.spec.ts >> Authentication >> rejects invalid credentials
- Location: tests/e2e/01-auth.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('error')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('error') with timeout 5000ms
  - waiting for getByTestId('error')

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username": standard_user
    - textbox "Password": invalid_password
    - alert:
      - button "Dismiss error"
      - text: "Epic sadface: Username and password do not match any user in this service"
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  1  | import { config } from '../../config/env.config';
  2  | import { expect, test } from '../../utils/customFixtures';
  3  | 
  4  | test.describe('Authentication', () => {
  5  |   test('successfully logs in with valid credentials', async ({
  6  |     loginPage,
  7  |     page,
  8  |   }) => {
  9  |     await loginPage.navigate();
  10 |     await loginPage.login(config.username, config.password);
  11 | 
  12 |     await expect(page).toHaveURL(/inventory\.html/);
  13 |   });
  14 | 
  15 |   test('rejects a locked-out user', async ({ loginPage, page }) => {
  16 |     await loginPage.navigate();
  17 |     await loginPage.login('locked_out_user', config.password);
  18 | 
  19 |     await expect(page.getByTestId('error')).toContainText(
  20 |       'Epic sadface: Sorry, this user has been locked out.',
  21 |     );
  22 |   });
  23 | 
  24 |   test('rejects invalid credentials', async ({ loginPage, page }) => {
  25 |     await loginPage.navigate();
  26 |     await loginPage.login(config.username, 'invalid_password');
  27 | 
> 28 |     await expect(page.getByTestId('error')).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  29 |   });
  30 | });
```