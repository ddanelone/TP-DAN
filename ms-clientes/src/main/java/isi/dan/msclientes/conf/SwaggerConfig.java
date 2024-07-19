package isi.dan.msclientes.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

   @Bean
   public Docket apiDocket() {
      return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("isi.dan.msclientes.controller"))
            .paths(PathSelectors.any())
            .build()
            .apiInfo(getApiInfo());
   }

   private ApiInfo getApiInfo() {
      return new ApiInfo(
            "Clientes Microservice API", // Título
            "API para gestionar clientes, obras y usuarios habilitados", // Descripción
            "1.0", // Versión
            "http://example.com/terms", // URL de los términos de servicio (puedes dejarlo como está o cambiarlo a la
                                        // URL de tus términos de servicio)
            new Contact("Nombre del Responsable", "https://tu-sitio-web.com", "correo@tu-sitio-web.com"), // Contacto
            "MIT License", // Nombre de la licencia (ajusta según corresponda)
            "https://opensource.org/licenses/MIT", // URL de la licencia (ajusta según corresponda)
            Collections.emptyList() // Lista de extensiones adicionales
      );
   }

}
