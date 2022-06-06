
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
              VALUES (1,'Nikola','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','nikola@gmail.com',
                      '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','ADMIN', true, false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
VALUES (2,'Anja','Pesic', 'Dunavska 8', 'Novi Sad', '064953666','anja@gmail.com',
        '$2a$10$Sk1tQ9a7gW6hPbNEG.M5Bu8O7GQ3.rTOq9M6f4Ffrw.EY5kErwV0W','HOUSE_OWNER', true, false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
VALUES (3,'Boris','Horvat', 'Narodnog fronta 58', 'Novi Sad', '064789632','boki@gmail.com',
        '$2a$10$boa9C8KlOVUp0qmNP.TF4OtgNBD8N5hcZZ8VGikhynrT1rMJbQH8C','BOAT_OWNER', true, false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
VALUES (5,'Klient','Horvat', 'Narodnog fronta 58', 'Novi Sad', '064789632','klient@gmail.com',
        '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','CLIENT', true, false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
VALUES (4,'test','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','test@gmail.com',
        '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','HOUSE_OWNER', false, false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved, is_deleted)
VALUES (6,'Instructor','Horvat', 'Narodnog fronta 58', 'Novi Sad', '064789632','instructor@gmail.com',
        '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','INSTRUCTOR', true, false);

INSERT INTO admins (is_super_owner, id) VALUES (true, 1);
INSERT INTO house_owners (id) VALUES (2);
INSERT INTO boat_owners (id) VALUES (3);
INSERT INTO house_owners (id) VALUES (4);
INSERT INTO clients (id) values(5);
insert into instructors (id) values(6);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type, latitude, longitude)
VALUES (1, 'Vila Grand', 'Stevana Milovanova 3', 'bla', 100, 'bla', 'HOUSE', 45.258779, 19.8509698);

INSERT INTO house (id, number_of_beds, number_of_rooms, house_owner_id) VALUES (1, 2, 1, 2);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type, latitude, longitude)
VALUES (2, 'Vila Ana', 'Dunavska 3', 'bla', 150, 'bla', 'HOUSE', 45.2568201, 19.8486402);

INSERT INTO house (id, number_of_beds, number_of_rooms, house_owner_id) VALUES (2, 1, 2, 2);


INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (1, 'pool', 5, 1);
INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (2, 'air condition', 3, 1);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type, latitude, longitude)
VALUES (3, 'D&D', 'Suncani kej 3', 'bla', 300, 'bla', 'BOAT', 45.234150, 19.834890);

INSERT INTO boat (id, type, length, engine_number, engine_power, max_speed, navigation, max_num_of_people,
                  fishing_equipment, cancellation_policy, boat_owner_id)
VALUES (3, 'motorboat', 7 ,'FF3456', 100, 90, 'GPS', 5, 'rod', 'aaa', 3);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type,latitude, longitude)
VALUES (4, 'Lila', 'Ribarsko ostrvo 10', 'bla', 200, 'bla', 'BOAT', 45.232360, 19.836110);

INSERT INTO boat (id, type, length, engine_number, engine_power, max_speed, navigation, max_num_of_people,
                  fishing_equipment, cancellation_policy, boat_owner_id)
VALUES (4, 'motorboat', 6, 'AA3456', 60, 50, 'VHF_radio', 2, 'fishnet', 'aaa', 3);

INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (3, 'padle', 2, 4);
INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (4, 'mini bar', 5, 4);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type,latitude, longitude)
VALUES (5, 'Sarani', 'Ribarsko ostrvo 10', 'bla', 200, 'bla', 'ADVENTURE', 45.232360, 19.836110);

insert into adventures(id, instructor_id, fishing_equipment, cancellation_policy, max_number_of_people)
VALUES (5, 6, 'Pecaljke na dubinu', 'Dva dana nakon rez', 10);

insert into available_periods(id, end, is_special_offer, special_price, start, renting_entity_id)
values(1, '2022-05-05', false, 0, '2022-04-05', 1);

insert into available_periods(id, end, is_special_offer, special_price, start, renting_entity_id)
values(2, '2022-08-05', false, 0, '2022-07-02', 1);

insert into reservations(id, cancelled, end_date, number_of_days, number_of_people, price, start_date, client_id, owner_id, renting_entity_id)
values(1, false,'2022-06-13', 7, 3, 300, '2022-06-04' , 5,2, 1);

insert into reservations(id, cancelled, end_date, number_of_days, number_of_people, price, start_date, client_id, owner_id, renting_entity_id)
values(2, false,'2022-06-25', 5, 3, 300, '2022-06-20' , 5,2, 1);
insert into reservations(id, cancelled, end_date, number_of_days, number_of_people, price, start_date, client_id, owner_id, renting_entity_id)
values(3, false,'2022-06-16', 6, 3, 1200, '2022-06-20' , 5,6, 5);

