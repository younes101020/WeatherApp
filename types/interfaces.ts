export interface IWeather {
    valid_date: string,
    temp: number,
    max_temp: number,
    min_temp: number,
    average_humid: number,
    icon?: string,
    weather?: {
        icon: string;
    };
    visibility_km?: number,
    sunset_ts: number,
    sunrise_ts: number,
    moonrise_ts: number,
    moonset_ts: number
}

export interface ICelestial {
    date: string,
    moonrise: string,
    moonset: string,
    sunrise: string,
    sunset: string
}

export interface IWeatherApiResponse {
    city_name: string,
    country_code: string,
    data: (IWeather & {
            app_max_temp: number,
            app_min_temp: number,
            clouds: number,
            clouds_hi: number,
            clouds_low: number,
            clouds_mid: number,
            datetime: string,
            dewpt: number,
            high_temp: number,
            low_temp: number,
            max_dhi: null,
            moon_phase: number,
            moon_phase_lunation: number,
            ozone: number,
            pop: number,
            precip: number,
            pres: number,
            rh: number,
            slp: number,
            snow: number,
            snow_depth: number,
            ts: number,
            uv: number,
            valid_date: string,
            vis: number,
            weather: {
                code: number,
                icon: string,
                description: string
            },
            wind_cdir: string,
            wind_cdir_full: string,
            wind_dir: number,
            wind_gust_spd: number,
            wind_spd: number
        })[],
        lat: number,
        lon: number,
        state_code: string,
        timezone: string;
}

export interface ICity {
    name?: string,
    latitude: number,
    longitude: number
}

export interface ICityApiResponse extends ICity {
    country: string,
    population: number,
    is_capital: boolean
}

export type Theme = {
    body: string,
    rest: string
}