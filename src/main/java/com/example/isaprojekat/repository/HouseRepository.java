package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

}
