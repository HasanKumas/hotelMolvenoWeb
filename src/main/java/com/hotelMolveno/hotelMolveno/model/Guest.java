package com.hotelMolveno.hotelMolveno.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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

//    @ManyToOne
//    private Reservation reservation;
//
//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }

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
