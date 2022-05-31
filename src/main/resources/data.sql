
INSERT INTO users (id, first_name, surname, address, city, phone_number, email, password, type, is_approved)
              VALUES (1,'Nikola','Kojic', 'Loncarska 8', 'Novi Sad', '063563965','nikola@gmail.com',
                      '$2a$10$oD0Cq/HgF.l/u5yUH3KdUuSl77Npw16xZuGHYbp10u9kO2onfEzC.','ADMIN', true);


INSERT INTO admins (is_super_owner, id) VALUES (true, 1);
