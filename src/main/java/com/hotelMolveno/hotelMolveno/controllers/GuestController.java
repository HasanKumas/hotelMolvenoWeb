package com.hotelMolveno.hotelMolveno.controllers;
import com.hotelMolveno.hotelMolveno.model.Guest;
import com.hotelMolveno.hotelMolveno.repositories.GuestRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")//end point

public class GuestController {
    @Autowired//connect to database
    private GuestRepository guestRepository;

    @GetMapping
    public List<Guest> getGuests() {
        return guestRepository.findAll();
    }

    @PostMapping
    public void addGuest(@RequestBody Guest guest) {
        guestRepository.save(guest);
    }

    @DeleteMapping("/{id}")
    void deleteGuest(@PathVariable Long id) {
        guestRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updateGuest(@PathVariable("id") Guest newGuest, @RequestBody Guest guest) {
        BeanUtils.copyProperties(guest, newGuest, "id");
        guestRepository.save(newGuest);
    }

}