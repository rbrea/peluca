package com.icetea.peluca.domain.service.audited;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.icetea.peluca.domain.bo.AuditedBO;

@Transactional
public class AbstractAuditedService {

    protected <T extends AuditedBO<?>> void sort(List<T> list) {
        Collections.sort(list, new Comparator<T>() {
            @Override
            public int compare(T o1, T o2) {

                return o1.getRev() - o2.getRev();
            }
        });

    }

}
