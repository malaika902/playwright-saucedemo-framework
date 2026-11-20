import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Login', () => {
    test('valid user can log in', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(users.standard.username, users.standard.password);
        await expect(new InventoryPage(page).title).toHaveText('Products');
    });

    test('locked out user sees error', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(users.locked.username, users.locked.password);
        await login.expectError('locked out');
    });

    test('invalid credentials show error', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(users.invalid.username, users.invalid.password);
        await login.expectError('do not match');
    });

    test('empty username shows required error', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('', users.standard.password);
        await login.expectError('Username is required');
    });
});