package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Guest;
import com.hotelMolveno.hotelMolveno.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {

}
