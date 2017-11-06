use cfa_mixer;

ALTER TABLE RULE_CHARGE_ACTIVE DROP COLUMN rule_start_date;
ALTER TABLE RULE_CHARGE_ACTIVE_AUD DROP COLUMN rule_start_date;

ALTER TABLE RULE_CHARGE DROP FOREIGN KEY CHARGE_MERCHANT_FK;

DROP TABLE MERCHANT_CHARGE_AUD;
DROP TABLE MERCHANT_CHARGE;

insert into CATALOGUE_TYPE (id, description) values(2, 'CANAL DE COBRO');
insert into CATALOGUE_TYPE (id, description) values(3, 'TIPO DE PRODUCTO');
insert into CATALOGUE_TYPE (id, description) values(4, 'PAIS');
insert into CATALOGUE_TYPE (id, description) values(5, 'TIPO DE ASISTENCIA');
insert into CATALOGUE_TYPE (id, description) values(6, 'TIPO DE VENTA');
insert into CATALOGUE_TYPE (id, description) values(7, 'MONEDA');
insert into CATALOGUE_TYPE (id, description) values(8, 'MEDIO DE PAGO CONTABILIZACION');

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BNC','Adquira',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BNCP','Adquira Puntos',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ARC','Airlines Reporting Corporation',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ADS','Amadeus',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AMEX','AMEX',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('OC6','AVIANCA',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AZD','AZUL',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BNMX','Banamex',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BMERC','Banco Mercantil',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BRSP','Braspag',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('BSP','BSP',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CKB','Click Bus',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GCL','Global Collect',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GCLA','Global Collect - Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GOL','GOL',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('INTAM','Integramerica',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AIJ','Interjet',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WBPST','LaposWeb - Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('LPWT','LaposWeb travel - Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('LPWT2','LaposWeb travel - Aerolinea (Promos)',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MCP','MC Procesos',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('MPO','Mercado Pago',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PSR','PASSAREDO',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('PSNT','Posnet',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RDBN','Redeban',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RDBNA','Redeban Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RDBND','Redeban Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('GDS','Sabre',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('STDR','Santander',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SLX','Sete',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('SUB1','Sub 1',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TAM','TAM',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TEL','Telefonica - Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TRB','Transbank',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TRBA','Transbank Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('TRBD','Transbank Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VBMA','Venezuela Banco Mercantil Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VBMD','Venezuela Banco Mercantil Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VISA','VISA',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VINET','Visa Net',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VOL','Volaris',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VPNVIA','VPN Visa Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VPNVID','VPN Visa Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('LPWTA','Vpos - Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('AXPS','Vpos - Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('VTC','VTC Online',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WBJ','WEBJET',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('LPWTM','Webpos - Aerolinea',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('CAPS','Webpos - Despegar',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WPAY','WorldPay (CFA)',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WDP','WorldPay (OSS)',2);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('WDS','Worldspan',2);

insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('ALL','*',3);
insert into CATALOGUE (CODE, DESCRIPTION, catalogue_type_id) values ('RENTALS','Alquileres',3);
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


