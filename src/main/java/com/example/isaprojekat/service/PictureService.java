package com.example.isaprojekat.service;

import com.example.isaprojekat.dto.AdventureDTO;
import com.example.isaprojekat.model.Adventure;
import com.example.isaprojekat.model.Boat;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Picture;

import java.util.List;

public interface PictureService {
    void addPictureAdventure(Adventure dto, String s);
    void addPictureBoat(Boat dto, String s);
    void addPictureHome(House dto, String s);

    public List<Picture> getImagesByEntity(Long entityId);
}
