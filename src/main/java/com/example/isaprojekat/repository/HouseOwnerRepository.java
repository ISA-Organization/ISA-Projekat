package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.HouseOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface HouseOwnerRepository extends JpaRepository<HouseOwner, Long> {
}
