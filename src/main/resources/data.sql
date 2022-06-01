
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
              VALUES (1,'Nikola','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','nikola@gmail.com',
                      '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','ADMIN', true);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (2,'Anja','Pesic', 'Dunavska 8', 'Novi Sad', '064953666','anja@gmail.com',
        '$2a$10$Sk1tQ9a7gW6hPbNEG.M5Bu8O7GQ3.rTOq9M6f4Ffrw.EY5kErwV0W','HOUSE_OWNER', true);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (3,'Boris','Horvat', 'Narodnog fronta 58', 'Novi Sad', '064789632','boki@gmail.com',
        '$2a$10$boa9C8KlOVUp0qmNP.TF4OtgNBD8N5hcZZ8VGikhynrT1rMJbQH8C','BOAT_OWNER', true);

INSERT INTO admins (is_super_owner, id) VALUES (true, 1);
INSERT INTO house_owners (id) VALUES (2);
INSERT INTO boat_owners (id) VALUES (3);


INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type, latitude, longitude)
VALUES (1, 'Vila Grand', 'Stevana Milovanova 3', 'bla', 100, 'bla', 'HOUSE', 45.258779, 19.8509698);

INSERT INTO house (id, number_of_beds, number_of_rooms, house_owner_id) VALUES (1, 2, 1, 2);

INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type, latitude, longitude)
VALUES (2, 'Vila Ana', 'Dunavska 3', 'bla', 150, 'bla', 'HOUSE', 45.2568201, 19.8486402);

INSERT INTO house (id, number_of_beds, number_of_rooms, house_owner_id) VALUES (2, 1, 2, 2);


INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (1, 'pool', 5, 1);
INSERT INTO additional_content (id, name, price, renting_entity_id) VALUES (2, 'air condition', 3, 1);

-- INSERT INTO renting_entity (id, name, address, description, price, renting_rules, renting_entity_type)
-- VALUES 3, 'D&D', 'Suncani kej 3', 'bla', 300, 'bla', 'BOAT');
--
-- INSERT INTO boat (id, number_of_beds, number_of_rooms, house_owner_id) VALUES (3, 1, 2, 2);
