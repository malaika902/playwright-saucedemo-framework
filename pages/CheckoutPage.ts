import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly completeHeader: Locator;
    readonly error: Locator;

    constructor(private page: Page) {
        this.completeHeader = page.getByTestId('complete-header');
        this.error = page.getByTestId('error');
    }

    async startCheckout() { await this.page.getByTestId('checkout').click(); }

    async fillInfo(first: string, last: string, zip: string) {
        await this.page.getByTestId('firstName').fill(first);
        await this.page.getByTestId('lastName').fill(last);
        await this.page.getByTestId('postalCode').fill(zip);
        await this.page.getByTestId('continue').click();
    }

    async finish() { await this.page.getByTestId('finish').click(); }
}
