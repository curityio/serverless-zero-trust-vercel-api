/* Configuration is read from environment variables */
export class Configuration {
    public issuer = process.env.ISS;
    public audience = process.env.AUD;
    public algorithms = process.env.ALG;
    public deployedCertificatesLocation = process.env.CERT_LOCATION;
}