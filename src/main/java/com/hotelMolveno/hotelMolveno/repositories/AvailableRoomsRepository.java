package com.hotelMolveno.hotelMolveno.repositories;

import com.hotelMolveno.hotelMolveno.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailableRoomsRepository extends JpaRepository<Room, Long> {
}
