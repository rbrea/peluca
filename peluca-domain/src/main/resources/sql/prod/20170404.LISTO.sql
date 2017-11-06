use cfa_mixer;

ALTER TABLE RULE_CHARGE ADD CONSTRAINT R_CHARGE_IDX UNIQUE (LEGAL_ENTITY_ID,MERCHANT_CHARGE_CODE,DATE_FROM,DATE_TO,INSTALLMENTS,DIVIDE_ON_INSTALLMENTS);
alter table RULE_CHARGE drop index RULE_CHARGE_IDX;
ALTER TABLE RULE_CHARGE ADD CONSTRAINT RULE_CHARGE_IDX UNIQUE (LEGAL_ENTITY_ID,MERCHANT_CHARGE_CODE,DATE_FROM,DATE_TO,INSTALLMENTS,DIVIDE_ON_INSTALLMENTS);
alter table RULE_CHARGE drop index R_CHARGE_IDX;

alter table RULE_CHARGE drop foreign key CATALOGUE_FK;
alter table RULE_CHARGE drop column MERCHANT_CHARGE_ID;
alter table RULE_CHARGE_AUD drop column MERCHANT_CHARGE_ID;

alter table RULE_CHARGE_ACTIVE drop foreign key MERCHANT_CHARGE_ACTIVE_FK;
alter table RULE_CHARGE_ACTIVE drop column MERCHANT_CHARGE_ID;
alter table RULE_CHARGE_ACTIVE_AUD drop column MERCHANT_CHARGE_ID;

alter table RULE_CHARGE_PENDING_APPROVAL drop foreign key MERCHANT_CHARGE_PENDING_APPROVAL_FK;
alter table RULE_CHARGE_PENDING_APPROVAL drop column MERCHANT_CHARGE_ID;

alter table RULE_SELL_TYPE drop foreign key PRODUCT_TYPE_FK;
alter table RULE_SELL_TYPE drop column PRODUCT_TYPE_ID;
alter table RULE_SELL_TYPE_AUD drop column PRODUCT_TYPE_ID;

alter table RULE_SELL_TYPE_ACTIVE drop foreign key PRODUCT_TYPE_ACTIVE_FK;
alter table RULE_SELL_TYPE_ACTIVE drop column PRODUCT_TYPE_ID;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column PRODUCT_TYPE_ID;

alter table RULE_SELL_TYPE_PENDING_APPROVAL drop foreign key PRODUCT_TYPE_PENDING_FK;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column PRODUCT_TYPE_ID;


alter table RULE_SELL_TYPE drop foreign key MERCHANT_FK;
alter table RULE_SELL_TYPE drop column MERCHANT_FK_ID;
alter table RULE_SELL_TYPE_AUD drop column MERCHANT_FK_ID;

alter table RULE_SELL_TYPE_ACTIVE drop foreign key MERCHANT_ACTIVE_FK;
alter table RULE_SELL_TYPE_ACTIVE drop column MERCHANT_FK_ID;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column MERCHANT_FK_ID;

alter table RULE_SELL_TYPE_PENDING_APPROVAL drop foreign key MERCHANT_PENDING_FK;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column MERCHANT_FK_ID;

alter table RULE_SELL_TYPE drop foreign key SELL_TYPE_FK;
alter table RULE_SELL_TYPE drop column SELL_TYPE_ID;
alter table RULE_SELL_TYPE_AUD drop column SELL_TYPE_ID;

alter table RULE_SELL_TYPE_ACTIVE drop foreign key SELL_TYPE_ACTIVE_FK;
alter table RULE_SELL_TYPE_ACTIVE drop column SELL_TYPE_ID;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column SELL_TYPE_ID;

alter table RULE_SELL_TYPE_PENDING_APPROVAL drop foreign key SELL_TYPE_PENDING_FK;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column SELL_TYPE_ID;

alter table RULE_SELL_TYPE drop foreign key ASSISTANCE_TYPE_FK;
alter table RULE_SELL_TYPE drop column ASSISTANCE_TYPE_ID;
alter table RULE_SELL_TYPE_AUD drop column ASSISTANCE_TYPE_ID;

alter table RULE_SELL_TYPE_ACTIVE drop foreign key ASSISTANCE_TYPE_ACTIVE_FK;
alter table RULE_SELL_TYPE_ACTIVE drop column ASSISTANCE_TYPE_ID;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column ASSISTANCE_TYPE_ID;

alter table RULE_SELL_TYPE_PENDING_APPROVAL drop foreign key ASSISTANCE_TYPE_PENDING_FK;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column ASSISTANCE_TYPE_ID;

alter table RULE_SELL_TYPE drop foreign key COLLECTION_CHANNEL_FK;
alter table RULE_SELL_TYPE drop column COLLECTION_CHANNEL_ID;
alter table RULE_SELL_TYPE_AUD drop column COLLECTION_CHANNEL_ID;

alter table RULE_SELL_TYPE_ACTIVE drop foreign key COLLECTION_CHANNEL_ACTIVE_FK;
alter table RULE_SELL_TYPE_ACTIVE drop column COLLECTION_CHANNEL_ID;
alter table RULE_SELL_TYPE_ACTIVE_AUD drop column COLLECTION_CHANNEL_ID;

alter table RULE_SELL_TYPE_PENDING_APPROVAL drop foreign key COLLECTION_CHANNEL_PENDING_FK;
alter table RULE_SELL_TYPE_PENDING_APPROVAL drop column COLLECTION_CHANNEL_ID;

delete from RULE_SELL_TYPE;
delete from RULE_SELL_TYPE_AUD;
delete from RULE_SELL_TYPE_PENDING_APPROVAL;
delete from RULE_SELL_TYPE_ACTIVE;
delete from RULE_SELL_TYPE_ACTIVE_AUD;

delete from OM_LEGAL_ENTITY_PAD;
delete from OM_LEGAL_ENTITY_PAD_AUD;
delete from OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL;
delete from OM_LEGAL_ENTITY_PAD_ACTIVE;
delete from OM_LEGAL_ENTITY_PAD_ACTIVE_AUD;

delete from PAYMENT_REFUND;
delete from PAYMENT_REFUND_AUD;
delete from PAYMENT_REFUND_PENDING_APPROVAL;
delete from PAYMENT_REFUND_ACTIVE;
delete from PAYMENT_REFUND_ACTIVE_AUD;

