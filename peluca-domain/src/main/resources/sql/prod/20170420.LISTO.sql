use cfa_mixer;

insert into CATALOGUE_TYPE (DESCRIPTION) values ('MODELO');
insert into CATALOGUE_TYPE (DESCRIPTION) values ('VCC');

insert into CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('NEW','Nuevo',9);
insert into CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('OLD','Viejo',9);

insert into CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('ALL','*',10);
insert into CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('TRUE','Verdadero',10);
insert into CATALOGUE (`CODE`,DESCRIPTION,CATALOGUE_TYPE_ID) values ('FALSE','Falso',10);

create table PO_LEGAL_ENTITY(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
     primary key (ID),
	 constraint IDX_PO_LEGAL_ENTITY unique(MODEL,COUNTRY_CODE_SITE,PRODUCT_TYPE,SELL_TYPE,COUNTRY_CODE_DESTINY,VCC,LEGAL_ENTITY_ID)
);

create table PO_LEGAL_ENTITY_AUD (
	ID bigint not null,
    REV integer not null,
    REVTYPE tinyint,
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    primary key (ID, REV)
);


create table PO_LEGAL_ENTITY_ACTIVE(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID)
);

create table PO_LEGAL_ENTITY_ACTIVE_AUD (
	ID bigint not null,
    REV integer not null,
    REVTYPE tinyint,
	RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
    primary key (ID, REV)
);

create table PO_LEGAL_ENTITY_PENDING_APPROVAL(
	ID bigint not null auto_increment,
    RULE_START_DATE DATETIME,
	COUNTRY_CODE_SITE varchar(20),
    PRODUCT_TYPE varchar(50),
    SELL_TYPE varchar(30),
    COUNTRY_CODE_DESTINY varchar(20),
	MODEL varchar(30),
	VCC varchar(30),
    LEGAL_ENTITY_ID bigint,
    VERSION integer,
     primary key (ID)
);

ALTER TABLE RULE_CHARGE ADD COLUMN MERCHANT_CHARGE_DESCRIPTION varchar(100);
ALTER TABLE RULE_CHARGE_AUD ADD COLUMN MERCHANT_CHARGE_DESCRIPTION varchar(100);

ALTER TABLE RULE_CHARGE_ACTIVE ADD COLUMN MERCHANT_CHARGE_DESCRIPTION varchar(100);
ALTER TABLE RULE_CHARGE_ACTIVE_AUD ADD COLUMN MERCHANT_CHARGE_DESCRIPTION varchar(100);

ALTER TABLE RULE_CHARGE_PENDING_APPROVAL ADD COLUMN MERCHANT_CHARGE_DESCRIPTION varchar(100);

UPDATE RULE_CHARGE rc
inner join CATALOGUE m on rc.merchant_charge_code = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.merchant_charge_description = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_CHARGE_AUD rc
inner join CATALOGUE m on rc.merchant_charge_code = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.merchant_charge_description = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_CHARGE_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.merchant_charge_code = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.merchant_charge_description = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_CHARGE_ACTIVE rc
inner join CATALOGUE m on rc.merchant_charge_code = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.merchant_charge_description = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_CHARGE_ACTIVE_AUD rc
inner join CATALOGUE m on rc.merchant_charge_code = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.merchant_charge_description = m.description
where ct.description = 'MERCHANT';

ALTER TABLE RULE_SELL_TYPE add column PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_AUD add column PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL add column PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE add column PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD add column PRODUCT_TYPE_DESCRIPTION varchar(100);

ALTER TABLE RULE_SELL_TYPE add column ASSISTANCE_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_AUD add column ASSISTANCE_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL add column ASSISTANCE_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE add column ASSISTANCE_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD add column ASSISTANCE_TYPE_DESCRIPTION varchar(100);

ALTER TABLE RULE_SELL_TYPE add column COLECCTION_CHANNEL_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_AUD add column COLECCTION_CHANNEL_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL add column COLECCTION_CHANNEL_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE add column COLECCTION_CHANNEL_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD add column COLECCTION_CHANNEL_DESCRIPTION varchar(100);

ALTER TABLE RULE_SELL_TYPE add column MERCHANT_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_AUD add column MERCHANT_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL add column MERCHANT_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE add column MERCHANT_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD add column MERCHANT_DESCRIPTION varchar(100);

ALTER TABLE RULE_SELL_TYPE add column SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_AUD add column SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_PENDING_APPROVAL add column SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE add column SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE RULE_SELL_TYPE_ACTIVE_AUD add column SELL_TYPE_DESCRIPTION varchar(100);

