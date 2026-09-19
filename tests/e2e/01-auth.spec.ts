import { config } from '../../config/env.config';
import { expect, test } from '../../utils/customFixtures';

test.describe('Authentication', () => {
  test('successfully logs in with valid credentials', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(config.username, config.password);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('rejects a locked-out user', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('locked_out_user', config.password);

    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  test('rejects invalid credentials', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.username, 'invalid_password');

    await expect(page.getByTestId('error')).toBeVisible();
  });
});