create table FICTIONAL_CHARGE(
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    LEGAL_ENTITY_OM varchar(20),
    LEGAL_ENTITY_AR_RF varchar(20),
    FICTIONAL_CHARGE bit,
    primary key (ID));
    
create table FICTIONAL_CHARGE_AUD(
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
    RULE_START_DATE DATETIME, 
    LEGAL_ENTITY_OM varchar(20),
	LEGAL_ENTITY_AR_RF varchar(20),
    FICTIONAL_CHARGE bit,
    primary key (ID, REV));
    
    
create table FICTIONAL_CHARGE_ACTIVE(
	ID bigint not null auto_increment, 
    RULE_START_DATE DATETIME not null, 
    LEGAL_ENTITY_OM varchar(20),
    LEGAL_ENTITY_AR_RF varchar(20),
    FICTIONAL_CHARGE bit,
    VERSION integer,
    primary key (ID));
    
create table FICTIONAL_CHARGE_ACTIVE_AUD(
	ID bigint not null, 
    REV integer not null, 
    REVTYPE tinyint, 
    RULE_START_DATE DATETIME, 
    LEGAL_ENTITY_OM varchar(20),
	LEGAL_ENTITY_AR_RF varchar(20),
    FICTIONAL_CHARGE bit,
    VERSION integer,
    primary key (ID, REV));
    