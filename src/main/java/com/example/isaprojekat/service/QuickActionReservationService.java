package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.QuickActionReservation;
import com.example.isaprojekat.model.User;
import com.sun.xml.bind.v2.model.annotation.Quick;

import java.util.List;
import java.util.Optional;

public interface QuickActionReservationService {
    Optional<QuickActionReservation> findOne(Long id);

    List<QuickActionReservation> findAll();

    QuickActionReservation save(QuickActionReservation quickActionReservation);

    Boolean delete(Long id);
}
