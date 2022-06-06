package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Client;
import com.example.isaprojekat.model.RentingEntity;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByClient(Client client);

    List<Reservation> findAllByRentingEntityId(Long id);

    List<Reservation> findAllByOwnerId(Long id);

    List<Reservation> findAll();

    List<Reservation> findAllByClientId(Long id);

    //List<Reservation> findAllByRentingEntity(RentingEntity rentingEntity);
}
