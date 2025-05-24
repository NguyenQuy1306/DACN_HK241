SELECT * 
FROM nhahang r
WHERE r.vido BETWEEN 10.725395619351733 AND 10.821517936555336
  AND r.kinhdo BETWEEN 106.64891904709441 AND 106.74247449753386;
select * from nguoidung;
select * from khachhang;
select * from danhgia;

select * from nhahang ;
select * from anhnhahang;
select * from khunggiohoatdong;
select * from combocosan ;
select * from combocosan_co_monan ;
select * from ban;
select * from dondatban;
select * from dondatban_co_combocosan;
select * from dondatban_co_monan;
select * from monan;
delete from ban;
WITH base_tables AS (
    SELECT 
        thutuban,
        masonhahang
    FROM generate_series(1, 104) AS masonhahang, generate_series(1, 10) AS thutuban
),
random_tables AS (
    SELECT DISTINCT
        (1 + FLOOR(random() * 20))::SMALLINT AS thutuban,  
        (1 + FLOOR(random() * 104))::BIGINT AS masonhahang 
    FROM generate_series(1, 1000)                          
),
unique_combinations AS (
    SELECT thutuban, masonhahang
    FROM base_tables
    UNION
    SELECT thutuban, masonhahang
    FROM random_tables
    LIMIT 1050                                              
)
INSERT INTO ban (gio, ngay, songuoi, thutuban, masonhahang)
SELECT 
    (TIME '10:00:00' + (FLOOR(random() * 25) * INTERVAL '30 minutes'))::TIME,
    (CURRENT_DATE + (1 + (random() * 13))::INT)::DATE,
    (1 + FLOOR(random() * 8))::SMALLINT,
    thutuban,
    masonhahang
FROM 
    unique_combinations;






