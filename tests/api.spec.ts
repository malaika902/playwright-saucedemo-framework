import { test, expect } from '@playwright/test';

const API = 'https://restful-booker.herokuapp.com';

test.describe('API - Restful Booker', () => {
    test('GET booking ids returns 200', async ({ request }) => {
        const res = await request.get(`${API}/booking`);
        expect(res.status()).toBe(200);
        expect(Array.isArray(await res.json())).toBeTruthy();
    });

    test('POST creates a booking', async ({ request }) => {
        const res = await request.post(`${API}/booking`, {
            data: {
                firstname: 'Malaika', lastname: 'QA', totalprice: 100, depositpaid: true,
                bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
                additionalneeds: 'Breakfast',
            },
        });
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.booking.firstname).toBe('Malaika');
    });
});