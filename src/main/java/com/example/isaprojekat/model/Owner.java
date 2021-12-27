//package com.example.isaprojekat.model;
//
//import javax.persistence.CascadeType;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//import java.util.List;
//
//public class Owner extends User{
//
//    @ManyToOne
//    private User user;
//    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
//    private List<House> houseList;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public List<House> getHouseList() {
//        return houseList;
//    }
//
//    public void setHouseList(List<House> houseList) {
//        this.houseList = houseList;
//    }
//}