UPDATE RULE_SELL_TYPE t
inner join CATALOGUE m on t.product_Type = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.product_Type_description = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE RULE_SELL_TYPE_AUD t
inner join CATALOGUE m on t.product_Type = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.product_Type_description = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE RULE_SELL_TYPE_PENDING_APPROVAL t
inner join CATALOGUE m on t.product_Type = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.product_Type_description = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE RULE_SELL_TYPE_ACTIVE t
inner join CATALOGUE m on t.product_Type = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.product_Type_description = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE RULE_SELL_TYPE_ACTIVE_AUD t
inner join CATALOGUE m on t.product_Type = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.product_Type_description = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE RULE_SELL_TYPE t
inner join CATALOGUE m on t.ASSISTANCE_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.ASSISTANCE_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE ASISTENCIA';

UPDATE RULE_SELL_TYPE_AUD t
inner join CATALOGUE m on t.ASSISTANCE_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.ASSISTANCE_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE ASISTENCIA';

UPDATE RULE_SELL_TYPE_PENDING_APPROVAL t
inner join CATALOGUE m on t.ASSISTANCE_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.ASSISTANCE_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE ASISTENCIA';

UPDATE RULE_SELL_TYPE_ACTIVE t
inner join CATALOGUE m on t.ASSISTANCE_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.ASSISTANCE_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE ASISTENCIA';

UPDATE RULE_SELL_TYPE_ACTIVE_AUD t
inner join CATALOGUE m on t.ASSISTANCE_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.ASSISTANCE_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE ASISTENCIA';

UPDATE RULE_SELL_TYPE t
inner join CATALOGUE m on t.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE RULE_SELL_TYPE_AUD t
inner join CATALOGUE m on t.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE RULE_SELL_TYPE_PENDING_APPROVAL t
inner join CATALOGUE m on t.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE RULE_SELL_TYPE_ACTIVE t
inner join CATALOGUE m on t.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE RULE_SELL_TYPE_ACTIVE_AUD t
inner join CATALOGUE m on t.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE RULE_SELL_TYPE t
inner join CATALOGUE m on t.MERCHANT_ID = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_SELL_TYPE_AUD t
inner join CATALOGUE m on t.MERCHANT_ID = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_SELL_TYPE_PENDING_APPROVAL t
inner join CATALOGUE m on t.MERCHANT_ID = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_SELL_TYPE_ACTIVE t
inner join CATALOGUE m on t.MERCHANT_ID = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_SELL_TYPE_ACTIVE_AUD t
inner join CATALOGUE m on t.MERCHANT_ID = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE RULE_SELL_TYPE t
inner join CATALOGUE m on t.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE RULE_SELL_TYPE_AUD t
inner join CATALOGUE m on t.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE RULE_SELL_TYPE_PENDING_APPROVAL t
inner join CATALOGUE m on t.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE RULE_SELL_TYPE_ACTIVE t
inner join CATALOGUE m on t.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE RULE_SELL_TYPE_ACTIVE_AUD t
inner join CATALOGUE m on t.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set t.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

ALTER TABLE PAYMENT_REFUND ADD COLUMN COLECCTION_CHANNEL_DESCRIPTION varchar(100) AFTER COLECCTION_CHANNEL;
ALTER TABLE PAYMENT_REFUND ADD COLUMN CURRENCY_TYPE_DESCRIPTION varchar(100) AFTER CURRENCY_TYPE;
ALTER TABLE PAYMENT_REFUND ADD COLUMN MERCHANT_DESCRIPTION varchar(100) AFTER MERCHANT;
ALTER TABLE PAYMENT_REFUND ADD COLUMN PAYMENT_METHOD_DESCRIPTION varchar(100) AFTER PAYMENT_METHOD;
ALTER TABLE PAYMENT_REFUND ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;

ALTER TABLE PAYMENT_REFUND_AUD ADD COLUMN COLECCTION_CHANNEL_DESCRIPTION varchar(100) AFTER COLECCTION_CHANNEL;
ALTER TABLE PAYMENT_REFUND_AUD ADD COLUMN CURRENCY_TYPE_DESCRIPTION varchar(100) AFTER CURRENCY_TYPE;
ALTER TABLE PAYMENT_REFUND_AUD ADD COLUMN MERCHANT_DESCRIPTION varchar(100) AFTER MERCHANT;
ALTER TABLE PAYMENT_REFUND_AUD ADD COLUMN PAYMENT_METHOD_DESCRIPTION varchar(100) AFTER PAYMENT_METHOD;
ALTER TABLE PAYMENT_REFUND_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;

