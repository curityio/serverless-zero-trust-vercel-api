import { VercelRequest, VercelResponse } from '@vercel/node'
import { Data } from '../src/data'
import { TokenValidator } from '../src/tokenValidator'

export default (request: VercelRequest, response: VercelResponse) => {
  
  let tokenValidator = new TokenValidator(request.headers.authorization);
  let data = new Data();
  
  tokenValidator.validateJwt().then( jwtIsValid => {
    return response.json({
      message: "JWT successfully validated", 
      data: data.getData() 
    })
  })
  .catch(err => {         
    return response.status(403).send(err)
  })    
}
