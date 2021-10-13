# Serverless Zero Trust Vercel API
A serverless zero trust API for Vercel deployent protected with self contained JWTs

## Create Certificats

Run `createCerts.sh` to generate a certificate trust chain for testing purposes. Import certificates in the Curity Identity Server.

## Deploy the code to Vercel

Install the Vercel client
```sh
brew install vercel-cli
```

Login to Vercel
```sh
vercel login
```

Install dependencies
```sh
npm install
```

Deploy the code to Vercel and provide the `ISS`, `AUD` and `ALG` env variables in the deploy command or configure the environment variables in the Vercel Web UI.
```sh
vercel --env ISS=https://iggbom-curity.ngrok.io/oauth/v2/oauth-anonymous --env AUD=www --env ALG='RS256' deploy
```

Promote to production
```sh
vercel --prod
```

## Testing the code
Run a flow that obtain a JWT access token then call the Vercel deployed api. Further details in the [Securing a Serverless API on Vercel using JWTs](https://curity.io/resources/learn/serverless-zero-trust-api-on-vercel) article.