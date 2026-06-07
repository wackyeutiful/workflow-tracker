package com.example.trackerbackend.repository;

import com.example.trackerbackend.entity.Workflow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkflowRepository extends MongoRepository<Workflow, String> {
}