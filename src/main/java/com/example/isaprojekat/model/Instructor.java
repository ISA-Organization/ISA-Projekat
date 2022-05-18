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
@AllArgsConstructor
@NoArgsConstructor
public class Instructor extends User{


    @OneToMany(mappedBy = "instructor",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Adventure> adventures = new HashSet<>();

}
