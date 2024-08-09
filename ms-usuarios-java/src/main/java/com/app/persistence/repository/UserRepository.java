package com.app.persistence.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.app.persistence.entity.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

   Optional<UserEntity> findUserEntityByEmail(String email);

   /*
    * hacen lo mismo
    * 
    * @Query("SELECT u FROM UserEntity u WHERE u.username = :username") // o WHERE
    * u.username =?") //Ver
    * Optional<UserEntity> findUser(String username);
    */
}
