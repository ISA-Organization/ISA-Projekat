package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.repository.ClientRepository;
import com.example.isaprojekat.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JpaClientService implements ClientService {

    @Autowired
    private ClientRepository clientRepository;
    @Override
    public Optional<Client> findOne(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public Client save(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Boolean delete(Long id) {
        clientRepository.deleteById(id);
        return true;
    }

    @Override
    public Optional<Client> findByEmail(String email)  {
        return clientRepository.findFirstByEmail(email);
    }
}
