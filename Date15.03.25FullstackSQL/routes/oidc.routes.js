import express from "express";
import { authorization_endpoint, 
    jwks_uri,
    token_endpoint,
    userinfo_endpoint,
    well_known } from "../controller/oidc.contoller.js";

const oidcRoute = express.Router()

oidcRoute.get('/.well-known/openid-configuration',well_known)
oidcRoute.get('/.well-known/jwks.json',jwks_uri)
oidcRoute.get('/authorize',authorization_endpoint)
oidcRoute.get('/oauth/token/:code',token_endpoint)
oidcRoute.get('/userinfo',userinfo_endpoint)
oidcRoute.get('/oidc/register',jwks_uri)
oidcRoute.get('/oauth/revoke',jwks_uri)

export default oidcRoute