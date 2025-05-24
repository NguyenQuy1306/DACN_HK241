SELECT * FROM public.combocosan
ORDER BY masocombocosan ASC 
-- query test
select * from postgres.public.nhahang;
SELECT * FROM pg_publication;
CREATE PUBLICATION debezium_pub FOR TABLE public.nhahang;
select * from pg_settings where name='wal_level';
ALTER SYSTEM SET wal_level = logical;
SELECT pg_create_logical_replication_slot('products_slot', 'pgoutput');
-- check port pg
SELECT *
FROM pg_settings
WHERE name = 'port';

-- insert to test kafka
INSERT INTO nhahang (
    kinhdo, vido, masochunhahang, masodanhmucnhahang, masonhahang, diachi, 
    diemdactrung, giohoatdong, khoanggia, kieunhahang, loaiamthuc, loaihinh, 
    motakhonggian, mondacsac, phuhop, ten, trangthai, url
) VALUES (
    106.70078, 10.772262, NULL, NULL, 105, 
    'qqqqqqqqqqqq', 
    'qqqqqqqqqqqq', 
    'aaaaaaaaaaaaaaaaaa', 
    'aaaaaaaaaaaaaaaaaa', 
    NULL, NULL, 
    'aaaaaaaaaaaaaaaaaa', 
    'aaaaaaaaaaaaaaaaaa', 
    'aaaaaaaaaaaaaaaaaa bèo, bánh nậm, bánh lọc, bánh cuốn thịt nướng…; Cơm sen chay, Cơm sen bò, Cơm đùi gà rô ti, Cơm chiên cá mặn…; Bún bò, Bún thịt nướng, Nem lụi; Các món gỏi; Lẩu bò, Lẩu hải sản; Các loại chè Huế...', 
    'aaaaaaaaaaaaaaaaaanhóm, gia đình,…..', 
    'aaaaaaaaaaaaaaaaaaNghĩa', 
    NULL, 
    'aaaaaaaaaaaaaaaaaad-sake-pub-92-nam-ky-khoi-nghia-quan-1-1149'
);