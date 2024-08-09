package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.controller.dto.AuthCreateUserRequest;
import com.app.controller.dto.AuthLoginRequest;
import com.app.controller.dto.AuthResponse;
import com.app.persistence.entity.RoleEntity;
import com.app.persistence.entity.UserEntity;
import com.app.persistence.repository.RoleRepository;
import com.app.persistence.repository.UserRepository;
import com.app.util.JwtUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

   @Autowired
   private JwtUtils jwtUtils;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Autowired
   private UserRepository userRepository;

   @Autowired
   private RoleRepository roleRepository;

   @Override
   public UserDetails loadUserByUsername(String email) {

      UserEntity userEntity = userRepository.findUserEntityByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("El usuario " + email + " no existe."));

      List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

      userEntity.getRoles()
            .forEach(role -> authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));

      userEntity.getRoles().stream().flatMap(role -> role.getPermissionList().stream())
            .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getName())));

      return new User(userEntity.getEmail(), userEntity.getPassword(), userEntity.isEnabled(),
            userEntity.isAccountNoExpired(), userEntity.isCredentialsNoExpired(), userEntity.isAccountNoLocked(),
            authorityList);
   }

   public AuthResponse createUser(AuthCreateUserRequest createRoleRequest) {

      String email = createRoleRequest.email();
      String password = createRoleRequest.password();
      String name = createRoleRequest.name();
      String surname = createRoleRequest.surname();
      String dni = createRoleRequest.dni();
      List<String> rolesRequest = createRoleRequest.roleRequest().roleListName();

      Set<RoleEntity> roleEntityList = roleRepository.findRoleEntitiesByRoleEnumIn(rolesRequest).stream()
            .collect(Collectors.toSet());

      if (roleEntityList.isEmpty()) {
         throw new IllegalArgumentException("Los roles especificados no existen.");
      }

      UserEntity userEntity = UserEntity
            .builder()
            .email(email)
            .password(passwordEncoder.encode(password))
            .name(name)
            .surname(surname)
            .dni(dni)
            .roles(roleEntityList)
            .isEnabled(true)
            .accountNoLocked(true)
            .accountNoExpired(true)
            .credentialsNoExpired(true)
            .build();

      UserEntity userSaved = userRepository.save(userEntity);

      ArrayList<SimpleGrantedAuthority> authorities = new ArrayList<>();

      userSaved.getRoles()
            .forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));

      userSaved.getRoles().stream().flatMap(role -> role.getPermissionList().stream())
            .forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission.getName())));

      SecurityContext securityContextHolder = SecurityContextHolder.getContext();
      Authentication authentication = new UsernamePasswordAuthenticationToken(userSaved, null, authorities);

      String accessToken = jwtUtils.createToken(authentication);

      AuthResponse authResponse = new AuthResponse(email, "Usuario creado exitosamente", accessToken, true);
      return authResponse;
   }

   public AuthResponse loginUser(AuthLoginRequest authLoginRequest) {

      String email = authLoginRequest.email();
      String password = authLoginRequest.password();

      Authentication authentication = this.authenticate(email, password);
      SecurityContextHolder.getContext().setAuthentication(authentication);

      String accessToken = jwtUtils.createToken(authentication);
      AuthResponse authResponse = new AuthResponse(email, "Usuario logueado correctamente", accessToken, true);
      return authResponse;
   }

   public Authentication authenticate(String username, String password) {
      UserDetails userDetails = this.loadUserByUsername(username);

      if (userDetails == null) {
         throw new BadCredentialsException(String.format("Usuario o contraseña incorrectos"));
      }

      if (!passwordEncoder.matches(password, userDetails.getPassword())) {
         throw new BadCredentialsException("Contraseña incorrecta");
      }

      return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
   }
}
