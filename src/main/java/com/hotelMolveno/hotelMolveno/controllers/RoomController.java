package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/rooms")//end point
public class RoomController {
    @Autowired//connect to database
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getRooms (){
        return roomRepository.findAll();
    }
    @PostMapping
    public String addRoom(@RequestBody Room room) {
        Room existingRoom = roomRepository.findOneByRoomNumberIgnoreCase(room.getRoomNumber());
        if(existingRoom != null) {
            return "The room number "+ room.getRoomNumber() + " is already exists. Please set another number.";
        }
        roomRepository.save(room);
        return "The room has created..";
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateRoom(@PathVariable("id") Long id,  @RequestBody Room room){
        room.setId(id);
        roomRepository.save(room);
    }

}