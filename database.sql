-- This is where you make a list of the SQL commands you have used.

CREATE TABLE koalas(
	"id" serial PRIMARY KEY,
	"name" varchar(16),
	"gender" char(1),
	"age" INT,
	"ready_to_transfer" boolean,
	"notes" varchar(250)
);

INSERT INTO koalas ( name, gender, age, ready_to_transfer, notes ) VALUES ( 'Scotty', 'M', '4', 'Y', 'Born in Guatemala' );
SELECT * FROM koalas;
DELETE FROM koalas WHERE id = 11
UPDATE koalas SET ready_to_transfer = 'TRUE' WHERE id = 8;