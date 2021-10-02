CREATE TABLE `Students` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Teachers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Classes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	`period` INT NOT NULL,
	`teacher_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `StudentClasses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`student_id` INT NOT NULL,
	`class_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Deadlines` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL,
	`class_id` INT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255),
	PRIMARY KEY (`id`)
);

ALTER TABLE `Classes` ADD CONSTRAINT `Classes_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`);

ALTER TABLE `StudentClasses` ADD CONSTRAINT `StudentClasses_fk0` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`);

ALTER TABLE `StudentClasses` ADD CONSTRAINT `StudentClasses_fk1` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`);

ALTER TABLE `Deadlines` ADD CONSTRAINT `Deadlines_fk0` FOREIGN KEY (`class_id`) REFERENCES `Classes`(`id`);