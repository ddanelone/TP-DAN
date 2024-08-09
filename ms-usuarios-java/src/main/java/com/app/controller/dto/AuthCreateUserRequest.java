package com.app.controller.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record AuthCreateUserRequest(@NotBlank String email,
      @NotBlank String password, @NotBlank String name, @NotBlank String surname, @NotBlank String dni,
      @Valid AuthCreateRoleRequest roleRequest) {
}