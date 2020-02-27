package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
