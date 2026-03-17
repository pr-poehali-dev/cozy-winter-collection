ALTER TABLE t_p3876556_cozy_winter_collecti.products ADD COLUMN IF NOT EXISTS collection character varying(100) NULL;

UPDATE t_p3876556_cozy_winter_collecti.products SET collection = 'моховая' WHERE id IN (1012, 1008, 1013, 1014, 1009, 1011, 1010, 1005);
UPDATE t_p3876556_cozy_winter_collecti.products SET collection = 'городская' WHERE id IN (1016, 1017, 1019, 1020);
UPDATE t_p3876556_cozy_winter_collecti.products SET collection = 'особенные' WHERE id IN (1004, 3, 4, 2, 1, 1018);