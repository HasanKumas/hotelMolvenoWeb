package com.hotelMolveno.hotelMolveno;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.format.datetime.DateFormatterRegistrar;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.format.support.DefaultFormattingConversionService;
import org.springframework.format.support.FormattingConversionService;

import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class HotelMolvenoApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelMolvenoApplication.class, args);
	}
	@Configuration
	class DateTimeConfig {

		@Bean
		public FormattingConversionService conversionService() {
			DefaultFormattingConversionService conversionService =
					new DefaultFormattingConversionService(false);

			DateFormatterRegistrar registrar = new DateFormatterRegistrar();
			registrar.setFormatter(new DateFormatter("dd-MM-yyyy"));
//			registrar.setDateTimeFormatter(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss"));
			registrar.registerFormatters(conversionService);

			// other desired formatters

			return conversionService;
		}
	}
}
