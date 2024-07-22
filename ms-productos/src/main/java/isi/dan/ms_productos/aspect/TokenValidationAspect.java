package isi.dan.ms_productos.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect
@Component
public class TokenValidationAspect {

   @Autowired
   private JwtUtil jwtUtil;

   private static final Logger log = LoggerFactory.getLogger(TokenValidationAspect.class);

   @Before("@annotation(tokenValidation)")
   public void validateToken(JoinPoint joinPoint, TokenValidation tokenValidation) throws Throwable {
      String token = getTokenFromRequest();
      log.info("Validando token: {}", token);
      log.info("TokenValidation: {}", jwtUtil.validateToken(token));

      if (token == null || !jwtUtil.validateToken(token)) {
         throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido");
      }
   }

   private String getTokenFromRequest() {
      ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
      if (attributes == null) {
         log.warn("No se pudo obtener las attributes de la request");
         return null;
      }
      HttpServletRequest request = attributes.getRequest();
      String authHeader = request.getHeader("Authorization");
      log.info("Authorization header: {}", authHeader);
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         return authHeader.substring(7);
      }
      log.warn("No se encontró el header Authorization o no tiene el formato esperado");
      return null;
   }

}