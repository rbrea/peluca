use cfa_mixer;

ALTER TABLE PO_LEGAL_ENTITY ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE PO_LEGAL_ENTITY ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;
ALTER TABLE PO_LEGAL_ENTITY ADD COLUMN MODEL_DESCRIPTION varchar(100) AFTER MODEL;
ALTER TABLE PO_LEGAL_ENTITY ADD COLUMN VCC_DESCRIPTION varchar(100) AFTER VCC;

ALTER TABLE PO_LEGAL_ENTITY_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_AUD ADD COLUMN MODEL_DESCRIPTION varchar(100) AFTER MODEL;
ALTER TABLE PO_LEGAL_ENTITY_AUD ADD COLUMN VCC_DESCRIPTION varchar(100) AFTER VCC;

ALTER TABLE PO_LEGAL_ENTITY_ACTIVE ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE ADD COLUMN MODEL_DESCRIPTION varchar(100) AFTER MODEL;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE ADD COLUMN VCC_DESCRIPTION varchar(100) AFTER VCC;

ALTER TABLE PO_LEGAL_ENTITY_ACTIVE_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE_AUD ADD COLUMN MODEL_DESCRIPTION varchar(100) AFTER MODEL;
ALTER TABLE PO_LEGAL_ENTITY_ACTIVE_AUD ADD COLUMN VCC_DESCRIPTION varchar(100) AFTER VCC;

ALTER TABLE PO_LEGAL_ENTITY_PENDING_APPROVAL ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_PENDING_APPROVAL ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;
ALTER TABLE PO_LEGAL_ENTITY_PENDING_APPROVAL ADD COLUMN MODEL_DESCRIPTION varchar(100) AFTER MODEL;
ALTER TABLE PO_LEGAL_ENTITY_PENDING_APPROVAL ADD COLUMN VCC_DESCRIPTION varchar(100) AFTER VCC;

UPDATE PO_LEGAL_ENTITY rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PO_LEGAL_ENTITY_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PO_LEGAL_ENTITY_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PO_LEGAL_ENTITY_ACTIVE rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PO_LEGAL_ENTITY_ACTIVE_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE PO_LEGAL_ENTITY rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE PO_LEGAL_ENTITY_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE PO_LEGAL_ENTITY_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE PO_LEGAL_ENTITY_ACTIVE rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE PO_LEGAL_ENTITY_ACTIVE_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE PO_LEGAL_ENTITY rc
inner join CATALOGUE m on rc.MODEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.MODEL_DESCRIPTION = m.description
where ct.description = 'MODELO';

UPDATE PO_LEGAL_ENTITY_AUD rc
inner join CATALOGUE m on rc.MODEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.MODEL_DESCRIPTION = m.description
where ct.description = 'MODELO';

UPDATE PO_LEGAL_ENTITY_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.MODEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.MODEL_DESCRIPTION = m.description
where ct.description = 'MODELO';

UPDATE PO_LEGAL_ENTITY_ACTIVE rc
inner join CATALOGUE m on rc.MODEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.MODEL_DESCRIPTION = m.description
where ct.description = 'MODELO';

UPDATE PO_LEGAL_ENTITY_ACTIVE_AUD rc
inner join CATALOGUE m on rc.MODEL = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.MODEL_DESCRIPTION = m.description
where ct.description = 'MODELO';

UPDATE PO_LEGAL_ENTITY rc
inner join CATALOGUE m on rc.VCC = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.VCC_DESCRIPTION = m.description
where ct.description = 'VCC';

UPDATE PO_LEGAL_ENTITY_AUD rc
inner join CATALOGUE m on rc.VCC = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.VCC_DESCRIPTION = m.description
where ct.description = 'VCC';

UPDATE PO_LEGAL_ENTITY_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.VCC = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.VCC_DESCRIPTION = m.description
where ct.description = 'VCC';

UPDATE PO_LEGAL_ENTITY_ACTIVE rc
inner join CATALOGUE m on rc.VCC = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.VCC_DESCRIPTION = m.description
where ct.description = 'VCC';

UPDATE PO_LEGAL_ENTITY_ACTIVE_AUD rc
inner join CATALOGUE m on rc.VCC = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.VCC_DESCRIPTION = m.description
where ct.description = 'VCC';

update BROADCAST_SUBSCRIBER
set status = 'NORMAL'
where status is null;

ALTER TABLE OM_LEGAL_ENTITY_PAD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE OM_LEGAL_ENTITY_PAD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;

ALTER TABLE OM_LEGAL_ENTITY_PAD_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE OM_LEGAL_ENTITY_PAD_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;

ALTER TABLE OM_LEGAL_ENTITY_PAD_ACTIVE ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE OM_LEGAL_ENTITY_PAD_ACTIVE ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;

ALTER TABLE OM_LEGAL_ENTITY_PAD_ACTIVE_AUD ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE OM_LEGAL_ENTITY_PAD_ACTIVE_AUD ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;

ALTER TABLE OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL ADD COLUMN PRODUCT_TYPE_DESCRIPTION varchar(100) AFTER PRODUCT_TYPE;
ALTER TABLE OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL ADD COLUMN SELL_TYPE_DESCRIPTION varchar(100) AFTER SELL_TYPE;

UPDATE OM_LEGAL_ENTITY_PAD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PAD_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PAD_ACTIVE rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PAD_ACTIVE_AUD rc
inner join CATALOGUE m on rc.PRODUCT_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.PRODUCT_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE PRODUCTO';

UPDATE OM_LEGAL_ENTITY_PAD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PAD_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PAD_ACTIVE rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';

UPDATE OM_LEGAL_ENTITY_PAD_ACTIVE_AUD rc
inner join CATALOGUE m on rc.SELL_TYPE = m.code
inner join CATALOGUE_TYPE ct on m.catalogue_type_id = ct.id
set rc.SELL_TYPE_DESCRIPTION = m.description
where ct.description = 'TIPO DE VENTA';


update PAYMENT_REFUND
set colecction_channel = 'VINET',
colecction_channel_description = 'Visa Net'
where colecction_channel_description = 'Visa_Net';

update PAYMENT_REFUND_ACTIVE
set colecction_channel = 'VINET',
colecction_channel_description = 'Visa Net'
where colecction_channel_description = 'Visa_Net';


update RULE_SELL_TYPE
set colecction_channel = 'VINET',
colecction_channel_description = 'Visa Net'
where colecction_channel_description = 'Visa_Net';

update RULE_SELL_TYPE
set colecction_channel = 'VINET',
colecction_channel_description = 'Visa Net'
where colecction_channel_description = 'Visa_Net';
