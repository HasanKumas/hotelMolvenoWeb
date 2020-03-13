package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Guest;
import com.hotelMolveno.hotelMolveno.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    Guest findOneByFirstNameAndLastName(String firstName, String lastName);
}
