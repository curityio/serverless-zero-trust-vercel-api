# serverless-zero-trust-vercel-api
A serverless zero trust API for Vercel deployent protected with self contained JWTs

# Installation on Vercel

Install the Vercel client
`brew install vercel-cli`

Login to Vercel
`vercel login`

Deploy the code to Vercel and provide the `ISS` and `AUD` env variables
`vercel --env ISS=https://iggbom-curity.ngrok.io/oauth/v2/oauth-anonymous --env AUD=www --env ALG='RS256' deploy`

Set up and deploy? Y
Which scope do you want to deploy to?
Link to existing project?
What’s your project’s name? serverless-zero-trust-vercel-api
In which directory is your code located?

To promote to production
`vercel --prod`
