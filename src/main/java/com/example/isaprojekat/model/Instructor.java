package com.example.isaprojekat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="instructors")
@Getter
@Setter
@NoArgsConstructor
public class Instructor extends User{


    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private Set<Adventure> adventures = new HashSet<>();

    public Instructor(Long id, String firstName, String surname, String address, String city, String phoneNumber, String email, String password,
                      Boolean is_approved, UserType type, Boolean isDeleted) {
       super(id, firstName, surname, address, city, phoneNumber, email, password, is_approved, UserType.INSTRUCTOR, isDeleted);
       this.adventures = new HashSet<>();
    }

}
