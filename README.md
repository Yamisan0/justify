# Justify API
## Introduction
Welcome to the Justify API repository! This API provides an easy way to justify text, making it perfectly aligned on both left and right margins. You can access the API online or run it in a Docker container for local development or production use.

### Features
- **Justify Text:** Submit your text to be justified and get it returned with full justification.
- **Token Authentication:** Secure access with token-based authentication for using the justify endpoint.
- **Rate Limiting:** Ensures fair usage by enforcing rate limits.

### Configuration
The following environment variables are available for configuration:
- `NODE_PORT`: The port to run the API on. Defaults to `3000`
- `DATABASE_URL`: The URL of the database to use. Defaults to `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}`
- `POSTGRES_USER`: The username for accessing database.
- `POSTGRES_PASSWORD`: The password for the database.
- `POSTGRES_DB`: The database name.
- `JWT_SECRET`: The secret to sign JWT. Defaults to `secretagarder`
- `RATE_LIMIT`: The daily token limit for users (words). Defaults to `80000`

### Developing locally
Development on this project assumes that you have Docker and docker compose setup, as well as node and Typescript installed :
- [Node](https://nodejs.org/en)
- [Docker and Docker compose](https://docs.docker.com/engine/install/)

Before starting development on this project, install dependencies and development tools by running:
`make setup`

### Running the API
Launch the API and the database directly by running:
```bash
make
```

### Usage
If you want to use it without installing it locally, use this URL:
`
15.188.15.48:3000
`.

If you want to use it locally, use this one: `http://localhost:3000'


## API Reference

#### Get Token

```http
  POST /api/token
```

| Parameter | Content-Type     | Requires       | Description|
| :-------- | :------- | :------------------------- |------------------------------|
| `none` | `application/json` |  Body: {"email": "user@example.com"} | Returns a token if the request body is correctly formated.|

For example with curl:
```bash
curl -X POST http://15.188.15.48:3000/api/token -H "Content-Type: application/json" -d '{"email": "user@example.com"}'
```

#### Get item

```http
  POST /api/justify
```

| Parameter | Content-Type     | Requires       | Description|
| :-------- | :------- | :------------------------- |------------------------------|
| `token` | `text/plain` |  Header: Authorization: Bearer <your_token> | If the token is incorrect, expired or string length exceeds 10000, a JSON with an error message will be returned. Else, the justified text is returned|

For example with curl:
```bash
curl -X POST http://15.188.15.48:3000/api/justify -H "Content-Type: text/plain" -H "Authorization: Bearer <your_token>" -d 'Your text here'