ALTER TABLE PAYMENT_REFUND_ACTIVE ADD COLUMN COLECCTION_CHANNEL_DESCRIPTION varchar(100) AFTER COLECCTION_CHANNEL;
ALTER TABLE PAYMENT_REFUND_ACTIVE ADD COLUMN CURRENCY_TYPE_DESCRIPTION varchar(100) AFTER CURRENCY_TYPE;
ALTER TABLE PAYMENT_REFUND_ACTIVE ADD COLUMN MERCHANT_DESCRIPTION varchar(100) AFTER MERCHANT;
ALTER TABLE PAYMENT_REFUND_ACTIVE ADD COLUMN PAYMENT_METHOD_DESCRIPTION varchar(100) AFTER PAYMENT_METHOD;
ALTER TABLE PAYMENT_REFUND_ACTIVE ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;

ALTER TABLE PAYMENT_REFUND_ACTIVE_AUD ADD COLUMN COLECCTION_CHANNEL_DESCRIPTION varchar(100) AFTER COLECCTION_CHANNEL;
ALTER TABLE PAYMENT_REFUND_ACTIVE_AUD ADD COLUMN CURRENCY_TYPE_DESCRIPTION varchar(100) AFTER CURRENCY_TYPE;
ALTER TABLE PAYMENT_REFUND_ACTIVE_AUD ADD COLUMN MERCHANT_DESCRIPTION varchar(100) AFTER MERCHANT;
ALTER TABLE PAYMENT_REFUND_ACTIVE_AUD ADD COLUMN PAYMENT_METHOD_DESCRIPTION varchar(100) AFTER PAYMENT_METHOD;
ALTER TABLE PAYMENT_REFUND_ACTIVE_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;

ALTER TABLE PAYMENT_REFUND_PENDING_APPROVAL ADD COLUMN COLECCTION_CHANNEL_DESCRIPTION varchar(100) AFTER COLECCTION_CHANNEL;
ALTER TABLE PAYMENT_REFUND_PENDING_APPROVAL ADD COLUMN CURRENCY_TYPE_DESCRIPTION varchar(100) AFTER CURRENCY_TYPE;
ALTER TABLE PAYMENT_REFUND_PENDING_APPROVAL ADD COLUMN MERCHANT_DESCRIPTION varchar(100) AFTER MERCHANT;
ALTER TABLE PAYMENT_REFUND_PENDING_APPROVAL ADD COLUMN PAYMENT_METHOD_DESCRIPTION varchar(100) AFTER PAYMENT_METHOD;
ALTER TABLE PAYMENT_REFUND_PENDING_APPROVAL ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;


UPDATE PAYMENT_REFUND pr
inner join CATALOGUE m on pr.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE PAYMENT_REFUND pr
inner join CATALOGUE m on pr.CURRENCY_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.CURRENCY_TYPE_DESCRIPTION = m.description
where ct.description = 'MONEDA';

UPDATE PAYMENT_REFUND pr
inner join CATALOGUE m on pr.MERCHANT = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE PAYMENT_REFUND pr
inner join CATALOGUE m on pr.PAYMENT_METHOD = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PAYMENT_METHOD_DESCRIPTION = m.description
where ct.description = 'MEDIO DE PAGO CONTABILIZACION';

UPDATE PAYMENT_REFUND pr
inner join CATALOGUE m on pr.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PAYMENT_REFUND_AUD pr
inner join CATALOGUE m on pr.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE PAYMENT_REFUND_AUD pr
inner join CATALOGUE m on pr.CURRENCY_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.CURRENCY_TYPE_DESCRIPTION = m.description
where ct.description = 'MONEDA';

UPDATE PAYMENT_REFUND_AUD pr
inner join CATALOGUE m on pr.MERCHANT = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE PAYMENT_REFUND_AUD pr
inner join CATALOGUE m on pr.PAYMENT_METHOD = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PAYMENT_METHOD_DESCRIPTION = m.description
where ct.description = 'MEDIO DE PAGO CONTABILIZACION';

UPDATE PAYMENT_REFUND_AUD pr
inner join CATALOGUE m on pr.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PAYMENT_REFUND_ACTIVE pr
inner join CATALOGUE m on pr.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE PAYMENT_REFUND_ACTIVE pr
inner join CATALOGUE m on pr.CURRENCY_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.CURRENCY_TYPE_DESCRIPTION = m.description
where ct.description = 'MONEDA';

UPDATE PAYMENT_REFUND_ACTIVE pr
inner join CATALOGUE m on pr.MERCHANT = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE PAYMENT_REFUND_ACTIVE pr
inner join CATALOGUE m on pr.PAYMENT_METHOD = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PAYMENT_METHOD_DESCRIPTION = m.description
where ct.description = 'MEDIO DE PAGO CONTABILIZACION';

UPDATE PAYMENT_REFUND_ACTIVE pr
inner join CATALOGUE m on pr.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PAYMENT_REFUND_ACTIVE_AUD pr
inner join CATALOGUE m on pr.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE PAYMENT_REFUND_ACTIVE_AUD pr
inner join CATALOGUE m on pr.CURRENCY_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.CURRENCY_TYPE_DESCRIPTION = m.description
where ct.description = 'MONEDA';

