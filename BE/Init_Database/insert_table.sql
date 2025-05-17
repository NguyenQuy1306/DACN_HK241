ALTER TABLE ban
ADD CONSTRAINT temp_unique_constraint
UNIQUE (masonhahang, thutuban, gio, ngay, songuoi);
WITH base_tables AS (
    SELECT 
        thutuban,
        masonhahang
    FROM generate_series(189, 197) AS masonhahang, generate_series(0, 20) AS thutuban
),
random_tables AS (
    SELECT DISTINCT
        (0 + FLOOR(random() * 20))::SMALLINT AS thutuban,  
        (189 + FLOOR(random() * 8))::BIGINT AS masonhahang 
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
INSERT INTO ban (gio, ngay, songuoi, thutuban, masonhahang,soluong)
SELECT 
    (TIME '10:00:00' + (FLOOR(random() * 25) * INTERVAL '30 minutes'))::TIME,
    (CURRENT_DATE + (1 + (random() * 13))::INT)::DATE,
    (1 + FLOOR(random() * 8))::SMALLINT,
    thutuban,
    masonhahang,
	(1 + FLOOR(random() * 15))::SMALLINT
FROM 
    unique_combinations
ON CONFLICT (masonhahang, thutuban, gio, ngay, songuoi)
DO UPDATE 
SET soluong = ban.soluong + EXCLUDED.soluong;
ALTER TABLE ban
DROP CONSTRAINT temp_unique_constraint;
