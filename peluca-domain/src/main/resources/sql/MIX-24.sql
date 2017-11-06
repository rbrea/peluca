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