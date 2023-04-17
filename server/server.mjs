import express from 'express';
import cors from'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const weaiKey = '57eb12e46ecb4d2295d1f142f11329a2';
const geoApi = '2lekm3r6b2x3DYJs+wGEUQ==ob8FgRUDI7wGnD2m';

app.get('/weather/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weaiKey}`);
        const data = await response.json();
        response.ok ? res.json(data) : res.status(response.status).json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
})

app.get('/geocode/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}&limit=4`,{
              headers: {
                "X-Api-Key": geoApi
              }});
        const data = await response.json();
        response.ok ? res.json(data) : res.status(response.status).json(data);
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        res.status(500).json({ error: 'Error fetching geocoding data' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});