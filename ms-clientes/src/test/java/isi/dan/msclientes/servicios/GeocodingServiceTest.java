package isi.dan.msclientes.servicios;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GeocodingServiceTest {

   @InjectMocks
   private GeocodingService geocodingService;

   @Mock
   private HttpClient httpClient;

   @Mock
   private HttpResponse<String> httpResponse;

   private ObjectMapper objectMapper;

   @BeforeEach
   void setup() {
      objectMapper = new ObjectMapper();
      geocodingService = new GeocodingService(httpClient, objectMapper);
   }

   @DisplayName("Test para obtener coordenadas exitosamente")
   @Test
   void testGetCoordinatesSuccess() throws Exception {
      // given
      String query = URLEncoder.encode("123 Main St,Some City,Some State,Some Country",
            StandardCharsets.UTF_8.toString());
      String url = "https://nominatim.openstreetmap.org/search?q=" + query + "&format=json";

      String jsonResponse = "[{\"lat\":\"40.748817\",\"lon\":\"-73.985428\"}]";

      when(httpResponse.body()).thenReturn(jsonResponse);
      when(httpClient.send(any(HttpRequest.class), any(HttpResponse.BodyHandler.class))).thenReturn(httpResponse);

      // when
      Map<String, Double> coordinates = geocodingService.getCoordinates("Main St", "123", "Some City", "Some State",
            "Some Country");

      // then
      assertEquals(40.748817, coordinates.get("lat"));
      assertEquals(-73.985428, coordinates.get("lon"));
   }

   @DisplayName("Test para manejo de excepción cuando no se encuentran coordenadas")
   @Test
   void testGetCoordinatesNoResults() throws Exception {
      // given
      String query = URLEncoder.encode("123 Main St,Some City,Some State,Some Country",
            StandardCharsets.UTF_8.toString());
      String url = "https://nominatim.openstreetmap.org/search?q=" + query + "&format=json";

      String jsonResponse = "[]";

      when(httpResponse.body()).thenReturn(jsonResponse);
      when(httpClient.send(any(HttpRequest.class), any(HttpResponse.BodyHandler.class))).thenReturn(httpResponse);

      // when & then
      RuntimeException exception = assertThrows(RuntimeException.class, () -> {
         geocodingService.getCoordinates("Main St", "123", "Some City", "Some State", "Some Country");
      });

      assertEquals("No se encontraron coordenadas para la dirección proporcionada.", exception.getMessage());
   }

   @DisplayName("Test para manejo de excepción cuando ocurre un error en la solicitud HTTP")
   @Test
   void testGetCoordinatesHttpError() throws Exception {
      // given
      String query = URLEncoder.encode("123 Main St,Some City,Some State,Some Country",
            StandardCharsets.UTF_8.toString());
      String url = "https://nominatim.openstreetmap.org/search?q=" + query + "&format=json";

      when(httpClient.send(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
            .thenThrow(new IOException("Error en la solicitud HTTP"));

      // when & then
      RuntimeException exception = assertThrows(RuntimeException.class, () -> {
         geocodingService.getCoordinates("Main St", "123", "Some City", "Some State", "Some Country");
      });

      assertEquals("Error al procesar la respuesta JSON de Nominatim.", exception.getMessage());
      assertEquals("Error en la solicitud HTTP", exception.getCause().getMessage());
   }
}