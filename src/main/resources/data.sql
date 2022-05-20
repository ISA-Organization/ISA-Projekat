
-- insert into admins(id, first_name, surname, adress, city, phone_number, email, password, is_approved, type)
--             value (1, 'Boris', 'Horvat', 'Bulevar cara Lazara 65', 'Novi Sad', '0604363475', 'boris@gmail.com',
--             '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.', true, 'ADMIN');
--
-- INSERT INTO admins(id, name, surname, address, city, phone_number, email, password,is_approved, type )
--              VALUES (1,'Nikola','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','nikola@gmail.com',
--                       '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.', true, 'ADMIN');
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
              VALUES (1,'Nikola','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','nikola@gmail.com',
                      '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','ADMIN', true);
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (2,'Tamara','Simic', 'Narodnog fronta 4', 'Novi Sad', '065856963','tamara@gmail.com',
        '$2a$10$sNthvdW72VgeILPubJHBwOrU2ZS02gG3useXcoar6GYNXECR7kO/u','CLIENT', false);
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (3,'Petar','Babic', 'Milovana Glisica 8', 'Novi Sad', '062356985','petar@gmail.com',
        '$2a$10$EpkjTnNV7ZqHrng4vOCzreDjg6otsEukyo2wNf7NIHVXHUua1RdJi','BOAT_OWNER', false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (4,'Mina','Mazic', 'Uspenska 2', 'Novi Sad', '061452985','mina@maildrop.cc',
        '$2a$10$5.U37Aej4DRMW34OOEa4Ue0bn22e4../SXGOoScD03asBeFNTPSoi','INSTRUCTOR', false);

INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
VALUES (5,'Ivan','Radic', 'Ilije Bircanina 6', 'Novi Sad', '065896741','ivan@maildrop.cc',
        '$2a$10$wb7Y7laMk38mI.uteywP6utx6Hw6OeYYhCePjASPWHVU/BtRisKoy','HOUSE_OWNER', true);

INSERT INTO houses (id, name, address, number_of_rooms, number_of_beds,price,description, house_rules, additional_content, owner_id)
VALUES (1, "Vila Grand", "Dunavska 3", "5", "2", 150,
        "Villa Grand offers a shared lounge and free WiFi. It is located in Novi Sad, 85 km from the airport.",
        "Smoking inside forbidden", "parking,pool", 5);

INSERT INTO houses (id, name, address, number_of_rooms, number_of_beds,price,description, house_rules, additional_content, owner_id)
VALUES (2, "Vila Lux", "Novosadska 3", "6", "3", 250,
    "Villa Lux offers a shared lounge and free WiFi. It is located in Novi Sad, 85 km from the airport.",
    "Smoking inside forbidden", "parking,garden", 5);

INSERT INTO additional_content (id, name, price) VALUES (1, 'air condition', 5);
INSERT INTO additional_content (id, name, price) VALUES (2, 'tv', 3);
INSERT INTO additional_content (id, name, price) VALUES (3, 'parking', 15);


INSERT INTO clients (id) VALUES (2);

INSERT INTO house_owners(id) VALUES(5);

INSERT INTO house_reservations (id, start, end, max_people, price, cancelled, house_id, client_id, house_owner_id) VALUES (1, '2022-01-22 11:00:00', '2022-01-25 11:00:00', 3, 100, false, 1, null, 5);
INSERT INTO house_reservations (id, start, end, max_people, price, cancelled, house_id, client_id, house_owner_id) VALUES (2, '2022-01-30 11:00:00', '2022-02-03 11:00:00', 2, 110, false, 1, 2, 5);


INSERT INTO reservation_content (content_id, reservation_id) VALUES (1, 1);
INSERT INTO reservation_content (content_id, reservation_id) VALUES (2, 1);

INSERT INTO house_content (content_id, house_id) VALUES (1, 1);
INSERT INTO house_content (content_id, house_id) VALUES (2, 1);

INSERT INTO admins (id) VALUES (1);
