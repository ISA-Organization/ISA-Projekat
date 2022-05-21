package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoatRepository extends JpaRepository<Boat, Long> {
    List<Boat> findByNameContainingAndPriceLessThanEqual(String name, Double price);
    List<Boat> findByPriceLessThanEqual(Double price);
    List<Boat> findByNameAndAddressContainingAndPriceLessThanEqual(String name, String address, Double price);
    List<Boat> findByAddressContainingAndPriceLessThanEqual(String address, Double price);
}
