package com.example.trackerbackend.service;

import com.example.trackerbackend.entity.Workflow;
import com.example.trackerbackend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WorkflowService {

    @Autowired
    private WorkflowRepository repository;

    public List<Workflow> getAllWorkflows() {
        return repository.findAll();
    }

    public Optional<Workflow> getWorkflowById(String id) {
        return repository.findById(id);
    }

    public Workflow createWorkflow(Workflow workflow) {
        return repository.save(workflow);
    }

    public Workflow updateWorkflow(String id, Workflow workflowDetails) {
        Workflow workflow = repository.findById(id).orElseThrow();
        workflow.setName(workflowDetails.getName());
        workflow.setDescription(workflowDetails.getDescription());
        workflow.setStatus(workflowDetails.getStatus());
        return repository.save(workflow);
    }

    public void deleteWorkflow(String id) {
        repository.deleteById(id);
    }
}