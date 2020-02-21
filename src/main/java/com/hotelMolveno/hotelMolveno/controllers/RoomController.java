package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.RoomRepository;
import org.springframework.beans.BeanUtils;
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
    public void addRoom(@RequestBody Room room) {
        roomRepository.save(room);
    }

    @DeleteMapping("/{id}")
    void deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateRoom(@PathVariable("id") Room newRoom,  @RequestBody Room room){
        BeanUtils.copyProperties(room, newRoom, "id");
        roomRepository.save(newRoom);
    }

}