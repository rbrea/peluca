use cfa_mixer;

alter table RULE_SELL_TYPE drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_AUD drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_ACTIVE drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column SOURCE_SYSTEM_NUMBER;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column SOURCE_SYSTEM_NUMBER;

alter table RULE_SELL_TYPE drop column PREPAYMENT;
alter table RULE_SELL_TYPE_AUD drop column PREPAYMENT;
alter table RULE_SELL_TYPE_ACTIVE drop column PREPAYMENT;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column PREPAYMENT;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column PREPAYMENT;

alter table RULE_SELL_TYPE drop column SUPPLIER;
alter table RULE_SELL_TYPE_AUD drop column SUPPLIER;
alter table RULE_SELL_TYPE_ACTIVE drop column SUPPLIER;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column SUPPLIER;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column SUPPLIER;

alter table RULE_SELL_TYPE drop column GATEWAY;
alter table RULE_SELL_TYPE_AUD drop column GATEWAY;
alter table RULE_SELL_TYPE_ACTIVE drop column GATEWAY;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column GATEWAY;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column GATEWAY;

alter table RULE_SELL_TYPE add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column CHANNEL varchar(50) default "ALL";

alter table RULE_SELL_TYPE add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column COLECCTION_CHANNEL varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column COLECCTION_CHANNEL varchar(50) default "ALL";

alter table RULE_SELL_TYPE add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_AUD add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_ACTIVE_AUD add column MERCHANT_ID varchar(50) default "ALL";
alter table RULE_SELL_TYPE_PENDING_APPROVAL add column MERCHANT_ID varchar(50) default "ALL";