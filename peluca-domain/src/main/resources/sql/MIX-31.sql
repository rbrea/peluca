create table PAYMENT_REFUND(
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    COUNTRY_CODE_SITE  varchar(20),
    PRODUCT_TYPE varchar(50),
    CURRENCY_TYPE varchar(50),
    PAYMENT_METHOD varchar(50),
    COLECCTION_CHANNEL varchar(50),
    MERCHANT varchar(50),
    LEGAL_ENTITY_ID bigint,
    primary key (ID));
    
create table PAYMENT_REFUND_AUD(
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
    RULE_START_DATE DATETIME, 
    COUNTRY_CODE_SITE  varchar(20),
    PRODUCT_TYPE varchar(50),
    CURRENCY_TYPE varchar(50),
    PAYMENT_METHOD varchar(50),
    COLECCTION_CHANNEL varchar(50),
    MERCHANT varchar(50),
    LEGAL_ENTITY_ID bigint,
    primary key (ID, REV));
    
    
create table PAYMENT_REFUND_ACTIVE(
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    COUNTRY_CODE_SITE  varchar(20),
    PRODUCT_TYPE varchar(50),
    CURRENCY_TYPE varchar(50),
    PAYMENT_METHOD varchar(50),
    COLECCTION_CHANNEL varchar(50),
    MERCHANT varchar(50),
    LEGAL_ENTITY_ID bigint,
	VERSION integer,
    primary key (ID));
    
create table PAYMENT_REFUND_ACTIVE_AUD(
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
    RULE_START_DATE DATETIME, 
    COUNTRY_CODE_SITE  varchar(20),
    PRODUCT_TYPE varchar(50),
    CURRENCY_TYPE varchar(50),
    PAYMENT_METHOD varchar(50),
    COLECCTION_CHANNEL varchar(50),
    MERCHANT varchar(50),
    LEGAL_ENTITY_ID bigint,
	VERSION integer,
    primary key (ID, REV));