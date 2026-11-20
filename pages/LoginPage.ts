import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly error: Locator;

    constructor(private page: Page) {
        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginBtn = page.getByTestId('login-button');
        this.error = page.getByTestId('error');
    }

    async goto() { await this.page.goto('/'); }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }

    async expectError(text: string) {
        await expect(this.error).toContainText(text);
    }
}