package com.hotelMolveno.hotelMolveno.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Room {
    @Id
    @GeneratedValue
    private Long id;

    final int MAX_NUM_OF_ROOMS = 200;
    private String roomSizeType;
    private String roomBudgetType;
    private String roomSceneType;
    private  int roomNumber, maxBeds;
    private LocalDateTime checkInTime, checkOutTime;
    private boolean reserved, available;
    private int roomPrice;

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

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getMaxBeds() {
        return maxBeds;
    }

    public void setMaxBeds(int maxBeds) {
        this.maxBeds = maxBeds;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public boolean getReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public boolean getAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public int getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(int roomPrice) {
        this.roomPrice = roomPrice;
    }
}
