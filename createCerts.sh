#!/bin/bash

##############################################################
# A script to create a token signing certificate and a Root CA
##############################################################

rm -rf certs
mkdir -p certs
cd certs
set -e

#
# Point to the OpenSSL configuration file for macOS or Windows
#
case "$(uname -s)" in

  Darwin)
    export OPENSSL_CONF='/System/Library/OpenSSL/openssl.cnf'
 	;;

  MINGW64*)
    export OPENSSL_CONF='C:/Program Files/Git/usr/ssl/openssl.cnf';
    export MSYS_NO_PATHCONV=1;
	;;
esac

ROOT_CERT_FILE_PREFIX='root'
ROOT_CERT_DESCRIPTION='Root CA for x5c Testing'
INTERMEDIATE_CERT_FILE_PREFIX='intermediate'
INTERMEDIATE_CERT_DESCRIPTION='Intermediate CA for x5c Testing'
SIGNING_CERT_FILE_PREFIX='signing'
SIGNING_PKCS12_PASSWORD='Password1'

#
# Create the root CA key
#
openssl genrsa -out $ROOT_CERT_FILE_PREFIX.key 2048
echo '*** Successfully created Root CA key'

#
# Create a root CA with a 10 year lifetime
#
openssl req \
    -x509 \
    -new \
    -nodes \
    -key $ROOT_CERT_FILE_PREFIX.key \
    -out $ROOT_CERT_FILE_PREFIX.pem \
    -subj "/CN=$ROOT_CERT_DESCRIPTION" \
    -reqexts v3_req \
    -extensions v3_ca \
    -sha256 \
    -days 3650
echo '*** Successfully created Root CA'

#
# Create the intermediate CA key
#
openssl genrsa -out $INTERMEDIATE_CERT_FILE_PREFIX.key 2048
echo '*** Successfully created intermediate key'

#
# Create the intermediate signing request file
#
openssl req \
    -new \
    -key $INTERMEDIATE_CERT_FILE_PREFIX.key \
    -out $INTERMEDIATE_CERT_FILE_PREFIX.csr \
    -subj "/CN=x5c-test-intermediate-cert"
echo '*** Successfully created intermediate certificate request'

#
# Create an intermediate CA with a 10 year lifetime
#
openssl x509 \
    -req \
    -in $INTERMEDIATE_CERT_FILE_PREFIX.csr \
    -CA $ROOT_CERT_FILE_PREFIX.pem \
    -CAkey $ROOT_CERT_FILE_PREFIX.key \
    -CAcreateserial \
    -out $INTERMEDIATE_CERT_FILE_PREFIX.pem \
    -sha256 \
    -days 3650
echo '*** Successfully created Intermediate CA'

#
# Create the signing key
#
openssl genrsa -out $SIGNING_CERT_FILE_PREFIX.key 2048
echo '*** Successfully created signing key'

#
# Create the certificate signing request file
#
openssl req \
    -new \
    -key $SIGNING_CERT_FILE_PREFIX.key \
    -out $SIGNING_CERT_FILE_PREFIX.csr \
    -subj "/CN=x5c-test-signing-cert"
echo '*** Successfully created token signing certificate request'

#
# Create the signing certificate and private key with a 6 month lifetime
#
openssl x509 \
    -req \
    -in $SIGNING_CERT_FILE_PREFIX.csr \
    -CA $INTERMEDIATE_CERT_FILE_PREFIX.pem \
    -CAkey $INTERMEDIATE_CERT_FILE_PREFIX.key \
    -CAcreateserial \
    -out $SIGNING_CERT_FILE_PREFIX.pem \
    -sha256 \
    -days 180
echo '*** Successfully created token signing certificate'

#
# Include the full chain in the certificate file
#
cat signing.pem intermediate.pem root.pem > tokenSigningCertChain.pem

#
# Create a password protected PKCS#12 file with the private key and trust chain, to be imported into the Curity Identity Server to 
#
openssl pkcs12 \
    -export \
    -inkey $SIGNING_CERT_FILE_PREFIX.key \
    -in tokenSigningCertChain.pem \
    -name $SIGNING_CERT_FILE_PREFIX \
    -out $SIGNING_CERT_FILE_PREFIX.p12 \
    -passout pass:$SIGNING_PKCS12_PASSWORD
echo '*** Successfully exported token signing certificate to a PKCS#12 file'
