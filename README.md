# TrustLayer trivia game backend kata

This is the backend implementation of trivia game.

This module has been developed as ECMAScript modules (also known as ESM), using **node** as [Customizing ESM specifier resolution algorithm (a Node.js experimental feature)](https://nodejs.org/api/esm.html#customizing-esm-specifier-resolution-algorithm)

## Requirements

This module is developed with [Node.js](https://nodejs.org/) and it uses [MongoDB](https://www.mongodb.com/) as database.

### Start the server

```bash
npm install
npm start
```

## Auth

### Signup (user creation)

```bash
curl http://127.0.0.1:4040/api/auth/signup \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ "username": "user", "password": "pwd" }'
```

### Signin

```bash
curl http://127.0.0.1:4040/api/auth/signin \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ "username": "user", "password": "pwd" }'
```

It return the `accessToken`

## User

### Update the user

```bash
curl http://127.0.0.1:4040/api/user \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "username": "user", "password": "pwd" }'
```

### Delete the user

```bash
curl http://127.0.0.1:4040/api/user \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "username": "user", "password": "pwd" }'
```

## Quiz

### Create a quiz

```bash
curl http://127.0.0.1:4040/api/quiz \
  -X POST \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "name": "Trivia", "questions": [{ "question": "What is the company name?", "answers": [{ "answer": "TrustLayer", "correct": true }, { "answer": "TruzzLayer" }, { "answer": "TrumfLayer" }, { "answer": "TrustLawyer" }] }] }'
```

### Retrieve all quizzes

```bash
curl http://127.0.0.1:4040/api/quiz
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
```

### Retrieve a quiz

```bash
curl http://127.0.0.1:4040/api/quiz/:id \
  -X GET \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "name": "Trivia", "questions": [{ "question": "What is the company name?", "answers": [{ "answer": "TrustLayer", "correct": true }, { "answer": "TruzzLayer" }, { "answer": "TrumfLayer" }, { "answer": "TrustLawyer" }] }] }'
```

### Update a quiz

```bash
curl http://127.0.0.1:4040/api/quiz/:id \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "name": "Trivia", "questions": [{ "question": "What is the company name?", "answers": [{ "answer": "TrustLayer", "correct": true }, { "answer": "TruzzLayer" }, { "answer": "TrumfLayer" }, { "answer": "TrustLawyer" }] }] }'
```

### Delete a quiz

```bash
curl http://127.0.0.1:4040/api/quiz/:id \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "x-access-token: {{accessToken}}" \
  -d '{ "name": "Trivia", "questions": [{ "question": "What is the company name?", "answers": [{ "answer": "TrustLayer", "correct": true }, { "answer": "TruzzLayer" }, { "answer": "TrumfLayer" }, { "answer": "TrustLawyer" }] }] }'
```
