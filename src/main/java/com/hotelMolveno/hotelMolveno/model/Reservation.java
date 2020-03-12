package com.hotelMolveno.hotelMolveno.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.Nullable;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;


@Entity
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate checkInDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate checkOutDate;
    private Integer numOfGuests;
    private Integer totalPrice;

    @ManyToOne
    private Room room;
    @ManyToOne
    private Guest guest;

//    private Payment payment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Integer getNumOfGuests() {
        return numOfGuests;
    }

    public void setNumOfGuests(Integer numOfGuests) {
        this.numOfGuests = numOfGuests;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }

}
