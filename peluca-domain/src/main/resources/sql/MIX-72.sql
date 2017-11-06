insert into cfa_mixer.CATALOGUE_TYPE (DESCRIPTION) values ('MODELO');
insert into cfa_mixer.CATALOGUE_TYPE (DESCRIPTION) values ('VCC');

insert into cfa_mixer.CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('NEW','Nuevo',9);
insert into cfa_mixer.CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('OLD','Viejo',9);

insert into cfa_mixer.CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('ALL','*',10);
insert into cfa_mixer.CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('TRUE','Verdadero',10);
insert into cfa_mixer.CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('FALSE','Falso',10);

use cfa_mixer;

create table PO_LEGAL_ENTITY(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
     primary key (ID),
	 constraint IDX_PO_LEGAL_ENTITY unique(MODEL,COUNTRY_CODE_SITE,PRODUCT_TYPE,SELL_TYPE,COUNTRY_CODE_DESTINY,VCC,LEGAL_ENTITY_ID)
);

create table PO_LEGAL_ENTITY_AUD (
	ID bigint not null,
    REV integer not null,
    REVTYPE tinyint,
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    primary key (ID, REV)
);


create table PO_LEGAL_ENTITY_ACTIVE(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID)
);

create table PO_LEGAL_ENTITY_ACTIVE_AUD (
	ID bigint not null,
    REV integer not null,
    REVTYPE tinyint,
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
    primary key (ID, REV)
);

create table PO_LEGAL_ENTITY_PENDING_APPROVAL(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID)
);