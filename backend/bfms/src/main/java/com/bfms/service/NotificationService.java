package com.bfms.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bfms.model.Event;
import com.bfms.model.Notification;
import com.bfms.repository.EventRepository;
import com.bfms.repository.NotificationRepository;

@Service
public class NotificationService {
	@Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private JavaMailSender mailSender;

    public Notification createNotification(Event event) {
        Notification notification = new Notification();
        notification.setEventId(event.getId());
        notification.setRecipientEmail("admin@example.com"); // Configure dynamically
        notification.setScheduledTime(calculateNotificationTime(event));
        notification.setStatus(Notification.NotificationStatus.PENDING);
        notification.setContent(generateNotificationContent(event));
        
        return notificationRepository.save(notification);
    }

    private LocalDateTime calculateNotificationTime(Event event) {
        switch(event.getNotificationPreference()) {
            case BEFORE_THREE_DAYS:
                return event.getEventDate().minusDays(3);
            case BEFORE_ONE_DAY:
                return event.getEventDate().minusDays(1);
            case ON_DAY:
            default:
                return event.getEventDate();
        }
    }

    private String generateNotificationContent(Event event) {
        return String.format("Event Reminder: %s scheduled on %s", 
            event.getTitle(), event.getEventDate());
    }

    @Scheduled(fixedRate = 60000) // Every minute
    public void checkUpcomingEventsAndSendNotifications() {
        LocalDateTime now = LocalDateTime.now();
        
        // Find events due for notification
        List<Event> upcomingEvents = eventRepository.findUpcomingEventsForNotification(
            now, 
            Event.NotificationPreference.BEFORE_ONE_DAY
        );

        upcomingEvents.forEach(event -> {
            // Create and send notification
            Notification notification = createNotification(event);
            sendEmail(notification);
        });
    }

    public void sendEmail(Notification notification) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(notification.getRecipientEmail());
            message.setSubject("Event Notification");
            message.setText(notification.getContent());
            
            mailSender.send(message);
            
            notification.setStatus(Notification.NotificationStatus.SENT);
            notificationRepository.save(notification);
        } catch (Exception e) {
            notification.setStatus(Notification.NotificationStatus.FAILED);
            notificationRepository.save(notification);
        }
    }
}
