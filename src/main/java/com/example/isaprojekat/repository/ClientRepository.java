package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findFirstByEmail(String email);
}
