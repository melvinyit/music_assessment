drop database if exists music;

create database music;

use music;

create table users (
	user_id varchar(8) not null,
	username varchar(32) not null,
	primary key (user_id)
);

CREATE TABLE `music`.`country` (
  `country_code` CHAR(2) NOT NULL,
  `country_name` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`country_code`));
  
CREATE TABLE `music`.`music` (
  `music_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `mp3url` varchar(256) NOT NULL,
  `lyric` mediumtext,
  `checkout_limit` int(2) NOT NULL DEFAULT 3,
  `country_code` char(2) NOT NULL,
  PRIMARY KEY (`music_id`),
  KEY `fk_music_country_idx` (`country_code`),
  KEY `idx_title` (`title`),
  CONSTRAINT `fk_music_country` FOREIGN KEY (`country_code`) REFERENCES `country` (`country_code`) ON UPDATE CASCADE
);

CREATE TABLE `music`.`checkout` (
  `user_id` VARCHAR(8) NOT NULL,
  `music_id` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'this is the check out timestamp',
  PRIMARY KEY (`user_id`, `music_id`),
  INDEX `fk_checkout_music_idx` (`music_id` ASC) VISIBLE,
  CONSTRAINT `fk_checkout_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_checkout_music`
    FOREIGN KEY (`music_id`)
    REFERENCES `music`.`music` (`music_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

insert into users(user_id, username) values
	('4d0cae84', 'fred'),
	('26a85b1c', 'barney'),
	('675cee52', 'betty'),
	('27b965f6', 'wilma'),
	('820e8a4d', 'bambam'),
	('fc42a34d', 'pebbles');
    
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('JP', 'Japan', './assets/jp.png');
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('MY', 'Malaysia', './assets/my.png');
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('RU', 'Russia', './assets/ru.png');
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('SG', 'Singapore', './assets/sg.png');
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('UK', 'United Kingdom', './assets/uk.png');
INSERT INTO `music`.`country` (`country_code`, `country_name`, `image_url`) VALUES ('US', 'U.S.A', './assets/us.png');

