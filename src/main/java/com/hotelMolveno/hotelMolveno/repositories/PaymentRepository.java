package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
}
