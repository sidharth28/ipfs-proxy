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

UI -> http://localhost:8081/
Proxy server -> http://localhost:5011

## Test

1. Credentials to login, username -> fleekadmin || password -> fleekadmin123
2. Click 'Create API key' to create API key
3. Use the created API key to test with below command, replace API token:

```sh
curl --location --request POST 'http://127.0.0.1:5011/api/v0/swarm/addrs' --header 'x-api-token: <API Token>'
```

4. Refresh the page to view logs
5. Enable/Disable API with Enable/Disable button

## Written Questions

## How would you improve this assignment for a production ready solution (e.g., security, deployment)?

1. Write test cases for all scenarios.
2. Make the proxy server capable of handling concurent requests and Do load testing of the system.
3. Handle user authentication in a better way , like using cookies to store JWT token, also implement refresh JWT token.
4. Use SSL certificates
5. Implement and monitoring and alerting for API (sentry,apigee)
6. Better UI

## Describe IPFS and compare it to other protocols e.g., HTTP?

IPFS is a protocol and peer-to-peer network for storing and sharing data in a distributed file system.
In IPFS data is replicated on multiple servers.

1.In HTTP data reuested comes from central servers , while in IPFS data can be requested from any node. 2. In IPFS ,data is addressed by the hash of its content, whereas in HTTP the data is addressed by the url and parameters of the http request. 3. IPFS does not have methods like HTTP does GET,POST.
