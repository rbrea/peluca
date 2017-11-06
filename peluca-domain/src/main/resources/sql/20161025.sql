use cfa_mixer;

create table BROADCAST_SUBSCRIBER (ID bigint not null auto_increment, CREATED_BY varchar(40), CREATED_DATE DATETIME, UPDATED_BY varchar(40), UPDATED_DATE DATETIME, APP_NAME varchar(255), CALLBACK_URL varchar(255), STATUS varchar(255), SUBSCRIBER_TYPE varchar(255), primary key (ID)) ENGINE=InnoDB;
alter table BROADCAST_SUBSCRIBER add constraint IDX_SUBSCRIBER  unique (SUBSCRIBER_TYPE, APP_NAME);
