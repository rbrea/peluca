use cfa_mixer;

ALTER TABLE RULE_SELL_TYPE ADD COLUMN COUNTRY_CODE_DESTINY VARCHAR(20) NULL DEFAULT "*" AFTER COUNTRY_CODE_SITE;
ALTER TABLE RULE_SELL_TYPE_AUD ADD COLUMN COUNTRY_CODE_DESTINY VARCHAR(20) NULL DEFAULT "*" AFTER COUNTRY_CODE_SITE;
ALTER TABLE RULE_SELL_TYPE_ACTIVE ADD COLUMN COUNTRY_CODE_DESTINY VARCHAR(20) NULL DEFAULT "*" AFTER COUNTRY_CODE_SITE;
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD ADD COLUMN COUNTRY_CODE_DESTINY VARCHAR(20) NULL DEFAULT "*" AFTER COUNTRY_CODE_SITE;
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL ADD COLUMN COUNTRY_CODE_DESTINY VARCHAR(20) NULL DEFAULT "*" AFTER COUNTRY_CODE_SITE;

ALTER TABLE `RULE_SELL_TYPE` 
DROP INDEX `IDX_RULE_SELL_TYPE` ,
ADD UNIQUE INDEX `IDX_RULE_SELL_TYPE` (`PRODUCT_TYPE` ASC, `COUNTRY_CODE_SITE` ASC, `COUNTRY_CODE_PROVIDER` ASC, `ASSISTANCE_TYPE` ASC, `AFFILIATED_AGENCY` ASC, `RULE_START_DATE` ASC, `COUNTRY_CODE_DESTINY` ASC);

create table CATALOGUE_TYPE (
	ID bigint not null auto_increment, 
	DESCRIPTION varchar(255),
    primary key (ID));

create table CATALOGUE_TYPE_AUD (
	ID bigint not null,
	REV integer not null,
    REVTYPE tinyint,
	DESCRIPTION varchar(255),
    primary key (ID,REV));

create table CATALOGUE(
	ID bigint not null auto_increment,
    CODE varchar(100),
	DESCRIPTION varchar(255),
    CATALOGUE_TYPE_ID bigint not null,
	primary key (ID),
	constraint FK_CATALOGUE_TYPE foreign key (CATALOGUE_TYPE_ID) references CATALOGUE_TYPE(ID));

create table CATALOGUE_AUD(
	ID bigint not null,
	REV integer not null,
    REVTYPE tinyint,
    CODE varchar(100),
	DESCRIPTION varchar(255),
    CATALOGUE_TYPE_ID bigint not null,
	primary key (ID,REV));
	
alter table RULE_SELL_TYPE drop index IDX_RULE_SELL_TYPE;
	
insert into CATALOGUE_TYPE values(1, 'MERCHANT');

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('10731834','10731834',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('11729506','11729506',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('12436978','12436978',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('12444881','12444881',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('12445037','12445037',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('12819595','12819595',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('12820486','12820486',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('13174313','13174313',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('13429089','13429089',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('14152755','14152755',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('14153761','14153761',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('14569404','14569404',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('14606479','14606479',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('15870165','15870165',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('16026015','16026015',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('17377771','17377771',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('18080945','18080945',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('18502443','18502443',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('1855964','1855964',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('19156140','19156140',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('19749001','19749001',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('20612461','20612461',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('20899266','20899266',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('2903466','2903466',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('3360856','3360856',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('5663042','5663042',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('5849831','5849831',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6143499','6143499',1);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('2423','2423',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('5820','5820',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6007','6007',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6008','6008',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6012','6012',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6173','6173',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6174','6174',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6175','6175',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6178','6178',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('6954','6954',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7232','7232',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7233','7233',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7234','7234',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7237','7237',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7238','7238',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7239','7239',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7240','7240',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8048','8048',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8120','8120',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8524','8524',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8525','8525',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8527','8527',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8528','8528',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8529','8529',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7410228','7410228',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7529563','7529563',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('8172835','8172835',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('9350744380','9350744380',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('9352691613','9352691613',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Aerolinea','Aerolinea',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('af6n','af6n',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('afil_hoteles','afil_hoteles',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('afil_vuelos','afil_vuelos',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('despe_hoteles','despe_hoteles',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('despe_ona','despe_ona',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('Despegar','Despegar',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DESPEGARMOTOUSD','DESPEGARMOTOUSD',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DESPEGARUSD','DESPEGARUSD',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DESPEGARWPH1BR','DESPEGARWPH1BR',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('DESPEGARWPHUSA1','DESPEGARWPHUSA1',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('gc_despegar','gc_despegar',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('promo','promo',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('promo_10_cuotas','promo_10_cuotas',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('promo_10_cuotas_2','promo_10_cuotas_2',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PROMO_10_N_CUOTAS_2','PROMO_10_N_CUOTAS_2',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('s1_Despegar1','s1_Despegar1',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('s1_Despegar2','s1_Despegar2',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('s1_Especial','s1_Especial',1);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('1125','1125',1);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('7243','7243',1);

alter table RULE_CHARGE drop foreign key CHARGE_MERCHANT_FK;
alter table RULE_CHARGE ADD CONSTRAINT CATALOGUE_FK FOREIGN KEY (MERCHANT_CHARGE_ID) REFERENCES CATALOGUE(ID);

delete from RULE_CHARGE_AUD;
delete from RULE_CHARGE_ACTIVE_AUD;


