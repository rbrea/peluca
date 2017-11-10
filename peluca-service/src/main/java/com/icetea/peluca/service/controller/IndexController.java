package com.icetea.peluca.service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping
public class IndexController {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class);
	
	@RequestMapping(value = "/html/index", method = RequestMethod.GET)
    public String index(){
		
        return "index";
    }
	
	@RequestMapping(value = "/html/index2", method = RequestMethod.GET)
    public String index2(){
		
        return "index2";
    }
	
}
