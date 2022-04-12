package com.example.isaprojekat.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name="instructors")
@Getter
@Setter
public class Instructor extends User{


    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Adventure> adventures;
    @Column
    private String description;
    public Instructor(Long id, String name, String surname, String address, String city, String phoneNumber,
                      String email, String password, Boolean isApproved, UserType type, String desc) {
        super(id, name, surname, address, city, phoneNumber, email, password, isApproved, UserType.INSTRUCTOR);
        this.adventures = new ArrayList<Adventure>();
        this.description = desc;
    }

    public Instructor(Long id, String description){
        this.setId(id);
        this.description = description;
    }

    public Instructor() {
        super();
        this.adventures = new ArrayList<>();
    }
}
