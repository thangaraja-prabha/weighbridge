CREATE TABLE `cdetail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cname` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `cdetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `depts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dept` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `depts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kyc_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`AppName` varchar(100),
	`AppVersion` varchar(50),
	`ConfigVersion` varchar(50),
	`CountryName` varchar(100),
	`StateName` varchar(100),
	`CityName` varchar(100),
	`BrandName` varchar(100),
	`ShowroomName` varchar(100),
	`WorkstationName` varchar(100),
	`SubUserCategory1` varchar(100),
	`SubUserCategory2` varchar(100),
	`PrimaryUserType` int,
	`PrimaryUserName` varchar(100),
	`PrimaryMobileNumber` varchar(20),
	`PrimaryEmail` varchar(150),
	`KYC_punch_mobile` varchar(20),
	`KF_name` varchar(150),
	`KF_aadhar` varchar(20),
	`KF_pan` varchar(20),
	`KF_incomesource` varchar(100),
	`KF_monthlyIncome` int,
	`KF_landmark` varchar(255),
	`KF_houseType` varchar(50),
	`KF_postalcode` int,
	`KF_address` varchar(500),
	`KF_Latitude` varchar(30),
	`KF_Longitude` varchar(30),
	`KF_house_photo1` text,
	`KF_house_photo2` text,
	`KF_maritalstatus` varchar(50),
	`KF_mode` varchar(20),
	`Items` json,
	`Order_reverify` varchar(10),
	`Prev_Order_Id` int,
	`Remarks` varchar(1000),
	`trn_date` datetime,
	CONSTRAINT `kyc_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mdetail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mname` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `mdetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mlog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stdate` varchar(10),
	`eddate` varchar(10),
	`dept` varchar(50),
	`item_description1` varchar(1000),
	`nop` varchar(50),
	`stype` varchar(50),
	`stime` varchar(10),
	`etime` varchar(10),
	`bdtime` varchar(50),
	`sused` varchar(255),
	`stat` varchar(50),
	`remarks` varchar(1000),
	`username` varchar(25),
	`trn_date` varchar(20),
	`numail` varchar(50),
	CONSTRAINT `mlog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nopt` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nop` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `nopt_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sdetail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sname` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `sdetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shifts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shift` varchar(50),
	`stshift` varchar(10),
	`edshift` varchar(10),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `shifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tdetail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `tdetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`password` varchar(100) NOT NULL,
	`rights` varchar(100),
	`type` varchar(100),
	`empname` varchar(100),
	`empcode` varchar(100),
	`empdest` varchar(100),
	`email` varchar(100),
	`mobile` varchar(100),
	`dob` date,
	`doj` date,
	`trn_date` datetime,
	`imagetitle` varchar(255),
	`otp` varchar(100),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vdetail` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vnum` varchar(50),
	`username` varchar(50),
	`trn_date` varchar(25),
	CONSTRAINT `vdetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wlog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vnum` varchar(20),
	`mname` varchar(50),
	`tname` varchar(50),
	`cname` varchar(50),
	`sname` varchar(50),
	`wt1` varchar(10),
	`wt1at` varchar(20),
	`wt1by` varchar(30),
	`wt2` varchar(10),
	`wt2at` varchar(20),
	`wt2by` varchar(30),
	`wt` varchar(10),
	`wtat` varchar(20),
	`wtby` varchar(30),
	`remarks` varchar(1000),
	`stat` varchar(10),
	`username` varchar(30),
	`trn_date` varchar(20),
	CONSTRAINT `wlog_id` PRIMARY KEY(`id`)
);
