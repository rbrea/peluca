create table RULE_SELL_TYPE_ACTIVE (
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    AFFILIATED_AGENCY varchar(30), 
    ASSISTANCE_TYPE varchar(30), 
    COUNTRY_CODE_PROVIDER varchar(20),
    COUNTRY_CODE_SITE varchar(20), 
    GATEWAY varchar(100), 
    PREPAYMENT varchar(30), 
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    SOURCE_SYSTEM_NUMBER varchar(100), 
    SUPPLIER varchar(100), 
    VERSION integer, 
    primary key (ID));
    
create table RULE_SELL_TYPE_ACTIVE_AUD (
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
    RULE_START_DATE DATETIME, 
    AFFILIATED_AGENCY varchar(30), 
    ASSISTANCE_TYPE varchar(30), 
    COUNTRY_CODE_PROVIDER varchar(20), 
    COUNTRY_CODE_SITE varchar(20), 
    GATEWAY varchar(100), 
    PREPAYMENT varchar(30), 
    PRODUCT_TYPE varchar(50), 
    SELL_TYPE varchar(30), 
    SOURCE_SYSTEM_NUMBER varchar(100), 
    SUPPLIER varchar(100), 
    VERSION integer, 
    primary key (ID, REV));
    
create table RELEASE_VERSION_LOG (
	ID bigint not null auto_increment, 
    RELEASE_VERSION_DATE varchar(20), 
    RULE_NAME varchar(40), 
    RULES_AFECTED integer, 
    USER_APROVED varchar(50), 
    VERSION_RELEASED integer, 
    primary key (ID));


ALTER TABLE LEGAL_ENTITY ADD COLUMN TAXPAYER_ID_FORMATTED varchar(100);
ALTER TABLE LEGAL_ENTITY_AUD ADD COLUMN TAXPAYER_ID_FORMATTED varchar(100);