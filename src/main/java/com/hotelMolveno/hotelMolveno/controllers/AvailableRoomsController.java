package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Reservation;
import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.AvailableRoomsRepository;
import com.hotelMolveno.hotelMolveno.repositories.ReservationRepository;
import com.hotelMolveno.hotelMolveno.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")//end point
public class AvailableRoomsController {
    @Autowired//connect to database
    private ReservationRepository reservationRepository;
    @Autowired//connect to database
    private RoomRepository roomRepository;
    @Autowired//connect to database
    private AvailableRoomsRepository availableRoomsRepository;

    @GetMapping("/availableRooms")
    public List<Room> getAllAvailableRooms() {
        List<Room> availableRooms = new ArrayList<>(roomRepository.findAll());
        for (Reservation reservation: reservationRepository.findAll()) {
            for(Room room: availableRooms){
                if (reservation.getRoom().getId().equals(room.getId())){
                       availableRooms.remove(room);
                   break;
                }
            }
        }
        return availableRooms;
    }

    @PostMapping("/availableRooms")
    public List<Room> getAvailableRooms(@RequestParam("numOfGuests") Integer numOfGuests, @RequestParam("checkInDate") @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate checkInDate, @RequestParam("checkOutDate") @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate checkOutDate) {
        List<Room> availableRooms = new ArrayList<>();
        //checks the number of guests for the biggest room. Currently set to 4 beds.
        // If there is no single room available shows all types of available rooms for multiple choice.
        if (numOfGuests>4){
            availableRooms.addAll(roomRepository.findAll());
        }else{
            for (Room room: roomRepository.findAll()) {
                if(room.getMaxBeds().equals(numOfGuests)){
                    availableRooms.add(room);
                }
            }
        };
        if (reservationRepository == null) {
            return availableRooms;
        }
        //checks the available rooms according to check in and check out dates
        for (Reservation reservation: reservationRepository.findAll()) {
            for(Room room: availableRooms){
                if (reservation.getRoom() != null && reservation.getRoom().getId().equals(room.getId())){
                    if (!(checkInDate.isBefore(reservation.getCheckInDate()) && (checkOutDate.isBefore(reservation.getCheckInDate()) || checkOutDate.isEqual(reservation.getCheckInDate())) ||
                            ((checkInDate.isAfter(reservation.getCheckOutDate()) || checkInDate.isEqual(reservation.getCheckOutDate())) && checkOutDate.isAfter(reservation.getCheckOutDate()))))
                    {
                        availableRooms.remove(room);
                        break;
                    }
                }
            }
        }
        return availableRooms;
    }

    @DeleteMapping("/availableRooms")
    public void deleteAvailableRoom() {
        availableRoomsRepository.deleteAll();
    }

    @PutMapping("/availableRooms/{id}")
    public void updateAvailableRoom(@PathVariable("id") Long id, @RequestBody Room room) {
        room.setId(id);
        availableRoomsRepository.save(room);}
}
