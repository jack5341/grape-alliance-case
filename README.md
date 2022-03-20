# Grape Alliance Case

Node.js (Typescript) Express RESTful API case. It's already deployed to heroku with `/api-docs` you can reach to swagger doc

## Installation

Clone the project

```bash
  git clone https://github.com/jack5341/grape-alliance-case.git
```

Go to the project directory

```bash
  cd grape-alliance-case
```

Install dependencies

```bash
  npm install
```

Start the server as production

```bash
  npm run prod
```

### Or with Docker

```bash
  git clone https://github.com/jack5341/grape-alliance-case.git
```

Go to the project directory

```bash
  cd grape-alliance-case
```

Run docker-compose.yml

```bash
  docker-compose up -d
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

#### Get all items

```http
  GET /wine/:id/related
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. Wine Id |

#### Get item

```http
  GET /wine?${query}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `title`   | `string` | Wine title             |
| `country` | `string` | Country of manufacture |
| `color`   | `string` | Color of wine          |
| `winery`  | `string` | Winery of wine         |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`SERVICE_NAME`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Documentation

[Documentation](https://grape-alliance-case.herokuapp.com/)
