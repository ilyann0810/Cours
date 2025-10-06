import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONArray;
import org.json.JSONObject;

public class Exercice1 {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/users");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(
                new InputStreamReader(conn.getInputStream())
            );
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONArray users = new JSONArray(response.toString());
            for (int i = 0; i < users.length(); i++) {
                JSONObject user = users.getJSONObject(i);
                System.out.println("Nom : " + user.getString("name") +
                                   ", Email : " + user.getString("email"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}