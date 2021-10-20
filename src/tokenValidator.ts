import { EmbeddedJWK } from 'jose/jwk/embedded';
import { jwtVerify } from 'jose/jwt/verify';
import { TrustChainValidator } from './trustChainValidator';
import { Configuration } from './configuration';
import { JWSHeaderParameters } from 'jose/types';
import { decodeProtectedHeader } from 'jose/util/decode_protected_header';
  
export class TokenValidator{
  private readonly authorizationHeader: string;
  private readonly trustChainValidator: TrustChainValidator;
  private readonly config = new Configuration;

  public constructor(authorizationHeader: string, inter:string, root:string) {
    this.authorizationHeader = authorizationHeader;
    this.trustChainValidator = new TrustChainValidator(this.config, inter, root);
  }

  public async validateJwt() { 
    
    const jwt = this.getAccessToken(this.authorizationHeader);
    
    /* Set options from provided configuration */
    const options = {
      issuer: this.config.issuer,
      audience: this.config.audience,
      algorithms: [this.config.algorithms]
    };

    /* Validate token using EmbeddedJWT */
    const { payload, protectedHeader } = await jwtVerify(jwt, EmbeddedJWK, options);

    const [accessTokenJwt, header] = this.parseToken(jwt);
    
    /* Validate the trust chain */
    const tokenSigningPublicKey = await this.trustChainValidator.validate(header);
  }

  /* Extract JWT from Authorization header */
  private getAccessToken(authorizationHeader: string) {

    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
      return authorizationHeader.substring(7, authorizationHeader.length);
    }
    
    throw new Error('No valid authorization header was provided');
  }

  /* Read the JWT and its header details */
  public parseToken(accessTokenJwt: string): [string, JWSHeaderParameters]  {
    const header = decodeProtectedHeader(accessTokenJwt) as JWSHeaderParameters;
    return [accessTokenJwt, header];
  }
}