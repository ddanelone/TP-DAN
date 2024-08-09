package isi.dan.msclientes.excepcion;

public class ResourceNotFoundException extends RuntimeException {

   public ResourceNotFoundException(String message) {
      super(message);
   }

}
