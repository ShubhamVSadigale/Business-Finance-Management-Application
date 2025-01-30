package com.bfms.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.bfms.model.Project;

public interface ProjectRepository extends MongoRepository<Project, String>{
	List<Project> findByStatus(Project.ProjectStatus status);
    List<Project> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("{'events.eventDate': {$gte: ?0, $lte: ?1}}")
    List<Project> findProjectsWithEventsInDateRange(LocalDateTime start, LocalDateTime end);
}
