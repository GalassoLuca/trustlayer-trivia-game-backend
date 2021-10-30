# TrustLayer trivia game backend kata

This is the backend implementation of trivia game.

This module has been developed with the ESM Module Loader (Node.js experimental feature)
## Start the server

```bash
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
