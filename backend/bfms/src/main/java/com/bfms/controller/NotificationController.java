package com.bfms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bfms.model.Notification;
import com.bfms.repository.NotificationRepository;
import com.bfms.service.NotificationService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationRepository.findAll());
    }

    @PostMapping("/manual")
    public ResponseEntity<Notification> createManualNotification(@RequestBody Notification notification) {
        notification.setStatus(Notification.NotificationStatus.PENDING);
        notificationService.sendEmail(notification);
        return ResponseEntity.ok(notification);
    }

    @GetMapping("/send-test")
    public ResponseEntity<String> sendTestNotification() {
        notificationService.checkUpcomingEventsAndSendNotifications();
        return ResponseEntity.ok("Notification check triggered");
    }
}