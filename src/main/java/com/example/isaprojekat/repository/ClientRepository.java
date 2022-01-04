package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.House;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
