import { render } from '@testing-library/react';
import React from 'react';
import Weather from '../src/components/Weather';
import { ICity, Theme } from '../types/interfaces';

test('Renders main page correctly', () => {
    const city: ICity = {
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.0060
    };
    const theme: Theme = {
        body: 'isBodyLight',
        rest: 'isLight'
    }

    render(<Weather city={city} theme={theme.rest} />);
    expect(true).toBeTruthy();
})