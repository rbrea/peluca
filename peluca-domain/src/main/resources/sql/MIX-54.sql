use cfa_mixer;

alter table cfa_mixer.OM_LEGAL_ENTITY_PAD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table cfa_mixer.OM_LEGAL_ENTITY_PAD_ACTIVE change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table cfa_mixer.OM_LEGAL_ENTITY_PAD_AUD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table cfa_mixer.OM_LEGAL_ENTITY_PAD_ACTIVE_AUD change AFILIATED COUNTRY_CODE_DESTINY varchar(20);
alter table cfa_mixer.OM_LEGAL_ENTITY_PAD_PENDING_APPROVAL change AFILIATED COUNTRY_CODE_DESTINY varchar(20);