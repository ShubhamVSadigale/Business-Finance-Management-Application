package com.bfms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bfms.model.Event;
import com.bfms.model.Project;
import com.bfms.repository.ProjectRepository;

@Service
public class EventService {
	@Autowired
    private ProjectRepository projectRepository;
	
	public Project addNewEvent(String projectId, Event event) {

		Project project = projectRepository.findById(projectId).get();

		List<Event> eventList = project.getEvents();

		eventList.add(event);

		project.setEvents(eventList);

		return projectRepository.save(project);		
	}
	
	
	public Optional<Object> getEventByProjectId(String projectId) {
		Optional<Object> eventList = projectRepository.findById(projectId).map(project -> project.getEvents());
		return eventList;
    }

}
