alter table OM_LEGAL_ENTITY_PP drop column MERCHANT_ID_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_AUD drop column MERCHANT_ID_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_ACTIVE drop column MERCHANT_ID_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_ACTIVE_AUD drop column MERCHANT_ID_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL drop column MERCHANT_ID_DESCRIPTION;

alter table OM_LEGAL_ENTITY_PP drop column MERCHANT_ID;
alter table OM_LEGAL_ENTITY_PP_AUD drop column MERCHANT_ID;
alter table OM_LEGAL_ENTITY_PP_ACTIVE drop column MERCHANT_ID;
alter table OM_LEGAL_ENTITY_PP_ACTIVE_AUD drop column MERCHANT_ID;
alter table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL drop column MERCHANT_ID;

alter table OM_LEGAL_ENTITY_PP drop column COLLECTION_CHANNEL;
alter table OM_LEGAL_ENTITY_PP_AUD drop column COLLECTION_CHANNEL;
alter table OM_LEGAL_ENTITY_PP_ACTIVE drop column COLLECTION_CHANNEL;
alter table OM_LEGAL_ENTITY_PP_ACTIVE_AUD drop column COLLECTION_CHANNEL;
alter table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL drop column COLLECTION_CHANNEL;

alter table OM_LEGAL_ENTITY_PP drop column COLLECTION_CHANNEL_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_AUD drop column COLLECTION_CHANNEL_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_ACTIVE drop column COLLECTION_CHANNEL_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_ACTIVE_AUD drop column COLLECTION_CHANNEL_DESCRIPTION;
alter table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL drop column COLLECTION_CHANNEL_DESCRIPTION;