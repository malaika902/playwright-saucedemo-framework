import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';

test.describe('Checkout', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login(users.standard.username, users.standard.password);
        const inv = new InventoryPage(page);
        await inv.addToCart('sauce-labs-backpack');
        await inv.openCart();
    });

    test('complete checkout successfully', async ({ page }) => {
        const checkout = new CheckoutPage(page);
        await checkout.startCheckout();
        await checkout.fillInfo('Saad', 'Test', '44000');
        await checkout.finish();
        await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
    });

    test('missing postal code shows error', async ({ page }) => {
        const checkout = new CheckoutPage(page);
        await checkout.startCheckout();
        await checkout.fillInfo('Saad', 'Test', '');
        await expect(checkout.error).toContainText('Postal Code is required');
    });
});