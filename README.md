# serverless-zero-trust-vercel-api
A serverless zero trust API for Vercel deployent protected with self contained JWTs

# Deploy to Vercel

Install the Vercel client
```sh
brew install vercel-cli
```

Login to Vercel
```sh
vercel login
```

Deploy the code to Vercel and provide the `ISS`, `AUD` and `ALG` env variables
```sh
vercel --env ISS=https://iggbom-curity.ngrok.io/oauth/v2/oauth-anonymous --env AUD=www --env ALG=\'RS256\' deploy
```

Promote to production
```sh
vercel --prod
```
