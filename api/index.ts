import { VercelRequest, VercelResponse } from '@vercel/node'
import { Data } from '../src/data'
import { TokenValidator } from '../src/tokenValidator'
import { readFileSync } from 'fs';
import { Configuration } from '../src/configuration';

export default (request: VercelRequest, response: VercelResponse) => {
  
  const conf = new Configuration();

    var path = require("path");
    
    const inter = readFileSync(
      path.join(process.cwd(), conf.deployedCertificatesLocation, "intermediate.pem"),
      "utf8"
    );

    const root = readFileSync(
      path.join(process.cwd(), conf.deployedCertificatesLocation, "root.pem"),
      "utf8"
    );

    /* Pass certs to the token validator */
    let tokenValidator = new TokenValidator(request.headers.authorization, inter, root)
    let data = new Data();
  
    tokenValidator.validateJwt().then( jwtIsValid => {
      return response.json({
        message: "JWT successfully validated", 
        data: data.getData() 
      })
    })
    .catch(err => {         
      console.log(`SERVER-ERROR-LOG: ${err.message}`);
  
      return response.status(401).json({
        code: 'unauthorized',
        message: 'Missing, invalid or expired access token',
      })
    }) 
}