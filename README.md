# TrustLayer trivia game backend kata

## Start the server

```bash
npm start
```

## Create a quiz

```bash
curl http://127.0.0.1:4040/api/quiz \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ "name": "Trivia", "questions": [{ "question": "What is the company name?", "answers": [{ "answer": "TrustLayer", "correct": true }, { "answer": "TruzzLayer" }, { "answer": "TrumfLayer" }, { "answer": "TrustLawyer" }] }] }'
```

## Get all quizzes

```bash
curl http://127.0.0.1:4040/api/quiz
```

