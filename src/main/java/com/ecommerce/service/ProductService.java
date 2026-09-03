package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepo pr;
	
	public List<Product> getAllProducts(){
		return pr.findAll();
	}
	
	public Product getProductById(int id) {
		return pr.findById(id).orElse(null);
	}
	
	public Product saveProduct(Product product) {
		return pr.save(product);
	}
	
	public void deleteProduct(int id) {
		pr.deleteById(id);
	}
}
