package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.AvailableRoom;
import com.hotelMolveno.hotelMolveno.model.Reservation;
import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.AvailableRoomsRepository;
import com.hotelMolveno.hotelMolveno.repositories.ReservationRepository;
import com.hotelMolveno.hotelMolveno.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Room> getAvailableRooms(@RequestParam("numOfGuests") Integer numOfGuests) {
        List<Room> availableRooms = new ArrayList<>();
        for (Room room: roomRepository.findAll()) {
            if(room.getMaxBeds().equals(numOfGuests)){
                availableRooms.add(room);
            }
        }

        for (Reservation reservation: reservationRepository.findAll()) {
            for(Room room: availableRooms){
                if (reservation.getRoom() != null && reservation.getRoom().getId().equals(room.getId())){
                    availableRooms.remove(room);
                    break;
                }
            }
        }
        return availableRooms;
    }

    //TODO repository does not work message: "could not execute statement; SQL [n/a]; constraint ["FKM8XUMI0G23038CW32OIVA2YMW: PUBLIC.RESERVATION FOREIGN KEY(ROOM_ID) REFERENCES PUBLIC.ROOM(ID) (65)"; SQL statement:↵delete from room where id=? [23503-200]]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement"
//    @PostMapping("/availableRooms")
//    public List<Room> getAvailableRooms(@RequestParam("numOfGuests") Integer numOfGuests) {
//        List<Room> availableRooms = new ArrayList<>();
//        for (Room room: roomRepository.findAll()) {
//            if(room.getMaxBeds().equals(numOfGuests)){
//                availableRoomsRepository.save(room);
//            }
//        }
//
//        for (Reservation reservation: reservationRepository.findAll()) {
//            for(Room room: availableRoomsRepository.findAll()){
//                if (reservation.getRoom().getId().equals(room.getId())){
//                    //TODO availableRoomsRepository.delete(room); does not work what is "Room t"
//                    availableRoomsRepository.deleteById(room.getId());
//                    break;
//                }
//            }
//        }
//        return availableRoomsRepository.findAll();
//    }

    @DeleteMapping("/availableRooms")
    public void deleteAvailableRoom() {
        availableRoomsRepository.deleteAll();
    }

    @PutMapping("/availableRooms/{id}")
    public void updateAvailableRoom(@PathVariable("id") Long id, @RequestBody Room room) {
        room.setId(id);
        availableRoomsRepository.save(room);}
}
