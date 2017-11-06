use cfa_mixer;

create table PRODUCT_TYPE (ID bigint not null auto_increment, DESCRIPTION varchar(200), primary key (ID)) ENGINE=InnoDB;
create table PRODUCT_TYPE_AUD (ID bigint not null, REV integer not null, REVTYPE tinyint, description varchar(255), primary key (ID, REV)) ENGINE=InnoDB;

create table RULE_SELL_TYPE (ID bigint not null auto_increment, RULE_START_DATE DATETIME not null, AFFILIATED_AGENCY varchar(30), ASSISTANCE_TYPE varchar(30), COUNTRY_CODE_PROVIDER varchar(20), COUNTRY_CODE_SITE varchar(20), GATEWAY varchar(100), PREPAYMENT varchar(30), PRODUCT_TYPE varchar(50), SELL_TYPE varchar(30), SOURCE_SYSTEM_NUMBER varchar(100), SUPPLIER varchar(100), primary key (ID)) ENGINE=InnoDB;
create table RULE_SELL_TYPE_AUD (ID bigint not null, REV integer not null, REVTYPE tinyint, RULE_START_DATE DATETIME, AFFILIATED_AGENCY varchar(30), ASSISTANCE_TYPE varchar(30), COUNTRY_CODE_PROVIDER varchar(20), COUNTRY_CODE_SITE varchar(20), GATEWAY varchar(100), PREPAYMENT varchar(30), PRODUCT_TYPE varchar(50), SELL_TYPE varchar(30), SOURCE_SYSTEM_NUMBER varchar(100), SUPPLIER varchar(100), primary key (ID, REV)) ENGINE=InnoDB;

alter table RULE_SELL_TYPE add constraint IDX_RULE_SELL_TYPE  unique (PRODUCT_TYPE, COUNTRY_CODE_SITE, COUNTRY_CODE_PROVIDER, SOURCE_SYSTEM_NUMBER, ASSISTANCE_TYPE, SUPPLIER, GATEWAY, AFFILIATED_AGENCY, PREPAYMENT, RULE_START_DATE);

alter table PRODUCT_TYPE_AUD add constraint FK_5lhkufhnac0ml8qya9pax9gc5 foreign key (REV) references REVINFO (id);

alter table RULE_SELL_TYPE_AUD add constraint FK_8wx7ccykrmicoljc8ebe3f6d0 foreign key (REV) references REVINFO (id);
