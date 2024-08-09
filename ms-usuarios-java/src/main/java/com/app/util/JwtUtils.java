package com.app.util;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtUtils {

   @Value("${security.jwt.key.private}")
   private String privateKey;

   @Value("${security.jwt.user.generator}")
   private String userGenerator;

   public String createToken(Authentication authenticacion) {
      Algorithm algorithm = Algorithm.HMAC256(privateKey);

      String username = authenticacion.getPrincipal().toString();

      String authorities = authenticacion.getAuthorities()
            .stream()
            .map(granteAuthoritie -> granteAuthoritie.getAuthority())
            .collect(Collectors.joining(","));

      String jwtToken = JWT.create()
            .withIssuer(userGenerator)
            .withSubject(username)
            .withClaim("authorities", authorities)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + 604800000)) // 7 días
            .withJWTId(UUID.randomUUID().toString())
            .withNotBefore(new Date(System.currentTimeMillis()))
            .sign(algorithm);

      return jwtToken;
   }

   public DecodedJWT validateToken(String token) {
      try {
         Algorithm algorithm = Algorithm.HMAC256(privateKey);

         JWTVerifier verifier = JWT.require(algorithm)
               .withIssuer(userGenerator)
               .build();

         DecodedJWT decodedJWT = verifier.verify(token);

         return decodedJWT;

      } catch (JWTVerificationException e) {
         throw new JWTVerificationException("Token invalido");
      }
   }

   public String extractUsername(DecodedJWT decodedJWT) {
      return decodedJWT.getSubject().toString();
   }

   public Claim getSpecificClaim(DecodedJWT decodedJWT, String claimName) {
      return decodedJWT.getClaim(claimName);
   }

   public Map<String, Claim> getAllClaims(DecodedJWT decodedJWT) {
      return decodedJWT.getClaims();
   }

}
