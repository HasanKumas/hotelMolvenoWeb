package com.hotelMolveno.hotelMolveno.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
public class Reservation {


    @Id
    @GeneratedValue
    private Long id;
    private Integer reservationNumber;

    private static int currentReservationNumber = 1;

    // private Guest guest;
    @OneToOne
    private Room room;
    // private List<Payment> payments;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numOfGuests;


    public Reservation() {
        this.reservationNumber = currentReservationNumber;
        currentReservationNumber++;
    }

    public Integer getReservationNumber() {
        return reservationNumber;
    }

    public void setReservationNumber(Integer reservationNumber) {
        this.reservationNumber = reservationNumber;
    }

    public static int getCurrentReservationNumber() {
        return currentReservationNumber;
    }

    public static void setCurrentReservationNumber(int currentReservationNumber) {
        Reservation.currentReservationNumber = currentReservationNumber;
    }

    public void setNumOfGuests(Integer numOfGuests) {
        this.numOfGuests = numOfGuests;
    }


    //  public Guest getGuest() {
    //     return guest;
    //  }
//
//        public void setGuest(Guest guest) {
//            this.guest = guest;
//        }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

//       // public List<Payment> getPayments() {
//            return payments;
//        }
//
//        public void setPayments(List<Payment> payments) {
//            this.payments = payments;
//        }

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

    public void setNumOfGuests(int numOfGuests) {
        this.numOfGuests = numOfGuests;
    }

    public Integer totalPrice() {
        LocalDate checkIn = checkInDate;
        LocalDate checkOut = checkOutDate;
        long days = ChronoUnit.DAYS.between(checkIn, checkOut);
        return (int) days * getRoom().getRoomPrice();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
