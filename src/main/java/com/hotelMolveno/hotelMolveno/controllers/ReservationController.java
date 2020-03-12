package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Reservation;

import com.hotelMolveno.hotelMolveno.repositories.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")//end point
public class ReservationController {
    @Autowired//connect to database
    private ReservationRepository reservationRepository;

    @GetMapping("/reservations")
    public List<Reservation> getReservation() {
        return reservationRepository.findAll();
    }




    @PostMapping("/reservations")
    public void addReservation(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @DeleteMapping("/reservations/{id}")
    void deleteReservation(@PathVariable Long id) {
        reservationRepository.deleteById(id);
    }

    @PutMapping("/reservations/{id}")
    public void updateReservation(@PathVariable("id") Long id, @RequestBody Reservation reservation) {
        reservation.setId(id);
        reservationRepository.save(reservation);}

}
