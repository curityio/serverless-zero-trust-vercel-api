import { VercelRequest, VercelResponse } from '@vercel/node'
import { getData } from '../src/data'
import { TokenValidator } from '../src/tokenValidator'

export default (request: VercelRequest, response: VercelResponse) => {
  
  let tokenValidator = new TokenValidator(request.headers.authorization);
  
  tokenValidator.validateJwt().then( jwtIsValid => {
    return response.json({
      message: "JWT successfully validated", 
      data: getData() 
    })
  })
  .catch(err => {         
    return response.status(403).send(err)
  })    
}
