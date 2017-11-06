create table FICTIONAL_CHARGE_PENDING_APPROVAL(
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    LEGAL_ENTITY_OM varchar(20),
    LEGAL_ENTITY_AR_RF varchar(20),
    FICTIONAL_CHARGE bit,
    VERSION integer,
    primary key (ID));
    
alter table RELEASE_VERSION_LOG add column ACTIVATED bit default 0;
alter table RELEASE_VERSION_LOG add column CREATION_DATE varchar(20);

create table RULE_SELL_TYPE_PENDING_APPROVAL(
	ID bigint not null auto_increment, 
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
    VERSION INT,
    primary key (ID));
    
create table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    AFILIATED varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID));
     
create table PAYMENT_REFUND_PENDING_APPROVAL(
	ID bigint not null auto_increment, 
    COUNTRY_CODE_SITE  varchar(20),
    PRODUCT_TYPE varchar(50),
    CURRENCY_TYPE varchar(50),
    PAYMENT_METHOD varchar(50),
    COLECCTION_CHANNEL varchar(50),
    MERCHANT varchar(50),
    LEGAL_ENTITY_ID bigint,
	VERSION integer,
    primary key (ID));
