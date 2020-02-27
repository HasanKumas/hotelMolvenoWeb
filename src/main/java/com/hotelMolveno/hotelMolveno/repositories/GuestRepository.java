package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
}
