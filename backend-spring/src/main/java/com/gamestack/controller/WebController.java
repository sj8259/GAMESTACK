package com.gamestack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    
    @GetMapping("/view")
    public String viewData() {
        return "redirect:/data-view.html";
    }
}
