# 1. Setup repo

```bash
git clone git@github.com:younes101020/WeatherApp.git -b dev
cd WeatherApp
npm i
```

Don't forget to add the client environnent variables, create .env file in the root and then add (these are demonstration accesses):

```vscode
WEAI_API_Key="bb64f7b300974ca2acc7e1581d494bb6"
GEO_API_KEY="2lekm3r6b2x3DYJs+wGEUQ==ob8FgRUDI7wGnD2m"
```

# 2. Setup redis server

I assume you have an ubuntu virtual machine with WSL2, on this ubuntu follow these steps to install and setup redis server for other subsystem please refer to this [Redis setup](https://redis.io/docs/install/)

```bash
sudo apt install lsb-release curl gpg

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis

redis-server
```

# 3. Launch the application

Come back into the weatherapp directory and enter:
```bash
npm run dev
```

Now click here to use the application [WeatherApp](http://localhost:5173/)

## License

[MIT](https://choosealicense.com/licenses/mit/)