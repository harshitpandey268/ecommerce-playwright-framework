import { config } from '../../config/env.config';
import { expect, test } from '../../utils/customFixtures';

const validPassword = config.password;
const credentialsError =
  'Epic sadface: Username and password do not match any user in this service';

test.describe('Authentication', () => {
  // Summary: Verifies successful login with standard_user credentials.
  test('standard user logs in successfully', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, validPassword);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });

  // Summary: Verifies problem_user can authenticate successfully.
  test('problem user logs in successfully', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.problem, validPassword);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  // Summary: Verifies performance_glitch_user can authenticate despite delays.
  test('performance glitch user logs in successfully', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.performanceGlitch, validPassword);

    await expect(page).toHaveURL(/inventory\.html/, { timeout: 15_000 });
  });

  // Summary: Verifies visual_user can authenticate successfully.
  test('visual user logs in successfully', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.visual, validPassword);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  // Summary: Verifies locked-out users receive the expected error.
  test('rejects a locked-out user', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.lockedOut, validPassword);

    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  // Summary: Verifies an invalid username is rejected.
  test('rejects an invalid username', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('wrong_user', validPassword);

    await expect(page.getByTestId('error')).toContainText(credentialsError);
  });

  // Summary: Verifies an invalid password is rejected.
  test('rejects an invalid password', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, 'wrong_password');

    await expect(page.getByTestId('error')).toContainText(credentialsError);
  });

  // Summary: Verifies both invalid username and password are rejected.
  test('rejects both invalid credentials', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('wrong_user', 'wrong_password');

    await expect(page.getByTestId('error')).toContainText(
      'Username and password do not match',
    );
  });

  // Summary: Verifies empty username and password validation.
  test('rejects empty credentials', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('', '');

    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Username is required',
    );
  });

  // Summary: Verifies missing password validation.
  test('rejects an empty password', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, '');

    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Password is required',
    );
  });

  // Summary: Verifies missing username validation.
  test('rejects an empty username', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('', validPassword);

    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Username is required',
    );
  });

  // Summary: Verifies usernames are case-sensitive.
  test('rejects an uppercase username', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('STANDARD_USER', validPassword);

    await expect(page.getByTestId('error')).toContainText(credentialsError);
  });

  // Summary: Verifies passwords are case-sensitive.
  test('rejects an uppercase password', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, 'SECRET_SAUCE');

    await expect(page.getByTestId('error')).toContainText(credentialsError);
  });

  // Summary: Verifies leading and trailing username whitespace is rejected.
  test('rejects username with leading and trailing whitespace', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(` ${config.users.standard} `, validPassword);

    await expect(page.getByTestId('error')).toContainText(credentialsError);
  });

  // Summary: Verifies the login error banner can be dismissed.
  test('dismisses the login error banner', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('wrong_user', validPassword);

    const errorBanner = page.getByTestId('error');
    await expect(errorBanner).toBeVisible();

    await errorBanner.getByRole('button').click();
    await expect(errorBanner).toBeHidden();
  });

  // Summary: Verifies navigation to the base URL preserves the active session.
  test('preserves the session after re-navigation', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, validPassword);

    await page.goto(config.baseUrl);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('inventory-list')).toBeVisible();
  });

  // Summary: Verifies logout terminates the session and browser back remains logged out.
  test('cleans up the session after logout', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, validPassword);

    await page.getByRole('button', { name: /open menu/i }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/\/$/);

    await page.goBack();

    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.usernameInput).toBeVisible();
  });
});