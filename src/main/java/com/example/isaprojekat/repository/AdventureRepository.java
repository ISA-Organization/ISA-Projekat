package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdventureRepository extends JpaRepository<Adventure, Long> {
    List<Adventure> findByNameContainingAndPriceLessThanEqual(String name, Double price);
    List<Adventure> findByPriceLessThanEqual(Double price);
    List<Adventure> findByNameAndAddressContainingAndPriceLessThanEqual(String name, String address, Double price);
    List<Adventure> findByAddressContainingAndPriceLessThanEqual(String address, Double price);

    List<Adventure> findByNameContainingAndPriceLessThanEqualAndInstructorId(String name, Double price, Long ownerId);
    List<Adventure> findByNameAndAddressContainingAndPriceLessThanEqualAndInstructorId(String name, String address, Double price, Long ownerId);
    List<Adventure> findByAddressContainingAndPriceLessThanEqualAndInstructorId(String address, Double price, Long ownerId);
    List<Adventure> findByInstructorIdAndPriceLessThanEqual(Long ownerId, Double price);
}
