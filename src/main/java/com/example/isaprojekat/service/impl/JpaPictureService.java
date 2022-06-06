package com.example.isaprojekat.service.impl;

import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.model.*;
import com.example.isaprojekat.repository.PictureRepository;
import com.example.isaprojekat.repository.RentingEntityRepository;
import com.example.isaprojekat.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class JpaPictureService implements PictureService {

    @Autowired
    PictureRepository pictureRepository;
    @Autowired
    RentingEntityRepository repository;

    @Override
    public void addPictureAdventure(Adventure dto, String imageBase64) {
        Picture picture = new Picture();

        Optional<RentingEntity> re = repository.findById(dto.getId());
        picture.setRentingEntityId(re.get());
        byte[] bytes = Base64.getDecoder().decode(imageBase64);
        picture.setBytes(bytes);

        pictureRepository.save(picture);

    }

    @Override
    public void addPictureBoat(Boat dto, String imageBase64) {
        Picture picture = new Picture();

        Optional<RentingEntity> re = repository.findById(dto.getId());
        picture.setRentingEntityId(re.get());
        byte[] bytes = Base64.getDecoder().decode(imageBase64);
        picture.setBytes(bytes);

        pictureRepository.save(picture);
    }

    @Override
    public void addPictureHome(House dto, String imageBase64) {
        Picture picture = new Picture();

        Optional<RentingEntity> re = repository.findById(dto.getId());
        picture.setRentingEntityId(re.get());
        byte[] bytes = Base64.getDecoder().decode(imageBase64);
        picture.setBytes(bytes);

        pictureRepository.save(picture);
    }

    @Override
    public List<Picture> getImagesByEntity(Long entityId){
        List<Picture> pictures = new ArrayList<>();
        for(Picture p : pictureRepository.findAll()){
            if(p.getRentingEntityId().getId() == entityId){
                pictures.add(p);
            }
        }
        return pictures;
    }
}
