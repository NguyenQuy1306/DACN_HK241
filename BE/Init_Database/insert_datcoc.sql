WITH base_tables AS (
    SELECT 
        datcoc,
        masonhahang
    FROM generate_series(189, 197) AS masonhahang, generate_series(1,1) AS datcoc
),
random_values AS (
    SELECT (1 + FLOOR(random() * 10))::SMALLINT AS x
)
INSERT INTO datcoc (
    phantramcoc, 
    datcoctoithieu, 
    nguongapdungdatcoctheophantram,
    khoangthoigianhoancockhongtoanbo, 
    khoangthoigianhoancoctoanbo,
    phantramgiamcoc, 
    masodatcoc, 
    masonhahang
)
SELECT 
    (10 + FLOOR(random() * 5) * 10)::DOUBLE PRECISION,
    (10000 + (5000 * FLOOR(random() * 10)))::BIGINT,
    (500000 + (100000 * FLOOR(random() * 5)))::BIGINT,
	x AS value2,
    (x + FLOOR(random() * (19 - x + 1)))::SMALLINT AS value1, 
    
	 (20 + FLOOR(random() * 5) * 10)::DOUBLE PRECISION,
    datcoc,	
    masonhahang
FROM base_tables
CROSS JOIN random_values;


Select * from datcoc;

