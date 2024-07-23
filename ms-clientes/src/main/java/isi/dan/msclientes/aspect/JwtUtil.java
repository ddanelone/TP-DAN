package isi.dan.msclientes.aspect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Component
public class JwtUtil {

   private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

   private final RestTemplate restTemplate;

   @Value("${security.jwt.secret}")
   private String jwtSecretKey;

   @Value("${microservice.user.url}")
   private String userMicroserviceUrl;

   public JwtUtil(RestTemplate restTemplate) {
      this.restTemplate = restTemplate;
   }

   public boolean validateToken(String token) {
      try {
         // Extract the token without the "Bearer " prefix
         String tokenWithoutBearer = token.startsWith("Bearer ") ? token.substring(7) : token;

         log.info("Validando token: {}", tokenWithoutBearer);

         // Call the user microservice to validate the token
         String url = userMicroserviceUrl + "/validate";
         HttpHeaders headers = new HttpHeaders();
         headers.set("Authorization", "Bearer " + tokenWithoutBearer);
         HttpEntity<String> entity = new HttpEntity<>(headers);

         ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
         Boolean isValid = (Boolean) response.getBody().get("valid");

         if (Boolean.TRUE.equals(isValid)) {
            log.info("Token válido");
            return true;
         } else {
            log.info("Token inválido");
            return false;
         }

      } catch (HttpClientErrorException e) {
         log.error("Error al llamar al microservicio de usuarios: {}", e.getMessage());
         return false;
      } catch (Exception e) {
         log.error("Error al validar la firma del token: {}", e.getMessage());
         return false;
      }
   }
}
