package isi.dan.msclientes.servicios;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class GeocodingService {

   private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

   public Map<String, Double> getCoordinates(String street, String houseNumber, String city, String state,
         String country) {
      try {
         // Construir la URL de consulta con parámetros codificados
         String query = houseNumber + " " + street + "," + city + "," + state + "," + country;
         String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8.toString());
         String url = NOMINATIM_URL + "?q=" + encodedQuery + "&format=json";

         System.out.println("URL: " + url);

         // Crear el cliente HTTP
         HttpClient client = HttpClient.newHttpClient();
         HttpRequest request = HttpRequest.newBuilder()
               .uri(new URI(url))
               .GET()
               .build();

         // Enviar la solicitud y obtener la respuesta
         HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
         String responseBody = response.body();

         System.out.println("Respuesta en bruto: " + responseBody);

         // Convertir la respuesta JSON a un array de Map
         ObjectMapper objectMapper = new ObjectMapper();
         Map<String, Object>[] responseArray = objectMapper.readValue(responseBody, Map[].class);

         // Procesar la respuesta
         if (responseArray != null && responseArray.length > 0) {
            Map<String, Object> firstResult = responseArray[0];
            Double lat = Double.parseDouble((String) firstResult.get("lat"));
            Double lon = Double.parseDouble((String) firstResult.get("lon"));

            Map<String, Double> coordinates = new HashMap<>();
            coordinates.put("lat", lat);
            coordinates.put("lon", lon);

            return coordinates;
         } else {
            throw new RuntimeException("No se encontraron coordenadas para la dirección proporcionada.");
         }
      } catch (Exception e) {
         throw new RuntimeException("Error al procesar la respuesta JSON de Nominatim.", e);
      }
   }
}