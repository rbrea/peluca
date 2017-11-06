package com.icetea.peluca.service.controller.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.icetea.peluca.api.dto.BasicOutputDto;

@Controller
public class JobTriggerController {

    @RequestMapping(value = "api/internal/job", method = RequestMethod.POST)
    public @ResponseBody BasicOutputDto runJob(@RequestParam(name = "job_name") String jobName) {

        // this.jobManager.getProcess(jobName).run();

        return new BasicOutputDto();
    }

}
