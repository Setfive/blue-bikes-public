CREATE TABLE `trip` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`tripduration`	INTEGER,
	`starttime`	TEXT,
	`stoptime`	TEXT,
	`start_station_id`	INTEGER,
	`start_station_name`	TEXT,
	`start_station_latitude`	TEXT,
	`start_station_longitude`	TEXT,
	`end_station_id`	INTEGER,
	`end_station_name`	INTEGER,
	`end_station_latitude`	TEXT,
	`end_station_longitude`	TEXT,
	`bikeid` INTEGER,
	`usertype` TEXT,
	`birth_year` INTEGER,
	`gender` INTEGER
);
