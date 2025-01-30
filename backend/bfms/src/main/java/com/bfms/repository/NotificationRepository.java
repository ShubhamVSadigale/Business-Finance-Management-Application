package com.bfms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.bfms.model.Notification;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByStatus(Notification.NotificationStatus status);
    List<Notification> findByRecipientEmail(String email);
    
    @Query("{'scheduledTime': {$lte: ?0}, 'status': 'PENDING'}")
    List<Notification> findPendingNotificationsBeforeTime(LocalDateTime time);
}