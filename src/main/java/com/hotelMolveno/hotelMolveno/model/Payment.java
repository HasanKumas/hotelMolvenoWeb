package com.hotelMolveno.hotelMolveno.model;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class Payment implements Serializable{
    public enum Payment_Type{
        Credit_card, Debit_card, Cash;
    }

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private Reservation reservation;

    //Payment
    private Payment_Type pay_Type;
    private String name;
    private String cardNumber;
    private String billAddress;
    private String cardExpiryDate;
    private String tel;

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }



    public Payment_Type getPay_Type() {
        return pay_Type;
    }

    public void setPay_Type(Payment_Type pay_Type) {
        this.pay_Type = pay_Type;
    }

    //Constructor
    public void Payment (String card_Name, String card_No, String bill_address, String card_expiry_Date,Payment_Type pay_Type)
    {
        this.pay_Type = pay_Type;
        this.name = card_Name;
        this.cardNumber = card_No;
        this.billAddress = bill_address;
        this.cardExpiryDate = card_expiry_Date;
    }

    public void Payment ()
    {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getBillAddress() {
        return billAddress;
    }

    public void setBillAddress(String billAddress) {
        this.billAddress = billAddress;
    }

    public String getCardExpiryDate() {
        return cardExpiryDate;
    }

    public void setCardExpiryDate(String cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }
}
