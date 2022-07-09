## How To Setup

1. Run IPFS

```sh
cd fleek-server
docker-compose up
```

2. Another terminal, to run proxy server

```sh
cd fleek-server
npm i
npm run start
```

3. Another terminal, to run react app

```sh
cd fleek-app
npm i
npm start
```

## Test

1. Credentials to login, username -> fleekadmin || password -> fleekadmin123
2. Click 'Create API key' to create API key
3. Use the created API key to test with below command, replace API token:

```sh
curl --location --request POST 'http://127.0.0.1:5011/api/v0/swarm/addrs' --header 'x-api-token: <API Token>'
```

4. Refresh the page to view logs
5. Enable/Disable API with Enable/Disable button
