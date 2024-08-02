package isi.dan.ms_productos.aspect;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class JwtDecoder {

   private static final Logger log = LoggerFactory.getLogger(JwtUtility.class);

   public static void showTokenContent(String token) {
      DecodedJWT decodedJWT = JWT.decode(token);

      String header = decodedJWT.getHeader();
      String payload = decodedJWT.getPayload();
      String signature = decodedJWT.getSignature();

      log.info("Header: " + header);
      log.info("Payload: " + payload);
      log.info("Signature: " + signature);

      // Decode payload JSON
      String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(payload));
      log.info("Decoded Payload JSON: " + payloadJson);

      // Convert timestamps to readable dates
      Instant iat = Instant.ofEpochSecond(decodedJWT.getIssuedAt().getTime() / 1000);
      Instant exp = Instant.ofEpochSecond(decodedJWT.getExpiresAt().getTime() / 1000);

      ZonedDateTime issuedAt = ZonedDateTime.ofInstant(iat, ZoneId.of("UTC"));
      ZonedDateTime expiresAt = ZonedDateTime.ofInstant(exp, ZoneId.of("UTC"));

      log.info("Issued At: " + issuedAt);
      log.info("Expires At: " + expiresAt);
   }
}
