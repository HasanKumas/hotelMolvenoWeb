package com.hotelMolveno.hotelMolveno.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Guest {
    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;
    private String tel;
    private String email;
    private String address;
    private String idType;
    private String idValue;

    @OneToMany(mappedBy = "guest")
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {        return firstName;    }

    public void setFirstName(String firstName) {        this.firstName = firstName;    }

    public String getLastName() {        return lastName;    }

    public void setLastName(String lastName) {        this.lastName = lastName;    }

    public String getTel() {        return tel;    }

    public void setTel(String tel) {        this.tel = tel;    }

    public String getEmail() {        return email;    }

    public void setEmail(String email) {        this.email = email;    }

    public String getAddress() {        return address;    }

    public void setAddress(String address) {        this.address = address;    }

    public String getIdType() {        return idType;    }

    public void setIdType(String idType) {        this.idType = idType;    }

    public String getIdValue() {        return idValue;    }

    public void setIdValue(String idValue) {        this.idValue = idValue;    }
}
