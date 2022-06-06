package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.User;
import com.example.isaprojekat.model.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String email);
    Optional<User> findFirstByEmailAndPassword(String email,String password);
    List<User> findAllByType(UserType type);
}
