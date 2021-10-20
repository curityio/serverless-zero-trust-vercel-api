import { VercelRequest, VercelResponse } from '@vercel/node'
import { Data } from '../src/data'
import { TokenValidator } from '../src/tokenValidator'
import { readFileSync } from 'fs';
import { join } from 'path';

export default (request: VercelRequest, response: VercelResponse) => {
  
  /* Read certs from ../certs */
  const inter = readFileSync(join(__dirname, '../certs', 'intermediate.pem'), 'utf8');
  const root = readFileSync(join(__dirname, '../certs', 'root.pem'), 'utf8');

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
