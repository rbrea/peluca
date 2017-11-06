use cfa_mixer;

Alter table RELEASE_VERSION_LOG drop column HAS_UPDATED_RULE;
Alter table RELEASE_VERSION_LOG add column RULE_STATUS varchar(30) default "EDITION";
alter table RELEASE_VERSION_LOG drop column ACTIVATED;

create table COMMENT (
	ID bigint not null auto_increment, 
    CREATION_DATE varchar(20), 
    TEXT_COMMENT varchar(200), 
    USER varchar(50), 
    RELEASE_VERSION_LOG_ID bigint not null, 
    primary key (ID)) ENGINE=InnoDB
