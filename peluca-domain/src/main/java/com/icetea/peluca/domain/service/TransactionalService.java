package com.icetea.peluca.domain.service;

import java.io.Serializable;

import javax.transaction.Transactional;

@Transactional
public class TransactionalService<D extends Serializable>
    extends BasicService<D> {

}
