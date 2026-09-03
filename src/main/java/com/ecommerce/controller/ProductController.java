package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Product;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	
	@Autowired
	private ProductService ps;
	
	//get all products
	@GetMapping
	public List<Product> getAllProducts(){
		return ps.getAllProducts();
	}
	
	//get product by id
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable int id) {
		return ps.getProductById(id);
	}
	
	@PostMapping
	public Product saveProduct(@RequestBody Product product) {
		return ps.saveProduct(product);
	}
	
	@DeleteMapping("/{id}")
	public String deleteProduct(@PathVariable int id) {
		ps.deleteProduct(id);
		return "Product deleted successfully...";
	}
}
