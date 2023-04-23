import { render } from '@testing-library/react';
import React from 'react';
import Weather from '../src/components/Weather';
import { ICity } from '../types/interfaces';

test('Renders main page correctly', () => {
    const city: ICity = {
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.0060
    };
    render(<Weather city={city} />);
    expect(true).toBeTruthy();
})