package com.gateway.service;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayServiceApplication {

   public static void main(String[] args) {
      SpringApplication.run(GatewayServiceApplication.class, args);
   }

   // @Bean
   // public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
   // return builder.routes()
   // .route("path_route", r -> r.path("/get")
   // .filters(f -> f.addRequestHeader("Hello", "World"))
   // .uri("http://httpbin.org"))
   // .build();
   // }

   @Bean
   public CorsWebFilter corsWebFilter() {
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
      config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
      config.setAllowedHeaders(Arrays.asList("*"));
      config.setAllowCredentials(true);

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", config);
      return new CorsWebFilter(source);
   }
}
