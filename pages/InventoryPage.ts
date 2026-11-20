import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;

    constructor(private page: Page) {
        this.title = page.getByTestId('title');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    async addToCart(productId: string) {
        await this.page.getByTestId(`add-to-cart-${productId}`).click();
    }

    async removeFromCart(productId: string) {
        await this.page.getByTestId(`remove-${productId}`).click();
    }

    async openCart() {
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    async getPrices(): Promise<number[]> {
        const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
        return texts.map(t => parseFloat(t.replace('$', '')));
    }
}