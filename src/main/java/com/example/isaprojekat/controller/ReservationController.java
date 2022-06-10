package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.AdditionalContentDTO;
import com.example.isaprojekat.dto.DateRange;
import com.example.isaprojekat.dto.ReservationDTO;
import com.example.isaprojekat.dto.mapper.DTOToReservation;
import com.example.isaprojekat.dto.mapper.ReservationToDTO;
import com.example.isaprojekat.model.AdditionalContent;
import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private DTOToReservation toReservation;
    @Autowired
    private ReservationToDTO toDTO;

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @PostMapping(path = "/book")
    public ResponseEntity<ReservationDTO> create(@RequestBody ReservationDTO dto){
        if(dto.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Reservation reservation = reservationService.save(toReservation.convert(dto));
        return new ResponseEntity<>(toDTO.convert(reservation), HttpStatus.OK);
    }


    //@PreAuthorize("hasAuthority('KORISNIK')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        if(reservationService.cancel(id))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @GetMapping(path = "/{id}")
    public ResponseEntity<ReservationDTO> getOne(@PathVariable Long id) {
        Optional<Reservation> h = reservationService.findOne(id);

        if(h.isPresent()) {
            return new ResponseEntity<>(toDTO.convert(h.get()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @GetMapping(path = "/upcoming")
    public ResponseEntity< List<ReservationDTO>> getMyUpcomingReservations() {
        List<Reservation> reservations = reservationService.getMyUpcomingReservations();
        return new ResponseEntity<>(toDTO.convert(reservations), HttpStatus.OK);
    }
    @GetMapping(path = "/upcomingForOwner/{id}")
    public ResponseEntity< List<ReservationDTO>> getMyUpcomingReservationsOwner(@PathVariable Long id) {
        List<Reservation> reservations = reservationService.getMyUpcomingReservationsOwner(id);
        return new ResponseEntity<>(toDTO.convert(reservations), HttpStatus.OK);
    }

    @GetMapping(path="/byClient/{id}")
    public ResponseEntity< List<ReservationDTO>> getMyReservationsClient(@PathVariable Long id) {
        List<Reservation> reservations = reservationService.getMyReservationsClient(id);
        return new ResponseEntity<>(toDTO.convert(reservations), HttpStatus.OK);
    }

    @GetMapping(path="/byEntity/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByEntityId(@PathVariable Long id){
        List<Reservation> res = reservationService.findAllByEntityId(id);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }

    @GetMapping(path="/byOwner/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllByOwnerId(@PathVariable Long id){
        List<Reservation> res = reservationService.findAllByOwnerId(id);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }

    @GetMapping(path="/inProgress/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllInProgressByClientId(@PathVariable Long id){
        List<Reservation> res = reservationService.findAllInProgressByClientId(id);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }

    @GetMapping(path="/upcoming/byEntity/{id}")
    public ResponseEntity<List<ReservationDTO>> findAllUpcomingByEntityId(@PathVariable Long id){
        List<Reservation> res = reservationService.findAllUpcomingByEntityId(id);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }
    @PostMapping(path="/forRange", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReservationDTO>> findAllForRange(@RequestBody DateRange obj){
        List<Reservation> res = reservationService.findAllInDateRange(obj.getStart(), obj.getEnd());

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }

    @GetMapping(path="/forLastWeek/{ownerId}")
    public ResponseEntity<List<ReservationDTO>> findAllForLastWeek(@PathVariable Long ownerId){
        List<Reservation> res = reservationService.findAllForLastWeek(ownerId);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }
    @GetMapping(path="/forThisYear/{ownerId}")
    public ResponseEntity<List<ReservationDTO>> findAllForThisYear(@PathVariable Long ownerId){
        List<Reservation> res = reservationService.findAllForThisYear(ownerId);

        return new ResponseEntity<>(toDTO.convert(res), HttpStatus.OK);
    }
}
