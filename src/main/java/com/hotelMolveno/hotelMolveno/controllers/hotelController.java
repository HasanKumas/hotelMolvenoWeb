package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Reservation;
import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.ReservationRepository;
import com.hotelMolveno.hotelMolveno.repositories.RoomRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")//end point
public class hotelController {
    @Autowired//connect to database
    private RoomRepository roomRepository;
    @Autowired
    private ReservationRepository reservationRepository;


    @GetMapping("/rooms")
    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservation() {
        return reservationRepository.findAll();
    }

    @PostMapping("/rooms")
    public void addRoom(@RequestBody Room room) {
        roomRepository.save(room);
    }

    @PostMapping("/reservations")
    public void addReservation(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @DeleteMapping("/reservation/{id}")
    void deleteReservation(@PathVariable Long id) {
        reservationRepository.deleteById(id);
    }

    @DeleteMapping("/rooms/{id}")
    void deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
    }

    @PutMapping("/reservations/{id}")
    public void updateReservation(@PathVariable("id") Long id, @RequestBody Reservation reservation) {
        reservation.setId(id);
        reservationRepository.save(reservation);}


    @PutMapping("/rooms/{id}")
    public void updateRoom (@PathVariable("id") Long id, @RequestBody Room room){
        room.setId(id);
        roomRepository.save(room);
    }


}