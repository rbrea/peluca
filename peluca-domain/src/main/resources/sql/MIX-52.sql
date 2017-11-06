use cfa_mixer;

alter table LEGAL_ENTITY add column START_DATE date default '2016-01-01 00:00:00';
alter table LEGAL_ENTITY_AUD add column START_DATE date;