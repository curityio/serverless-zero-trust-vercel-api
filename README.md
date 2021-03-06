# Serverless Zero Trust Vercel API

[![Quality](https://img.shields.io/badge/quality-experiment-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

A serverless zero trust API for Vercel deployent protected with self contained JWTs

## Create Certificats

Run `createCerts.sh` to generate a certificate trust chain for testing purposes. Import the certificates in the Curity Identity Server.

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

Deploy the code to Vercel and provide the `ISS`, `AUD`, `ALG` and `CERT_LOCATION` env variables in the deploy command or configure the environment variables in the Vercel Web UI.
```sh
vercel --env ISS=https://idsvr.example.com/oauth/v2/oauth-anonymous --env AUD=www --env ALG='RS256' --env CERT_LOCATION='../certs' deploy
```

Optionally promote to production
```sh
vercel --prod
```

## Testing the code
Run a flow that obtains a JWT access token then call the Vercel deployed API. Further details in the [Securing a Serverless API on Vercel using JWTs](https://curity.io/resources/learn/serverless-zero-trust-api-on-vercel) article.

## Further Information

Please visit [curity.io](https://curity.io/) for more information about the Curity Identity Server.
