package com.example.demo.controller;

import com.example.demo.model.Product ;
import org.springframework.web.bind.annotation .*;
import java.util .*;

@RestController
@RequestMapping("/products")
public class ProductController {

    private Map<Long, Product> products = new HashMap<>();
    private long counter = 1;
    @GetMapping
    public Collection<Product> getAll() {
        return products.values();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return products.get(id);
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        p.setId(counter++);
        products.put(p.getId(), p);
        return p;
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id,
                          @RequestBody Product p) {
        p.setId(id);
        products.put(id, p);
        return p;
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        products.remove(id);
        return "Produit supprimé";
    }
}