INSERT INTO nguoidung (
    ngaysinh, vaitro, diachi, email, gioitinh, hoten, matkhau, sdt
) VALUES
('1990-01-01', 'C', 'Ho Chi Minh City', 'nguyenvananh1@gmail.com', 'Nam', 'Nguyen Van Anh', 'Password123', '0901000001'),
('1992-02-02', 'C', 'Hanoi', 'trantuananh2@gmail.com', 'Nam', 'Tran Tuan Anh', 'Welcome456', '0901000002'),
('1989-03-03', 'C', 'Da Nang', 'lethithuy3@gmail.com', 'Nữ', 'Le Thi Thuy', 'Secure789', '0901000003'),
('1985-04-04', 'C', 'Hai Phong', 'phamquanghieu4@gmail.com', 'Nam', 'Pham Quang Hieu', 'Safe1234', '0901000004'),
('1991-05-05', 'C', 'Can Tho', 'hoangminhhoang5@gmail.com', 'Nam', 'Hoang Minh Hoang', 'Password5678', '0901000005'),
('1993-06-06', 'C', 'Ha Long', 'nguyenthilinh6@gmail.com', 'Nữ', 'Nguyen Thi Linh', 'Linh0987', '0901000006'),
('1994-07-07', 'C', 'Bac Ninh', 'trinhvanhieu7@gmail.com', 'Nam', 'Trinh Van Hieu', 'Random123', '0901000007'),
('1987-08-08', 'C', 'Hue', 'doannguyenvi8@gmail.com', 'Nữ', 'Doan Nguyen Vi', 'SafePass1', '0901000008'),
('1980-09-09', 'C', 'Vinh', 'nguyenhoanghung9@gmail.com', 'Nam', 'Nguyen Hoang Hung', 'Secure12abc', '0901000009'),
('1995-10-10', 'C', 'Nha Trang', 'hoangtuanlong10@gmail.com', 'Nam', 'Hoang Tuan Long', 'Password12345', '0901000010'),
('1983-11-11', 'C', 'Quang Ninh', 'nguyenminhdang11@gmail.com', 'Nam', 'Nguyen Minh Dang', 'Linh12abc', '0901000011'),
('1984-12-12', 'C', 'Bac Giang', 'phamthangbao12@gmail.com', 'Nam', 'Pham Thang Bao', 'Password1234', '0901000012'),
('1988-01-13', 'C', 'Binh Dinh', 'nguyenhuynhthanh13@gmail.com', 'Nữ', 'Nguyen Huynh Thanh', 'Hoang321', '0901000013'),
('1996-02-14', 'C', 'Vinh Phuc', 'hoanghieuvinh14@gmail.com', 'Nam', 'Hoang Hieu Vinh', 'Thuy098', '0901000014'),
('1992-03-15', 'C', 'Tay Ninh', 'nguyenquanghieu15@gmail.com', 'Nam', 'Nguyen Quang Hieu', 'QuyenABC123', '0901000015'),
('1981-04-16', 'C', 'Tien Giang', 'truongtamthuy16@gmail.com', 'Nữ', 'Truong Tam Thuy', 'Thao98765', '0901000016'),
('1997-05-17', 'C', 'Nam Dinh', 'nguyetminhhoa17@gmail.com', 'Nữ', 'Nguyen Minh Hoa', 'PasswordQWERT', '0901000017'),
('1986-06-18', 'C', 'Bac Lieu', 'truongthienlong18@gmail.com', 'Nam', 'Truong Thien Long', 'Linh123abc', '0901000018'),
('1982-07-19', 'C', 'Quang Nam', 'nguyenlanhieu19@gmail.com', 'Nam', 'Nguyen Lan Hieu', 'SafePass01', '0901000019'),
('1998-08-20', 'C', 'Binh Duong', 'tranhathanh20@gmail.com', 'Nữ', 'Tran Ha Thanh', 'Samantha12', '0901000020'),
('1990-09-21', 'C', 'Phu Tho', 'nguyenhuongvi21@gmail.com', 'Nữ', 'Nguyen Huong Vi', 'Gohuo321', '0901000021'),
('1991-10-22', 'C', 'Lam Dong', 'phantrinhthuy22@gmail.com', 'Nữ', 'Phan Trinh Thuy', 'Abc12345', '0901000022'),
('1988-11-23', 'C', 'Phan Thiet', 'hoanglongquang23@gmail.com', 'Nam', 'Hoang Long Quang', 'Quang12asd', '0901000023'),
('1994-12-24', 'C', 'Vinh', 'nguyenhieuvan24@gmail.com', 'Nam', 'Nguyen Hieu Van', 'Secure1q2', '0901000024'),
('1993-01-25', 'C', 'Ben Tre', 'hoangthianh26@gmail.com', 'Nữ', 'Hoang Thi Anh', 'Asd4567', '0901000025'),
('1992-02-26', 'C', 'Ha Nam', 'nguyenhoangbao27@gmail.com', 'Nam', 'Nguyen Hoang Bao', 'Thao789Q', '0901000026'),
('1996-03-27', 'C', 'Vung Tau', 'phamvanminh28@gmail.com', 'Nam', 'Pham Van Minh', 'KhongdeHieu29', '0901000027'),
('1995-04-28', 'C', 'Can Tho', 'nguyenminhthuy29@gmail.com', 'Nữ', 'Nguyen Minh Thuy', 'Minh78910', '0901000028'),
('1991-05-29', 'C', 'Thanh Hoa', 'phamkhanhnguyen30@gmail.com', 'Nam', 'Pham Khanh Nguyen', 'Saohuynh1234', '0901000029'),
('1990-06-30', 'C', 'Quang Ngai', 'leminhbao31@gmail.com', 'Nữ', 'Le Minh Bao', 'Baoha56789', '0901000030'),
('1989-07-31', 'C', 'Quang Nam', 'truongminhkhai32@gmail.com', 'Nam', 'Truong Minh Khai', 'Vi1234abc', '0901000031'),
('1992-08-01', 'C', 'Dak Lak', 'nguyenluan32@gmail.com', 'Nam', 'Nguyen Lu An', 'Secureabc33', '0901000032'),
('1994-09-02', 'C', 'Nghe An', 'nguyenthichao34@gmail.com', 'Nữ', 'Nguyen Thi Chao', 'Mi@10Password', '0901000033'),
('1985-10-03', 'C', 'Quy Nhon', 'lethithanh35@gmail.com', 'Nữ', 'Le Thi Thanh', '1234abcThi', '0901000034'),
('1984-11-04', 'C', 'Ninh Binh', 'nguyenminhha36@gmail.com', 'Nam', 'Nguyen Minh Ha', 'Khongthamduy36', '0901000035'),
('1995-12-05', 'C', 'Bac Giang', 'hoangtuan37@gmail.com', 'Nam', 'Hoang Tuan', 'Myaccess1234', '0901000036'),
('1991-01-06', 'C', 'Dong Nai', 'nguyenhieumau38@gmail.com', 'Nữ', 'Nguyen Hieu Mau', '123456Linh', '0901000037'),
('1987-02-07', 'C', 'Vinh Long', 'doanhieugui39@gmail.com', 'Nam', 'Doan Hieu Gui', 'Long12345', '0901000038'),
('1993-03-08', 'C', 'Ha Tay', 'nguyenhuynhhoa40@gmail.com', 'Nữ', 'Nguyen Huynh Hoa', 'Thuy23456', '0901000039'),
('1988-04-09', 'C', 'Cao Bang', 'nguyenlanh38@gmail.com', 'Nam', 'Nguyen Lan Hieu', 'Gintama123', '0901000040'),
('1992-05-10', 'C', 'Ha Bac', 'nguyenhuongvi41@gmail.com', 'Nữ', 'Nguyen Huong Vi', 'Supring', '0901000041'),
('1990-06-11', 'C', 'Dong Nai', 'hoangminhbao42@gmail.com', 'Nam', 'Hoang Minh Bao', 'Secure12', '0901000042'),
('1987-07-12', 'C', 'Thanh Hoa', 'nguyenthuylinh43@gmail.com', 'Nữ', 'Nguyen Thuy Linh', 'Chao98765', '0901000043'),
('1993-08-13', 'C', 'Long An', 'nguyenquanghieu44@gmail.com', 'Nam', 'Nguyen Quang Hieu', '1234Security1', '0901000044'),
('1989-09-14', 'C', 'Quy Nhon', 'hoanganhkhai45@gmail.com', 'Nam', 'Hoang Anh Khai', 'Minh7896', '0901000045'),
('1994-10-15', 'C', 'Lam Dong', 'lequangthao46@gmail.com', 'Nữ', 'Le Quang Thao', 'LinhNa0405', '0901000046'),
('1995-11-16', 'C', 'Vung Tau', 'trinhthangduc47@gmail.com', 'Nam', 'Trinh Thang Duc', 'qwerty987', '0901000047'),
('1992-12-17', 'C', 'Kon Tum', 'nguyenminhnghia48@gmail.com', 'Nam', 'Nguyen Minh Nghia', 'Linh321Secure', '0901000048'),
('1986-01-18', 'C', 'Bac Giang', 'nguyenleminh49@gmail.com', 'Nữ', 'Nguyen Le Minh', '1234Password1', '0901000049'),
('1985-02-19', 'C', 'Khanh Hoa', 'hoangtuanquy50@gmail.com', 'Nam', 'Hoang Tuan Quy', '1234SecureAB', '0901000050');


INSERT INTO khachhang (diemtichluy, masokhachhang)
SELECT FLOOR(RANDOM() * 1000), masonguoidung
FROM nguoidung
LIMIT 50;