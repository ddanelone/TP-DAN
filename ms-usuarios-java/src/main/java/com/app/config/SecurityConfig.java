package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.app.config.filter.JwtTokenValidator;
import com.app.service.UserDetailServiceImpl;
import com.app.util.JwtUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   @Autowired
   AuthenticationConfiguration authenticationConfiguration;

   @Autowired
   private JwtUtils jwtUtils;

   @Bean
   SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationProvider authenticationProvider)
         throws Exception {
      return httpSecurity
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(http -> {
               // EndPoints publicos
               http.requestMatchers(HttpMethod.POST, "/auth/**").permitAll();

               // EndPoints Privados
               http.requestMatchers(HttpMethod.GET, "/method/get").hasAuthority("READ");
               // http.requestMatchers(HttpMethod.POST, "/method/post").hasAuthority("CREATE");
               http.requestMatchers(HttpMethod.POST, "/method/post").hasAnyRole("ADMIN", "DEVELOPER");
               http.requestMatchers(HttpMethod.DELETE, "/method/delete").hasAuthority("DELETE");
               http.requestMatchers(HttpMethod.PUT, "/method/put").hasAuthority("UPDATE");
               http.requestMatchers(HttpMethod.PATCH, "/method/patch").hasAuthority("REFACTOR");

               http.anyRequest().denyAll();
            })
            .addFilterBefore(new JwtTokenValidator(jwtUtils), BasicAuthenticationFilter.class)
            .build();
   }

   // @Bean
   // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
   // Exception {
   // http
   // .csrf(csrf -> csrf.disable())
   // .sessionManagement(session ->
   // session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
   // .authorizeHttpRequests(auth -> auth
   // .requestMatchers("/auth/log-in").permitAll() // Permitir acceso a la página
   // de logueo
   // .anyRequest().authenticated() // Proteger todas las demás rutas
   // )
   // .addFilterBefore(new JwtTokenValidator(jwtUtils),
   // BasicAuthenticationFilter.class); // Agregar el filtro de
   // // validación de token
   // // JWT
   // return http.build();
   // }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
         throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
   }

   @Bean
   public AuthenticationProvider authenticationProvider(UserDetailServiceImpl userDetailService) {
      DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
      provider.setPasswordEncoder(passwordEncoder());
      provider.setUserDetailsService(userDetailService);
      return provider;
   }

   // Este es si queremos trabajar sin las anotaciones en los distintos endpoints
   // @Bean
   // public UserDetailsService userDetailsService() {
   // List<UserDetails> userDetailsList = new ArrayList<>();

   // userDetailsList.add(User.withUsername("diego")
   // .password("19111975")
   // .roles("ADMIN")
   // .authorities("READ", "CREATE")
   // .build());

   // userDetailsList.add(User.withUsername("franco")
   // .password("19111975")
   // .roles("USER")
   // .authorities("READ")
   // .build());

   // return new InMemoryUserDetailsManager(userDetailsList);
   // }

   @Bean
   public PasswordEncoder passwordEncoder() {

      // Este es sin encriptación, solo para pruebas
      // return NoOpPasswordEncoder.getInstance();

      // Encriptación de la contraseña
      return new BCryptPasswordEncoder();
   }

   // Encriptar la contraseña
   // public static void main(String[] args) {
   // BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
   // System.out.println("Clave: " + bCryptPasswordEncoder.encode("19111975") + "
   // fin");
   // }

}
