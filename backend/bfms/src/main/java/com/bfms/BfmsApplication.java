package com.bfms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BfmsApplication {
	Logger logger = LoggerFactory.getLogger(BfmsApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BfmsApplication.class, args);
	}

	
}
