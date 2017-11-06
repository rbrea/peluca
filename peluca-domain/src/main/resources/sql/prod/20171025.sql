use cfa_mixer;

create table CLUSTER_MONITOR (
	ID bigint NOT NULL auto_increment PRIMARY KEY,
	NAME varchar(50),
    LAST_START datetime
);

ALTER TABLE CLUSTER_MONITOR ADD UNIQUE INDEX (NAME);