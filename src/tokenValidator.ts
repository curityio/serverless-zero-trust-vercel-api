import { EmbeddedJWK } from 'jose/jwk/embedded'
import { jwtVerify } from 'jose/jwt/verify'
  
export class TokenValidator{
  private readonly _authorizationHeader: string;

  public constructor(authorizationHeader: string) {
    this._authorizationHeader = authorizationHeader;
  }

  public async validateJwt() {
    const jwt = this.getToken(this._authorizationHeader)

    /* Set options from provided environment variables */
    const options = {
      issuer: process.env.ISS,
      audience: process.env.AUD,
      algorithms: [process.env.ALG]
    }

    const { payload, protectedHeader } = await jwtVerify(jwt, EmbeddedJWK, options)
  }

  /* Extract JWT from Authorization header */
  private getToken(authorizationHeader: string) {
    if (authorizationHeader && authorizationHeader.split(" ")[0] === "Bearer") {
      return authorizationHeader.split(" ")[1];
    } 

    throw new Error('No valid authorization header provided');
  }
}