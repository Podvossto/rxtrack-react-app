-- Demo data only. Login: admin / admin1234
SET NAMES utf8mb4;
USE rxtrack;

INSERT INTO `user` (user_id, username, password, name, isAdmin, email, tel) VALUES
(1, 'admin', '$2b$10$QUKTipHoBW8tj4rEpzSHu.4wjyKEOWqcq4jviK/xZYcpXXqNcfAs2', 'Demo Admin', 1, 'admin@example.com', '0000000000');

INSERT INTO medtype (type_id, medType, medTypeDetail, `Date`) VALUES
(1, 'ยาแก้ปวด', '', '2024-03-26 13:05:53'),
(2, 'ยาแก้ภูมิแพ้', '', '2024-04-08 16:27:46'),
(3, 'ยาถ่ายพยาธิ', '', '2024-04-08 16:27:57');

INSERT INTO medunit (unit_id, medUnit, `Date`) VALUES
(1, 'กระปุก', '2024-03-26 07:28:18'),
(2, 'ขวด', '2024-04-08 18:18:01'),
(3, 'แผง', '2024-04-08 18:18:01');

INSERT INTO medlocation (location_id, location_name, rack, room, quantity) VALUES
(1, 'A', 'R01', '205', 50),
(2, 'B', 'R01', '205', 50);

INSERT INTO medicine (med_id, name, status, description, medQuantity, unit_id, type_id, location_id) VALUES
(1, 'Paracetamol', 'ปกติ', 'ยาลดไข้', 96, 1, 1, 1),
(2, 'Chlorpheniramine', 'ใกล้หมดอายุ', 'ยาแก้แพ้', 35, 1, 2, 1),
(3, 'Mebendazole', 'ใกล้หมด', 'ยาถ่ายพยาธิ', 22, 1, 3, 2);

INSERT INTO patient (patient_id, patient_name) VALUES
('P660001', 'Demo Patient');

INSERT INTO inputstock (input_id, user_id, `date`) VALUES
(66001, 1, '2024-04-05 03:12:12');

INSERT INTO outputstock (output_id, user_id, patient_id, `date`) VALUES
('O6600001', 1, 'P660001', '2024-04-05 08:25:00'),
('O6600002', 1, 'P660001', '2024-04-21 20:58:21');
