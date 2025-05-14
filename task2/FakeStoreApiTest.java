import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.fail;

public class FakeStoreApiTest {
    private static final String BASE_URL = "https://fakestoreapi.com/products";

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    @Test
    public void testServerResponse() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get()
                .then()
                .assertThat()
                .statusCode(200);
    }

    @Test
    public void testProductDataValidation() {
        Response response = given()
                .contentType(ContentType.JSON)
                .when()
                .get()
                .then()
                .extract().response();

        List<Product> products = response.jsonPath().getList("", Product.class);
        List<String> defects = products.stream()
                .flatMap(product -> validateProduct(product).stream())
                .collect(Collectors.toList());

        if (!defects.isEmpty()) {
            System.out.println("\n=== Products with Defects ===");
            defects.forEach(defect -> System.out.println(defect));
            fail("Found data defects in products. See console output for details.");
        }
    }

    private List<String> validateProduct(Product product) {
        List<String> defects = new ArrayList<>();

        if (product.getTitle() == null || product.getTitle().trim().isEmpty()) {
            defects.add(String.format("Product ID %d: Empty or missing title", product.getId()));
        }

        if (product.getPrice() < 0) {
            defects.add(String.format("Product ID %d: Negative price %.2f", product.getId(), product.getPrice()));
        }

        if (product.getRating() == null) {
            defects.add(String.format("Product ID %d: Missing rating", product.getId()));
        } else if (product.getRating().getRate() < 0 || product.getRating().getRate() > 5) {
            defects.add(String.format("Product ID %d: Invalid rating %.2f (must be between 0 and 5)",
                    product.getId(), product.getRating().getRate()));
        }

        return defects;
    }
}