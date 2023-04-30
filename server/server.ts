import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from'cors';
import fetch from 'node-fetch';
import redis, { RedisClientType } from 'redis';
import { ICity, IWeather, IWeatherApiResponse, ICityApiResponse } from '../types/interfaces';


const app = express();
const port = process.env.PORT || 3001;
let redisClient: RedisClientType;

(async () => {
    redisClient = redis.createClient();

    redisClient.on('error', (error) => console.error(`Error: ${error}`));
    await redisClient.connect();
})();

app.use(cors());

let weaiKey: string;
let geoApi: string;
if(process.env.WEAI_API_Key && process.env.GEO_API_KEY) {
    weaiKey = process.env.WEAI_API_Key;
    geoApi = process.env.GEO_API_KEY;
} else {
    throw new Error("API keys are not set");
}


app.get('/weather/:lat/:lon', async (req: any, res: any) => {
    const { lat, lon } = req.params;
    let datas: IWeatherApiResponse;
    let response; 
    let isCached = false;
    try {
        const cacheResults = await redisClient.get(`${lat}&${lon}`);
        if(cacheResults) {
            isCached = true;
            datas = JSON.parse(cacheResults);
        } else {console.log(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weaiKey}`)
            response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weaiKey}`);
            datas = await response.json() as IWeatherApiResponse;
            const formatedData: IWeather[] = datas.data.map(({ valid_date, temp, max_temp, min_temp, rh, weather, vis, sunset_ts, sunrise_ts, moonrise_ts, moonset_ts }) => ({
                                    valid_date,
                                    temp,
                                    max_temp,
                                    min_temp,
                                    average_humid: rh,
                                    icon: weather.icon,
                                    visibility_km: vis,
                                    sunset_ts,
                                    sunrise_ts,
                                    moonrise_ts,
                                    moonset_ts,
                                }));
            await redisClient.set(`${lat}&${lon}`, JSON.stringify(formatedData));
            await redisClient.expire(`${lat}&${lon}`, 7200);
        }
        res.send({fromCache: isCached, data: datas});
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data'});
    }
})

app.get('/geocode/:city', async (req: any, res: any) => {
    try {
        const { city } = req.params;
        const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}&limit=4`,{
              headers: {
                "X-Api-Key": geoApi
              }});
        const data = await response.json() as ICityApiResponse[];
        const formatedData: ICity[] = data.map(({name, latitude, longitude}) => ({name, latitude, longitude}));
        response.ok ? res.json(formatedData) : res.status(response.status).json(data);
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        res.status(500).json({ error: 'Error fetching geocoding data' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});