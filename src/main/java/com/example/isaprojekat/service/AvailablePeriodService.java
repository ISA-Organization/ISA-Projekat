package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AvailablePeriod;

import java.util.List;

public interface AvailablePeriodService {

    AvailablePeriod save(AvailablePeriod period);
    AvailablePeriod delete(Long id);
    AvailablePeriod findOne(Long id);
    List<AvailablePeriod> findAll();
}
