package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AvailablePeriod;
import com.example.isaprojekat.model.Client;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    Optional<Client> findOne(Long id);

    List<Client> findAll();

    Client save(Client client);

    Boolean delete(Long id);

    Optional<Client> findByEmail(String email);

    void sendSubscribers(AvailablePeriod saved);

}
