use cfa_mixer;

alter table RULE_CHARGE add column MERCHANT_CHARGE_CODE varchar(60);
alter table RULE_CHARGE_AUD add column MERCHANT_CHARGE_CODE varchar(60);

alter table RULE_CHARGE_ACTIVE add column MERCHANT_CHARGE_CODE varchar(60);
alter table RULE_CHARGE_ACTIVE_AUD add column MERCHANT_CHARGE_CODE varchar(60);

alter table RULE_CHARGE_PENDING_APPROVAL add column MERCHANT_CHARGE_CODE varchar(60);

alter table RULE_CHARGE_ACTIVE ADD CONSTRAINT MERCHANT_CHARGE_ACTIVE_FK FOREIGN KEY (MERCHANT_CHARGE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_CHARGE_PENDING_APPROVAL ADD CONSTRAINT MERCHANT_CHARGE_PENDING_APPROVAL_FK FOREIGN KEY (MERCHANT_CHARGE_ID) REFERENCES CATALOGUE(ID);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BOLETO_BANCARIO','Boleto Bancario',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CASH','Cash',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CHECK','Cheque',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('COUPON','Cupon',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DEPOSIT','Deposito',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SAFETY_PAY','SafetyPay',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CREDIT_CARD','Tarjeta de Credito',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DEBIT_CARD','Tarjeta de Debito',8);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WESTERN_UNION','Western Union',8);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PAB','Balboa - Panama',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VEF','Bolivares Fuertes',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BOB','Boliviano - Bolivia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CRC','Colon - Costa Rica',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SVC','Colon - Salvador',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('XPF','Comptoirs Francais',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('NIO','Cordoba - Nicaragua',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DKK','Corona - Dinamarca',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SEK','Corona - Suecia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CAD','Dolar - Canada',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('USD','Dolares',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PTE','Escudo - Portugal',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EUR','Euros',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AWG','Florin - Aruba',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('HUF','Florin - Hungaro',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CHF','Franco - Suiza',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FRF','Franco Frances',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PYG','Guarani - Paraguay',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EKK','Kroon - Estonia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('HRK','Kuna - Croacia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('HNL','Lempira - Honduras',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EGP','Libra - Egipto',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GBP','Libra - Inglaterra',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('IEP','Libra - Irlanda',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ITL','Lira - Italia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TRL','Lira - Turquia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FIM','Marco - Finlandia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DEM','Marco Aleman',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MIL','Millas',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PEN','Nuevo Sol - Peru',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PTA','Pesetas',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DOP','Peso  - Dominicano',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CUP','Peso - Cuba',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ARS','Pesos - Argentina',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CLP','Pesos - Chile',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('COP','Pesos - Colombia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('UYU','Pesos - Uruguay',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MXN','Pesos Mexicanos',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GTQ','Quetzal - Guatemala',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ZAR','Rand - Sudafrica',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BRL','Reales',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RUB','Rublo - Rusia',7);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ECS','Sucre - Ecuador',7);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DE','Alemania',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AR','Argentina',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AU','Australia',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BO','Bolivia',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BR','Brasil',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CA','Canada',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CL','Chile',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CO','Colombia',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CR','Costa Rica',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('EC','Ecuador',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SV','El Salvador',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ES','España',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PH','Filipinas',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FR','Francia',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GT','Guatemala',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('HN','Honduras',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('IN','India',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('IE','Irlanda',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('IT','Italia',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('JM','Jamaica',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MX','Mexico',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('NI','Nicaragua',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('NZ','Nueva Zelanda',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PA','Panama',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PY','Paraguay',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTL','Pais Internacional',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PE','Peru',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PT','Portugal',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PR','Puerto Rico',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GB','Reino Unido',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DO','Republica Dominicana',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SG','Singapur',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('UY','Uruguay',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('US','USA',4);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VE','Venezuela',4);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',6);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DOMESTIC','Domestico',6);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTERNATIONAL','Internacional',6);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',5);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DOMESTIC','Domestico',5);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTERNATIONAL','Internacional',5);

ALTER TABLE RULE_SELL_TYPE ADD COLUMN PRODUCT_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN PRODUCT_TYPE_ID bigint(20);

ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN PRODUCT_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN PRODUCT_TYPE_ID bigint(20);

ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN PRODUCT_TYPE_ID bigint(20);

alter table RULE_SELL_TYPE ADD CONSTRAINT PRODUCT_TYPE_FK FOREIGN KEY (PRODUCT_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_ACTIVE ADD CONSTRAINT PRODUCT_TYPE_ACTIVE_FK FOREIGN KEY (PRODUCT_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_PENDING_APPROVAL ADD CONSTRAINT PRODUCT_TYPE_PENDING_FK FOREIGN KEY (PRODUCT_TYPE_ID) REFERENCES CATALOGUE(ID);

delete from CATALOGUE where code = '7243' and catalogue_type_id = 1;
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7243','7243',1);
delete from CATALOGUE where code = 'WDS' and catalogue_type_id = 2;
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WDS','Worldspan',2);

ALTER TABLE CATALOGUE ADD UNIQUE INDEX CODE_IDX (CODE, CATALOGUE_TYPE_ID);

ALTER TABLE RULE_SELL_TYPE ADD COLUMN MERCHANT_FK_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN MERCHANT_FK_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN MERCHANT_FK_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN MERCHANT_FK_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN MERCHANT_FK_ID bigint(20);

alter table RULE_SELL_TYPE ADD CONSTRAINT MERCHANT_FK FOREIGN KEY (MERCHANT_FK_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_ACTIVE ADD CONSTRAINT MERCHANT_ACTIVE_FK FOREIGN KEY (MERCHANT_FK_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_PENDING_APPROVAL ADD CONSTRAINT MERCHANT_PENDING_FK FOREIGN KEY (MERCHANT_FK_ID) REFERENCES CATALOGUE(ID);

ALTER TABLE RULE_SELL_TYPE ADD COLUMN SELL_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN SELL_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN SELL_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN SELL_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN SELL_TYPE_ID bigint(20);

alter table RULE_SELL_TYPE ADD CONSTRAINT SELL_TYPE_FK FOREIGN KEY (SELL_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_ACTIVE ADD CONSTRAINT SELL_TYPE_ACTIVE_FK FOREIGN KEY (SELL_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_PENDING_APPROVAL ADD CONSTRAINT SELL_TYPE_PENDING_FK FOREIGN KEY (SELL_TYPE_ID) REFERENCES CATALOGUE(ID);

ALTER TABLE RULE_SELL_TYPE ADD COLUMN ASSISTANCE_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN ASSISTANCE_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN ASSISTANCE_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN ASSISTANCE_TYPE_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN ASSISTANCE_TYPE_ID bigint(20);

alter table RULE_SELL_TYPE ADD CONSTRAINT ASSISTANCE_TYPE_FK FOREIGN KEY (ASSISTANCE_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_ACTIVE ADD CONSTRAINT ASSISTANCE_TYPE_ACTIVE_FK FOREIGN KEY (ASSISTANCE_TYPE_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_PENDING_APPROVAL ADD CONSTRAINT ASSISTANCE_TYPE_PENDING_FK FOREIGN KEY (ASSISTANCE_TYPE_ID) REFERENCES CATALOGUE(ID);

ALTER TABLE RULE_SELL_TYPE ADD COLUMN COLLECTION_CHANNEL_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN COLLECTION_CHANNEL_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN COLLECTION_CHANNEL_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN COLLECTION_CHANNEL_ID bigint(20);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN COLLECTION_CHANNEL_ID bigint(20);

alter table RULE_SELL_TYPE ADD CONSTRAINT COLLECTION_CHANNEL_FK FOREIGN KEY (COLLECTION_CHANNEL_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_ACTIVE ADD CONSTRAINT COLLECTION_CHANNEL_ACTIVE_FK FOREIGN KEY (COLLECTION_CHANNEL_ID) REFERENCES CATALOGUE(ID);
alter table RULE_SELL_TYPE_PENDING_APPROVAL ADD CONSTRAINT COLLECTION_CHANNEL_PENDING_FK FOREIGN KEY (COLLECTION_CHANNEL_ID) REFERENCES CATALOGUE(ID);

delete from RULE_SELL_TYPE;
delete from RULE_SELL_TYPE_AUD;
delete from RULE_SELL_TYPE_ACTIVE;
delete from RULE_SELL_TYPE_ACTIVE_AUD;
delete from RULE_SELL_TYPE_PENDING_APPROVAL;


insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('LaposWeb-Despegar','LaposWeb-Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Redeban_Despegar','Redeban_Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Transbank_Despegar','Transbank_Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VPN_Visa_Despegar','VPN_Visa_Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Visa_Net','Visa_Net',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Vpos_Despegar','Vpos_Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Webpos_Despegar','Webpos_Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WorldPay','WorldPay',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WorldPay1','WorldPay1',2);

truncate table RULE_CHARGE_ACTIVE;
truncate table RULE_CHARGE_ACTIVE_AUD;
truncate table RULE_CHARGE_PENDING_APPROVAL;
truncate table RULE_CHARGE_AUD;
truncate table RULE_CHARGE;
