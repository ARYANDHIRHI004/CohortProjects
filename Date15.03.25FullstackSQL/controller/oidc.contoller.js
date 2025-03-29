import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'
import bcrypt from "bcryptjs";
import fs from 'fs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const well_known = async (req, res) => {
  try {
    return res.status(200).json({
      issuer: `${process.env.BASE_URL}`,
      authorization_endpoint: `${process.env.BASE_URL}/oidc/authorize`,
      token_endpoint: `${process.env.BASE_URL}/oidc/oauth/token`,
      userinfo_endpoint: `${process.env.BASE_URL}/oidc/userinfo`,
      jwks_uri: `${process.env.BASE_URL}/oidc/.well-known/jwks.json`,
      registration_endpoint: `${process.env.BASE_URL}/oidc/oidc/register`,
      revocation_endpoint: `${process.env.BASE_URL}/oidc/oauth/revoke`,
      scopes_supported: [
        "openid",
        "profile",
        "offline_access",
        "name",
        "given_name",
        "family_name",
        "nickname",
        "email",
        "email_verified",
        "picture",
        "created_at",
        "identities",
        "phone",
        "address",
      ],
      response_types_supported: [
        "code",
        "token",
        "id_token",
        "code token",
        "code id_token",
        "token id_token",
        "code token id_token",
      ],
      code_challenge_methods_supported: ["S256", "plain"],
      response_modes_supported: ["query", "fragment", "form_post"],
      subject_types_supported: ["public"],
      id_token_signing_alg_values_supported: ["HS256", "RS256", "PS256"],
      token_endpoint_auth_methods_supported: [
        "client_secret_basic",
        "client_secret_post",
        "private_key_jwt",
      ],
      claims_supported: [
        "aud",
        "auth_time",
        "created_at",
        "email",
        "email_verified",
        "exp",
        "family_name",
        "given_name",
        "iat",
        "identities",
        "iss",
        "name",
        "nickname",
        "phone_number",
        "picture",
        "sub",
      ],
      request_uri_parameter_supported: false,
      request_parameter_supported: false,
      token_endpoint_auth_signing_alg_values_supported: [
        "RS256",
        "RS384",
        "PS256",
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

const authorization_code = crypto.randomBytes(32).toString('hex')

export const authorization_endpoint = async (req, res) => {
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      message: "Please enter email and password"
    })
  }

  const user =  await prisma.user.findFirst({
    where: {email}
})

  if(!user){
    return res.status(400).json({
      message: "User doen not exist"
    })
  }

  const isMatcherd = await bcrypt.compare(password, user.password)
  if(!isMatcherd){
    return res.status(400).json({
      message: "Invaldie email or password"
    })
  }

  
  
  return res.status(200).redirect(`${process.env.BASE_URL}/oidc/oauth/token/${authorization_code}`)
}

export const token_endpoint =  async (req, res) => {
  const {code} = req.params
  console.log(code);
  
  if( code !== authorization_code){
    return res.status(400).json({
      message: "Invalid code"
    })
  }


  const privateKey = fs.readFileSync('./controller/private.key', 'utf8')

  const jwtToken = jwt.sign(
    {
      id: "123456",
    },
    privateKey,
    {
      expiresIn: "24hr",
      algorithm: "RS256"
    }
  );
  
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("token", jwtToken, options)
  .redirect(`${process.env.BASE_URL}/oidc/.well-known/jwks.json`)


}

export const jwks_uri = async (req, res) => {
  const publicKey = fs.readFileSync('./controller/public.key', 'utf8')
  const jwtToken = req.cookies?.token  
  jwt.verify(jwtToken, publicKey, (err, decodedToken) => {
    if (err) {
      console.error("Signature verification failed:", err);
    } else {
      return res.status(200).redirect(`http://127.0.0.1:3000/views/home.html`)
    }})
};

export const userinfo_endpoint =  async (req, res) => {
  
}









