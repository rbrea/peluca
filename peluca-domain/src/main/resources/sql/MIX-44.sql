use cfa_mixer;

create table MERCHANT_CHARGE (ID bigint not null auto_increment, DESCRIPTION varchar(200), primary key (ID)) ENGINE=InnoDB;
create table MERCHANT_CHARGE_AUD (ID bigint not null, REV integer not null, REVTYPE tinyint, DESCRIPTION varchar(200), primary key (ID, REV)) ENGINE=InnoDB;
create table RULE_CHARGE (ID bigint not null auto_increment, DATE_FROM DATETIME not null, DATE_TO DATETIME not null, DIVIDE_ON_INSTALLMENTS BIT not null, INSTALLMENTS integer not null, LEGAL_ENTITY_ID bigint not null, MERCHANT_CHARGE_ID bigint not null, primary key (ID)) ENGINE=InnoDB;
create table RULE_CHARGE_AUD (ID bigint not null, REV integer not null, REVTYPE tinyint, DATE_FROM DATETIME, DATE_TO DATETIME, DIVIDE_ON_INSTALLMENTS BIT, INSTALLMENTS integer, LEGAL_ENTITY_ID bigint, MERCHANT_CHARGE_ID bigint, primary key (ID, REV)) ENGINE=InnoDB;
alter table MERCHANT_CHARGE add constraint MERCHANT_CHARGE_DESCRIPTION_IDX  unique (DESCRIPTION);
alter table MERCHANT_CHARGE_AUD add constraint FK_icqkv6tonvpmipg3y3v45nehr foreign key (REV) references REVINFO (id);
alter table RULE_CHARGE add constraint RULE_CHARGE_IDX  unique (LEGAL_ENTITY_ID, MERCHANT_CHARGE_ID, DATE_FROM, DATE_TO, INSTALLMENTS, DIVIDE_ON_INSTALLMENTS);
alter table RULE_CHARGE add constraint CHARGE_LEGAL_ENTITY_FK foreign key (LEGAL_ENTITY_ID) references LEGAL_ENTITY (ID);
alter table RULE_CHARGE add constraint CHARGE_MERCHANT_FK foreign key (MERCHANT_CHARGE_ID) references MERCHANT_CHARGE (ID);
alter table RULE_CHARGE_AUD add constraint FK_54xi7fvjb9kqa0om7yfv7n7f6 foreign key (REV) references REVINFO (id);

insert into MERCHANT_CHARGE (description) values ('promo_10_cuotas');
insert into MERCHANT_CHARGE (description) values ('promo_10_cuotas_2');
insert into MERCHANT_CHARGE (description) values ('PROMO_10_N_CUOTAS_2');
insert into MERCHANT_CHARGE (description) values ('af6n');
insert into MERCHANT_CHARGE (description) values ('promo');

    

