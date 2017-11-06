use cfa_mixer;

alter table PROVIDER_CODE_RULE add column COUNTRY_SITE varchar(50);
alter table PROVIDER_CODE_RULE add column FLIGHT_ITEM varchar(50);
alter table PROVIDER_CODE_RULE_AUD add column COUNTRY_SITE varchar(50);
alter table PROVIDER_CODE_RULE_AUD add column FLIGHT_ITEM varchar(50);

alter table PROVIDER_CODE_RULE_ACTIVE add column COUNTRY_SITE varchar(50);
alter table PROVIDER_CODE_RULE_ACTIVE add column FLIGHT_ITEM varchar(50);
alter table PROVIDER_CODE_RULE_ACTIVE_AUD add column COUNTRY_SITE varchar(50);
alter table PROVIDER_CODE_RULE_ACTIVE_AUD add column FLIGHT_ITEM varchar(50);

alter table PROVIDER_CODE_RULE_PENDING_APPROVAL add column COUNTRY_SITE varchar(50);
alter table PROVIDER_CODE_RULE_PENDING_APPROVAL add column FLIGHT_ITEM varchar(50);

insert into CATALOGUE_TYPE (id, description) values(16, 'ITEM DE VUELO');

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MARKUP','Markup', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RATE','Rate', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DU','DU', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CCDU','CCDU', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EXTRA','Extra', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DESC','Descuento', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AIRLINE.PENALTY','Penalidad Aerolinea', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CARGOADM','Cargo Administrativo', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OTHER.CHARGES.CANCEL','OTHER.CHARGES.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MARKUP.CANCEL','MARKUP.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OVER','Over', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EXTRA.CANCEL','EXTRA.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FARE','Tarifa', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FARE.ZERO','Diferencia de tarifa cero', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AGEN.COM.CANCEL','AGEN.COM.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('COM','Comision', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OVER.CANCEL','OVER.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FARE_DIFFERENCE','Diferencia de tarifa', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('COM.CANCEL','COM.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FEE.CANCEL','FEE.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DU.CANCEL','DU.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CARGOADM.CANCEL','CARGOADM.CANCEL', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CCDU.PROVISION','CCDU.PROVISION', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('NEGATIVE.DIFFERENCE','NEGATIVE.DIFFERENCE', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OTHER_CHARGES','Otros Cargos', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTFIN.FEE','Interes Financiero de Fee', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTFIN.FARE','Interes Financiero de Tarifa', 16);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FEE','Fee', 16);