UPDATE PAYMENT_REFUND_ACTIVE_AUD pr
inner join CATALOGUE m on pr.MERCHANT = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE PAYMENT_REFUND_ACTIVE_AUD pr
inner join CATALOGUE m on pr.PAYMENT_METHOD = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PAYMENT_METHOD_DESCRIPTION = m.description
where ct.description = 'MEDIO DE PAGO CONTABILIZACION';

UPDATE PAYMENT_REFUND_ACTIVE_AUD pr
inner join CATALOGUE m on pr.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PAYMENT_REFUND_PENDING_APPROVAL pr
inner join CATALOGUE m on pr.COLECCTION_CHANNEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.COLECCTION_CHANNEL_DESCRIPTION = m.description
where ct.description = 'CANAL DE COBRO';

UPDATE PAYMENT_REFUND_PENDING_APPROVAL pr
inner join CATALOGUE m on pr.CURRENCY_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.CURRENCY_TYPE_DESCRIPTION = m.description
where ct.description = 'MONEDA';

UPDATE PAYMENT_REFUND_PENDING_APPROVAL pr
inner join CATALOGUE m on pr.MERCHANT = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.MERCHANT_DESCRIPTION = m.description
where ct.description = 'MERCHANT';

UPDATE PAYMENT_REFUND_PENDING_APPROVAL pr
inner join CATALOGUE m on pr.PAYMENT_METHOD = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PAYMENT_METHOD_DESCRIPTION = m.description
where ct.description = 'MEDIO DE PAGO CONTABILIZACION';

UPDATE PAYMENT_REFUND_PENDING_APPROVAL pr
inner join CATALOGUE m on pr.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set pr.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

ALTER TABLE OM_LEGAL_ENTITY_PP ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE OM_LEGAL_ENTITY_PP_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100);

ALTER TABLE OM_LEGAL_ENTITY_PP_PENDING_APPROVAL ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100);

ALTER TABLE OM_LEGAL_ENTITY_PP_ACTIVE ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100);
ALTER TABLE OM_LEGAL_ENTITY_PP_ACTIVE_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100);

UPDATE OM_LEGAL_ENTITY_PP rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PP_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PP_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PP_ACTIVE rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PP_ACTIVE_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

ALTER TABLE OM_LEGAL_ENTITY_PP ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE OM_LEGAL_ENTITY_PP_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100);

ALTER TABLE OM_LEGAL_ENTITY_PP_PENDING_APPROVAL ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100);

ALTER TABLE OM_LEGAL_ENTITY_PP_ACTIVE ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100);
ALTER TABLE OM_LEGAL_ENTITY_PP_ACTIVE_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100);

UPDATE OM_LEGAL_ENTITY_PP rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PP_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PP_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PP_ACTIVE rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PP_ACTIVE_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';


insert into CATALOGUE (code, description, catalogue_type_id) values ('VPN_Visa_Despegar', 'VPN_Visa_Despegar', 2);

insert into CATALOGUE (code, description, catalogue_type_id) values ('Redeban_Despegar', 'Redeban_Despegar', 2);
insert into CATALOGUE (code, description, catalogue_type_id) values ('Visa_Net', 'Visa_Net', 2);

insert into CATALOGUE (code, description, catalogue_type_id) values ('Vpos_Despegar', 'Vpos_Despegar', 2);

insert into CATALOGUE (code, description, catalogue_type_id) values ('WorldPay', 'WorldPay', 2);
insert into CATALOGUE (code, description, catalogue_type_id) values ('WorldPay1', 'WorldPay1', 2);

insert into CATALOGUE (code, description, catalogue_type_id) values ('Transbank_Despegar', 'Transbank_Despegar', 2);
insert into CATALOGUE (code, description, catalogue_type_id) values ('Webpos_Despegar', 'Webpos_Despegar', 2);

insert into CATALOGUE (code, description, catalogue_type_id) values ('LaposWeb-Despegar', 'LaposWeb-Despegar', 2);

update RULE_SELL_TYPE
set COLECCTION_CHANNEL_DESCRIPTION = COLECCTION_CHANNEL
where colecction_channel_description is null;

update PAYMENT_REFUND
set COLECCTION_CHANNEL_DESCRIPTION = COLECCTION_CHANNEL
where colecction_channel_description is null;

update RULE_SELL_TYPE_ACTIVE
set COLECCTION_CHANNEL_DESCRIPTION = COLECCTION_CHANNEL
where colecction_channel_description is null;

update PAYMENT_REFUND_ACTIVE
set COLECCTION_CHANNEL_DESCRIPTION = COLECCTION_CHANNEL
where colecction_channel_description is null;
