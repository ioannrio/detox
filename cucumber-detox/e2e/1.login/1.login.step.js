import { Given, When, Then } from '@cucumber/cucumber';
import { expect, element, by, waitFor } from 'detox';
const sleep = (t) => new Promise((res) => setTimeout(res, t));

const page = {
  email: () => element(by.id('email')),
  password: () => element(by.id('password')),
  login: () => element(by.id('login.btn')),
  homeLogo: () => element(by.id('home')),
  closeAction: () => element(by.id('close')),
  confirmAction: () => element(by.id('confirm')),
};


Given('Open login page', { timeout: 6 * 5000 }, async () => {
  await sleep(2000);
  await page.confirmAction().tap();
  await page.closeAction().tap();
  await device.disableSynchronization();
  await sleep(2000);
  await expect(page.email()).toBeVisible();
  await expect(page.password()).toBeVisible();
});


When('User tries to login with wrong email', { timeout: 2 * 5000 }, async () => {
  await page.email().clearText();
  await page.email().typeText('surf@gmail.com\n');
  await page.password().typeText('wrongPassword\n');
  await page.login().tap();
});


When('User tries to login with wrong password', { timeout: 2 * 5000 }, async () => {
  await page.email().clearText();
  await page.email().typeText('surf@gmail.com\n');
  await page.password().typeText('wrongPassword\n');
  await page.login().tap();
});


When('User tries to login only with email', { timeout: 2 * 5000 }, async () => {
  await page.email().typeText('surf@gmail.com\n');
  await page.password().typeText('\n');
  await page.login().tap();
});


Then('User stays on login page', { timeout: 4 * 5000 }, async () => {
  await sleep(5000);
  await expect(page.email()).toBeVisible();
  await expect(page.password()).toBeVisible();
  await expect(page.login()).toBeVisible();
});


When('User tries to login only with password', { timeout: 2 * 5000 }, async () => {
  await page.email().clearText();
  await page.password().typeText('heslo\n');
  await page.login().tap();
});


When('User tries to login without email and password', { timeout: 4 * 5000 }, async () => {
  await sleep(5000);
  await page.email().clearText();
  await page.password().clearText();
  await page.login().tap();
});


When('User enters credentials', { timeout: 2 * 5000 }, async () => {
  await device.disableSynchronization();
  await page.email().typeText('surf@gmail.com\n');
  await page.password().typeText('heslo\n');
  await page.login().tap();
  await waitFor(page.homeLogo()).toBeVisible().withTimeout(5000);
});


Then('User is logged in', { timeout: 6 * 5000 }, async () => {
  await device.disableSynchronization();
  await expect(page.homeLogo()).toBeVisible();
});
