use cfa_mixer;

ALTER TABLE FICTIONAL_CHARGE_AUD
CHANGE COLUMN RULE_START_DATE RULE_START_DATE DATETIME NULL DEFAULT NULL ;

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

update RULE_SELL_TYPE_ACTIVE
set colecction_channel = 'VINET',
colecction_channel_description = 'Visa Net'
where colecction_channel_description = 'Visa_Net';