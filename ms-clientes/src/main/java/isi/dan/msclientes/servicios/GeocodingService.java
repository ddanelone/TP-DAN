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

import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class GeocodingService {

   private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
   private final HttpClient httpClient;
   private final ObjectMapper objectMapper;

   public GeocodingService(HttpClient httpClient, ObjectMapper objectMapper) {
      this.httpClient = httpClient;
      this.objectMapper = objectMapper;
   }

   public Map<String, Double> getCoordinates(String street, String houseNumber, String city, String state,
         String country) throws Exception {
      try {
         String query = houseNumber + " " + street + "," + city + "," + state + "," + country;
         String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8.toString());
         String url = NOMINATIM_URL + "?q=" + encodedQuery + "&format=json";

         HttpRequest request = HttpRequest.newBuilder()
               .uri(new URI(url))
               .GET()
               .build();

         HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
         String responseBody = response.body();

         Map<String, Object>[] responseArray = objectMapper.readValue(responseBody, Map[].class);

         if (responseArray == null || responseArray.length == 0) {
            throw new RuntimeException("No se encontraron coordenadas para la dirección proporcionada.");
         }

         Map<String, Object> firstResult = responseArray[0];
         Double lat = Double.parseDouble((String) firstResult.get("lat"));
         Double lon = Double.parseDouble((String) firstResult.get("lon"));

         Map<String, Double> coordinates = new HashMap<>();
         coordinates.put("lat", lat);
         coordinates.put("lon", lon);

         return coordinates;
      } catch (Exception e) {
         if (e.getMessage().equals("No se encontraron coordenadas para la dirección proporcionada.")) {
            throw e;
         }
         throw new RuntimeException("Error al procesar la respuesta JSON de Nominatim.", e);
      }
   }
}
