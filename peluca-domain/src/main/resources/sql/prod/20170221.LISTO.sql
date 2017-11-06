use cfa_mixer;

ALTER TABLE RELEASE_VERSION_LOG ADD COLUMN JIRA_ID varchar(20);

update LEGAL_ENTITY
set start_date = '2016-07-01'
where description = 'Despegar Servicios S.A  de C.V';

update LEGAL_ENTITY
set start_date = '2016-07-01'
where description = 'Despegar.com México S.A de C.V.';

update LEGAL_ENTITY
set start_date = '2016-11-01'
where description = 'DESPEGAR COLOMBIA SAS';

update LEGAL_ENTITY
set start_date = '2017-02-01'
where description = 'Despegar.com Chile SpA';