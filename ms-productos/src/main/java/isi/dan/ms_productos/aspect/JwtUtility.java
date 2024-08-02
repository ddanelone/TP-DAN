package isi.dan.ms_productos.aspect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtUtility {

   @Value("${security.jwt.secret}")
   private String jwtSecretKey;

   private static final Logger log = LoggerFactory.getLogger(JwtUtility.class);

   public DecodedJWT validateToken(String token) {
      try {
         Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);

         JWTVerifier verifier = JWT.require(algorithm)
               .build();

         log.info("verifier: {}", verifier.toString());

         DecodedJWT decodedJWT = verifier.verify(token);

         log.info("decodedJWT: {}", decodedJWT.toString());

         return decodedJWT;

      } catch (JWTVerificationException e) {
         log.error("Invalid token: {}", e.getMessage());
         throw new JWTVerificationException("Invalid token");
      }
   }

}
