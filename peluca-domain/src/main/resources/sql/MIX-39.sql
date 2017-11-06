create table USER (
	ID bigint not null auto_increment, 
	USER_NAME varchar(50),
    EMAIL varchar(50),
	primary key (ID));
    
create table SUBSCRIPTION_EVENT (
	SUBSCRIPTION_ID bigint not null auto_increment, 
	NOTIFICATION_EVENT varchar(50),
    RULE_NAME varchar(50),
	primary key (SUBSCRIPTION_ID));
    

create table USER_SUBSCRIPTION_EVENT (
	ID bigint,
    SUBSCRIPTION_ID bigint);