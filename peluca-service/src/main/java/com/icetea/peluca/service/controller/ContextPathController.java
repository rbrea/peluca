package com.icetea.peluca.service.controller;

import java.util.Date;

import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Preconditions;

public abstract class ContextPathController
    extends ExceptionHandlingController {

    protected final ModelAndView getContextPathMav(final ModelAndView mav) {
        Preconditions.checkArgument(mav != null, "mav is required");

        return mav;
    }

    protected final ModelAndView getContextPathMav() {
        ModelAndView mav = new ModelAndView();
        mav.addObject("CURRENT_DATE", new Date());

        return mav;
    }

}
