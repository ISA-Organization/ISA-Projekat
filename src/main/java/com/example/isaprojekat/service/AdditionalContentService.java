package com.example.isaprojekat.service;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.User;

import java.util.List;
import java.util.Optional;

public interface AdditionalContentService {
    Optional<AdditionalContent> findOne(Long id);

    List<AdditionalContent> findAll();

    AdditionalContent save(AdditionalContent additionalContent);

    Boolean delete(Long id);

}
