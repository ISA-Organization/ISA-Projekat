package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.repository.AdditionalContentRepository;
import com.example.isaprojekat.service.AdditionalContentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class JpaAdditionalContentService implements AdditionalContentService {

    @Autowired
    private AdditionalContentRepository additionalContentRepository;
    @Override
    public Optional<AdditionalContent> findOne(Long id) {
        return additionalContentRepository.findById(id);
    }

    @Override
    public List<AdditionalContent> findAll() {
        return additionalContentRepository.findAll();
    }

    @Override
    public AdditionalContent save(AdditionalContent additionalContent) {
        return additionalContentRepository.save(additionalContent);
    }

    @Override
    public Boolean delete(Long id) {
        additionalContentRepository.deleteById(id);
        return true;
    }
}
