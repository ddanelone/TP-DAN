package com.app;

import java.util.List;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.persistence.entity.PermissionEntity;
import com.app.persistence.entity.RoleEntity;
import com.app.persistence.entity.RoleEnum;
import com.app.persistence.entity.UserEntity;
import com.app.persistence.repository.UserRepository;

@SpringBootApplication
public class SpringSecurityAppApplication {

   public static void main(String[] args) {
      SpringApplication.run(SpringSecurityAppApplication.class, args);
   }

   @Bean
   CommandLineRunner init(UserRepository userRepository) {
      return args -> {
         PermissionEntity cretatePermission = PermissionEntity.builder()
               .name("CREATE")
               .build();

         PermissionEntity readPermission = PermissionEntity.builder()
               .name("READ")
               .build();

         PermissionEntity updatePermission = PermissionEntity.builder()
               .name("UPDATE")
               .build();

         PermissionEntity deletePermission = PermissionEntity.builder()
               .name("DELETE")
               .build();

         PermissionEntity refactorPermission = PermissionEntity.builder()
               .name("REFACTOR")
               .build();

         /* CRear los roles */
         RoleEntity roleAdmin = RoleEntity.builder()
               .roleEnum(RoleEnum.ADMIN)
               .permissionList(
                     Set.of(cretatePermission, readPermission, updatePermission, deletePermission))
               .build();

         RoleEntity roleUser = RoleEntity.builder()
               .roleEnum(RoleEnum.USER)
               .permissionList(Set.of(cretatePermission, readPermission))
               .build();

         RoleEntity roleInvited = RoleEntity.builder()
               .roleEnum(RoleEnum.INVITED)
               .permissionList(Set.of(readPermission))
               .build();

         RoleEntity roleDeveloper = RoleEntity.builder()
               .roleEnum(RoleEnum.DEVELOPER)
               .permissionList(
                     Set.of(cretatePermission, readPermission, updatePermission, deletePermission, refactorPermission))
               .build();

         /* Crear los usuarios */
         UserEntity userDiego = UserEntity.builder()
               .email("dr.danelone@gmail.com")
               .password("$2a$10$1ajCk6DyhA0NCLaJqxR33OSvvePb5i50YA66UsARM4R8bnzrkf6hG")
               .name("Diego")
               .surname("Danelone")
               .dni("24876678")
               .isEnabled(true)
               .accountNoExpired(true)
               .accountNoLocked(true)
               .credentialsNoExpired(true)
               .roles(Set.of(roleAdmin))
               .build();

         UserEntity userFranco = UserEntity.builder()
               .email("franco@gmail.com")
               .password("$2a$10$1ajCk6DyhA0NCLaJqxR33OSvvePb5i50YA66UsARM4R8bnzrkf6hG")
               .name("Franco")
               .surname("Cosolito")
               .dni("39876678")
               .isEnabled(true)
               .accountNoExpired(true)
               .accountNoLocked(true)
               .credentialsNoExpired(true)
               .roles(Set.of(roleUser))
               .build();

         UserEntity userJero = UserEntity.builder()
               .email("jero@gmail.com")
               .password("$2a$10$1ajCk6DyhA0NCLaJqxR33OSvvePb5i50YA66UsARM4R8bnzrkf6hG")
               .name("Jerónimo")
               .surname("Margitic")
               .dni("40876678")
               .isEnabled(true)
               .accountNoExpired(true)
               .accountNoLocked(true)
               .credentialsNoExpired(true)
               .roles(Set.of(roleInvited))
               .build();

         UserEntity userMateo = UserEntity.builder()
               .email("mateo@gmail.com")
               .password("$2a$10$1ajCk6DyhA0NCLaJqxR33OSvvePb5i50YA66UsARM4R8bnzrkf6hG")
               .name("Mateo")
               .surname("Weber")
               .dni("44000111")
               .isEnabled(true)
               .accountNoExpired(true)
               .accountNoLocked(true)
               .credentialsNoExpired(true)
               .roles(Set.of(roleDeveloper))
               .build();

         userRepository.saveAll(List.of(userDiego, userFranco, userJero, userMateo));

      };
   }

}
