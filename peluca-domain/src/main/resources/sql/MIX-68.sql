use cfa_mixer;

insert into CATALOGUE_TYPE(ID, DESCRIPTION) values (3, "TIPO DE PRODUCTO");
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CAR','Auto',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BUS','Bus',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CRUISE','Crucero',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TOUR','Excursion',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CRUISE_FEE','Fee de crucero',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FLIGHT_FEE','Fee de vuelo',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('HOTEL','Hotel',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OTHER','Otro',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CLOSED_PACKAGE','Paquete Cerrado',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GENERIC','Producto generico',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INSURANCE','Seguro',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SERVICE','Servicio',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TKT_DISNEY','Ticket Disney',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TKT_UNIVERSAL','Ticket Universal',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TOUR_OPERATOR','Tour Operador',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TRANSFER','Traslado',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VACATION_RENTAL','Vacation Rentals',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('FLIGHT','Vuelo',3);

truncate table OM_LEGAL_ENTITY_PP_ACTIVE;
truncate table OM_LEGAL_ENTITY_PP_ACTIVE_AUD;
truncate table OM_LEGAL_ENTITY_PP_PENDING_APPROVAL;
truncate table OM_LEGAL_ENTITY_PP_AUD;
truncate table OM_LEGAL_ENTITY_PP;

truncate table RULE_SELL_TYPE_ACTIVE;
truncate table RULE_SELL_TYPE_ACTIVE_AUD;
truncate table RULE_SELL_TYPE_PENDING_APPROVAL;
truncate table RULE_SELL_TYPE_AUD;
truncate table RULE_SELL_TYPE;
