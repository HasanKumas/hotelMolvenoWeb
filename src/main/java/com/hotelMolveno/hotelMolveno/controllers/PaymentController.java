package com.hotelMolveno.hotelMolveno.controllers;

import com.hotelMolveno.hotelMolveno.model.Payment;
import com.hotelMolveno.hotelMolveno.model.Room;
import com.hotelMolveno.hotelMolveno.repositories.PaymentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public List<Payment> getPayment (){
        return paymentRepository.findAll();
    }

    @PostMapping
    public void addPayment(@RequestBody Payment payment){
        paymentRepository.save(payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id){
        paymentRepository.deleteById(id);
    }
    @PutMapping("/{id]")
    public void update(@PathVariable("id") Payment newPayment, @RequestBody Payment payment){
        BeanUtils.copyProperties(payment,newPayment,  "id");
        paymentRepository.save(newPayment);
    }

}
