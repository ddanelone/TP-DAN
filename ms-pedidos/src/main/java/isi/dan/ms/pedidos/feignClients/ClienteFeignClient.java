package isi.dan.ms.pedidos.feignClients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import isi.dan.ms.pedidos.modelo.Cliente;

@FeignClient(name = "ms-clientes")
public interface ClienteFeignClient {

   @PostMapping("/cliente")
   Cliente guardarCliente(@RequestBody Cliente cliente);

   @GetMapping("/cliente/pedido/{id}")
   List<Cliente> getClientes(@PathVariable("id") String id);
}
