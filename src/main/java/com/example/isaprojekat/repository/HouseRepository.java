package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByNameContainingAndPriceLessThanEqual(String name, Double price);
    List<House> findByPriceLessThanEqual(Double price);
    List<House> findByNameAndAddressContainingAndPriceLessThanEqual(String name, String address, Double price);
    List<House> findByAddressContainingAndPriceLessThanEqual(String address, Double price);

    List<House> findByNameContainingAndPriceLessThanEqualAndHouseOwnerId(String name, Double price, Long ownerId);
    List<House> findByNameAndAddressContainingAndPriceLessThanEqualAndHouseOwnerId(String name, String address, Double price, Long ownerId);
    List<House> findByAddressContainingAndPriceLessThanEqualAndHouseOwnerId(String address, Double price, Long ownerId);
    List<House> findByHouseOwnerIdAndPriceLessThanEqual(Long ownerId, Double price);
}
