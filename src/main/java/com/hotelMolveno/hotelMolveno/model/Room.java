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

    private String roomSizeType;
    private String roomBudgetType;
    private String roomSceneType;
    private Integer roomNumber, maxBeds;
    private LocalDateTime checkInTime, checkOutTime;
    private Boolean reserved, available;
    private Integer roomPrice;

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

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getMaxBeds() {
        return maxBeds;
    }

    public void setMaxBeds(Integer maxBeds) {
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

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Integer getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(Integer roomPrice) {
        this.roomPrice = roomPrice;
    }
}
