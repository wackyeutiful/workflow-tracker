package com.example.trackerbackend.controller;

import com.example.trackerbackend.entity.Workflow;
import com.example.trackerbackend.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workflows")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkflowController {

    @Autowired
    private WorkflowService service;

    @GetMapping
    public List<Workflow> getAllWorkflows() {
        return service.getAllWorkflows();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workflow> getWorkflowById(@PathVariable String id) {
        return service.getWorkflowById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Workflow> createWorkflow(@RequestBody Workflow workflow) {
        Workflow saved = service.createWorkflow(workflow);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workflow> updateWorkflow(@PathVariable String id, @RequestBody Workflow workflow) {
        try {
            Workflow updated = service.updateWorkflow(id, workflow);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkflow(@PathVariable String id) {
        service.deleteWorkflow(id);
        return ResponseEntity.noContent().build();
    }
}