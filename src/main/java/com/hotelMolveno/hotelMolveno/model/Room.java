package com.hotelMolveno.hotelMolveno.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Room {
    @Id
    @GeneratedValue
    private Long id;
    private String roomSizeType;
    private String roomBudgetType;
    private String roomSceneType;
    private  Integer maxBeds;
    private  String roomNumber;
    private Integer roomPrice;
    private Boolean isAvailable;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomSizeType() {
        return roomSizeType;
    }

    public void setRoomSizeType(String roomSizeType) {
        this.roomSizeType = roomSizeType;
    }

    public String getRoomBudgetType() {
        return roomBudgetType;
    }

    public void setRoomBudgetType(String roomBudgetType) {
        this.roomBudgetType = roomBudgetType;
    }

    public String getRoomSceneType() {
        return roomSceneType;
    }

    public void setRoomSceneType(String roomSceneType) {
        this.roomSceneType = roomSceneType;
    }

    public Integer getMaxBeds() {
        return maxBeds;
    }

    public void setMaxBeds(Integer maxBeds) {
        this.maxBeds = maxBeds;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(Integer roomPrice) {
        this.roomPrice = roomPrice;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
