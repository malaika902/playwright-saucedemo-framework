import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Cart & Inventory', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(users.standard.username, users.standard.password);
    });

    test('add item updates cart badge', async ({ page }) => {
        const inv = new InventoryPage(page);
        await inv.addToCart('sauce-labs-backpack');
        await expect(inv.cartBadge).toHaveText('1');
    });

    test('remove item clears cart badge', async ({ page }) => {
        const inv = new InventoryPage(page);
        await inv.addToCart('sauce-labs-backpack');
        await inv.removeFromCart('sauce-labs-backpack');
        await expect(inv.cartBadge).toHaveCount(0);
    });

    test('sort price low to high', async ({ page }) => {
        const inv = new InventoryPage(page);
        await inv.sortBy('lohi');
        const prices = await inv.getPrices();
        expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });
});