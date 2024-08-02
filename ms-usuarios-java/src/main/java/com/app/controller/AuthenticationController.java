package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.controller.dto.AuthCreateUserRequest;
import com.app.controller.dto.AuthLoginRequest;
import com.app.controller.dto.AuthResponse;
import com.app.service.UserDetailServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

   @Autowired
   private UserDetailServiceImpl userDetailService;

   @PostMapping("/log-in")
   public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest userRequest) {
      return new ResponseEntity<>(userDetailService.loginUser(userRequest), HttpStatus.OK);
   }

   @PostMapping("/sign-up")
   public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthCreateUserRequest userRequest) {
      return new ResponseEntity<>(this.userDetailService.createUser(userRequest), HttpStatus.CREATED);
   }
}