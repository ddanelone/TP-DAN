package isi.dan.ms_productos.aspect;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.security.Key;
import java.util.Base64;

@Component
public class JwtUtil {

   private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);
   private Key signingKey;

   @Value("${security.jwt.secret}")
   private String jwtSecretKey;

   @PostConstruct
   public void init() {
      byte[] keyBytes = Base64.getDecoder().decode(jwtSecretKey);
      signingKey = Keys.hmacShaKeyFor(keyBytes);
   }

   public boolean validateToken(String token) {
      try {
         // Extrae el token sin el prefijo "Bearer "
         String tokenWithoutBearer = token;
         if (token.startsWith("Bearer ")) {
            tokenWithoutBearer = token.substring(7);
         }

         log.info("Validando token: {}", tokenWithoutBearer);

         // Separar el token en sus partes
         String[] tokenParts = tokenWithoutBearer.split("\\.");
         if (tokenParts.length != 3) {
            log.error("Token tiene un formato inválido");
            return false;
         }

         String header = tokenParts[0];
         String payload = tokenParts[1];
         String signature = tokenParts[2];

         // Decodificar el header y payload
         String headerJson = new String(Base64.getUrlDecoder().decode(header));
         String payloadJson = new String(Base64.getUrlDecoder().decode(payload));

         log.info("Header: {}", headerJson);
         log.info("Payload: {}", payloadJson);

         // Reconstruir la firma y compararla
         String dataToSign = header + "." + payload;
         Mac mac = Mac.getInstance("HmacSHA256");
         mac.init(new SecretKeySpec(signingKey.getEncoded(), "HmacSHA256"));
         byte[] signedData = mac.doFinal(dataToSign.getBytes());
         String computedSignature = Base64.getUrlEncoder().withoutPadding().encodeToString(signedData);

         if (!computedSignature.equals(signature)) {
            log.error("Firma inválida");
            log.info("computedSignature: {} ", computedSignature);
            log.info("signature: {} ", signature);
            return false;
         } else {
            log.info("Firma válida");
         }

         // Validar el token utilizando jjwt para obtener los claims
         Jwt<JwsHeader, Claims> parsedToken = Jwts.parserBuilder()
               .setSigningKey(signingKey)
               .build()
               .parseClaimsJws(tokenWithoutBearer);

         JwsHeader parsedHeader = parsedToken.getHeader();
         Claims parsedClaims = parsedToken.getBody();

         log.info("Header después de parsear: {}", parsedHeader);
         log.info("Claims después de parsear: {}", parsedClaims);

         String id = parsedClaims.get("id", String.class);

         log.info("Token válido. Id: {}", id);
         return true;

      } catch (ExpiredJwtException e) {
         log.error("Token expirado: {}", e.getMessage());
      } catch (UnsupportedJwtException e) {
         log.error("Token no soportado: {}", e.getMessage());
      } catch (MalformedJwtException e) {
         log.error("Token malformado: {}", e.getMessage());
      } catch (SignatureException e) {
         log.error("Firma inválida: {}", e.getMessage());
      } catch (IllegalArgumentException e) {
         log.error("Token vacío o nulo: {}", e.getMessage());
      } catch (Exception e) {
         log.error("Error al validar la firma del token: {}", e.getMessage());
      }
      log.info("Token inválido");
      return false;
   }
}
