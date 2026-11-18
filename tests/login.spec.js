const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login', () => {
  test('valid user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('locked user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.error).toContainText('locked out');
  });

  test('wrong password shows an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'wrong_password');
    await expect(login.error).toContainText('do not match');
  });
});
