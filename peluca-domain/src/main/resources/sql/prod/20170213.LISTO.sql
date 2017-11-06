use cfa_mixer;

create table OM_LEGAL_ENTITY_PAD(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
     primary key (ID));

create table OM_LEGAL_ENTITY_PAD_AUD (
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
    primary key (ID, REV));


create table OM_LEGAL_ENTITY_PAD_ACTIVE(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID));
     
create table OM_LEGAL_ENTITY_PAD_ACTIVE_AUD (
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
    primary key (ID, REV));
    
create table OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID));
     
alter table RULE_SELL_TYPE drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_AUD drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_ACTIVE drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column SOURCE_SYSTEM_NUMBER;

alter table RULE_SELL_TYPE drop column PREPAYMENT;
alter table RULE_SELL_TYPE_AUD drop column PREPAYMENT;
alter table RULE_SELL_TYPE_ACTIVE drop column PREPAYMENT;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column PREPAYMENT;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column PREPAYMENT;

alter table RULE_SELL_TYPE drop column SUPPLIER;
alter table RULE_SELL_TYPE_AUD drop column SUPPLIER;
alter table RULE_SELL_TYPE_ACTIVE drop column SUPPLIER;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column SUPPLIER;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column SUPPLIER;

alter table RULE_SELL_TYPE drop column GATEWAY;
alter table RULE_SELL_TYPE_AUD drop column GATEWAY;
alter table RULE_SELL_TYPE_ACTIVE drop column GATEWAY;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column GATEWAY;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column GATEWAY;

alter table RULE_SELL_TYPE add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column CHANNEL varchar(50) default "ALL";

alter table RULE_SELL_TYPE add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column COLECCTION_CHANNEL varchar(50) default "ALL";

alter table RULE_SELL_TYPE add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column MERCHANT_ID varchar(50) default "ALL";

create table USER (
	ID bigint not null auto_increment, 
	USER_NAME varchar(50),
    EMAIL varchar(50),
	primary key (ID));
    
create table SUBSCRIPTION_EVENT (
	SUBSCRIPTION_ID bigint not null auto_increment, 
	NOTIFICATION_EVENT varchar(50),
    RULE_NAME varchar(50),
	primary key (SUBSCRIPTION_ID));
    

create table USER_SUBSCRIPTION_EVENT (
	ID bigint,
    SUBSCRIPTION_ID bigint);
    
alter table OM_LEGAL_ENTITY_PAD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table OM_LEGAL_ENTITY_PAD_ACTIVE change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table OM_LEGAL_ENTITY_PAD_AUD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table OM_LEGAL_ENTITY_PAD_ACTIVE_AUD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL change AFILIATED COUNTRY_CODE_DESTINY varchar(20);

alter table LEGAL_ENTITY add column START_DATE date default '2016-01-01 00:00:00';
alter table LEGAL_ENTITY_AUD add column START_DATE date;
