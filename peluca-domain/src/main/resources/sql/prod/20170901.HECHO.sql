use cfa_mixer;

alter table LEGAL_ENTITY add column COUNTRY_CODE varchar(10);
alter table LEGAL_ENTITY_AUD add column COUNTRY_CODE varchar(10);

update LEGAL_ENTITY l
inner join COUNTRY c on l.country_id = c.id
set l.country_code = c.code;
