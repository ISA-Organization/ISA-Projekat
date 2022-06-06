package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> getPictureByRentingEntityId(Long rentingEntityId);
}
