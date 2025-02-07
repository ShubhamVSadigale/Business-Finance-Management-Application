package com.bfms.service;

import com.bfms.model.Project;
import com.bfms.model.Event;
import com.bfms.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class ScheduledEmailNotifier {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(ScheduledEmailNotifier.class);

   // @Scheduled(cron = "0 * * * * ?") // Runs every minute
    @Scheduled(cron = "0 0 9 * * ?") //Runs everyday at 09:00 AM


    public void checkAndSendNotifications() {
        System.out.println("Checking and sending event notifications... " + java.time.LocalDateTime.now());
        
        // Your existing notification logic here
        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC); 
        LocalDate today = now.toLocalDate();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate inThreeDays = today.plusDays(3);
        
        logger.info("🔍 Checking events for notifications at {}", now);

        List<Project> projects = projectRepository.findProjectsWithEventsInDateRange(now, now.plusDays(3));
        
        if (projects.isEmpty()) {
            logger.info("✅ No upcoming events found for notifications.");
            return;
        }

        for (Project project : projects) {
        	logger.info("📂 Checking project: {}", project.getTitle());
            for (Event event : project.getEvents()) {
                if (shouldSendNotification(event, today, tomorrow, inThreeDays)) {
                    sendNotificationEmail(project, event);
                }
            }
        }
    }

//   private boolean shouldSendNotification(Event event, LocalDate today, LocalDate tomorrow, LocalDate inThreeDays) {
//        LocalDate eventDate = event.getEventDate().toLocalDate();
//       // String preference = event.getNotificationPreference();
//        Event.NotificationPreference preference = event.getNotificationPreference();
//        
//        logger.debug("📅 Checking event: {} (Date: {}, Preference: {})", event.getTitle(), eventDate, preference);
//
//        return (preference.equals("ON_DAY") && eventDate.equals(today)) ||
//               (preference.equals("BEFORE_ONE_DAY") && eventDate.equals(tomorrow)) ||
//               (preference.equals("BEFORE_THREE_DAYS") && eventDate.equals(inThreeDays));
//    }
    
    private boolean shouldSendNotification(Event event, LocalDate today, LocalDate tomorrow, LocalDate inThreeDays) {
        LocalDate eventDate = event.getEventDate().toLocalDate();
        Event.NotificationPreference preference = event.getNotificationPreference();  // Use enum type
        
        logger.debug("📅 Checking event: {} (Date: {}, Preference: {})", event.getTitle(), eventDate, preference);

        return (preference == Event.NotificationPreference.ON_DAY && eventDate.equals(today)) ||
               (preference == Event.NotificationPreference.BEFORE_ONE_DAY && eventDate.equals(tomorrow)) ||
               (preference == Event.NotificationPreference.BEFORE_THREE_DAYS && eventDate.equals(inThreeDays));
    }


    private void sendNotificationEmail(Project project, Event event) {
        String subject = "Reminder: Upcoming Event - " + event.getTitle();
        String body = "Dear User,\n\nThis is a reminder for the upcoming event:\n\n"
                + "Event: " + event.getTitle() + "\n"
                + "Description: " + event.getDescription() + "\n"
                + "Scheduled Date: " + event.getEventDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + "\n\n"
                + "Best regards,\nYour Project Team";

        logger.info("📧 Sending email to {} for event: {}", project.getContactEmail(), event.getTitle());
        emailService.sendEmail(project.getContactEmail(), subject, body);
    }
}
