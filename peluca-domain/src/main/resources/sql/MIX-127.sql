use cfa_mixer;

ALTER TABLE LEGAL_ENTITY ADD COLUMN OPERATIONAL_TRX BIT DEFAULT 0;
ALTER TABLE LEGAL_ENTITY_AUD ADD COLUMN OPERATIONAL_TRX BIT DEFAULT 0;