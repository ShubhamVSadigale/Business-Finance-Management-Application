package com.bfms.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bfms.model.Notification;
import com.bfms.model.Notification.NotificationStatus;

import jakarta.validation.constraints.Email;


public class NotificationDTO {
//	private String id;
//	private String eventId;
//
//	private String recipientEmail;
//
//	private LocalDateTime scheduledTime;
//	private Notification.NotificationStatus status;
//	private String content;
//
//	public NotificationDTO() {
//		super();
//	}
//
//	public NotificationDTO(String id, String eventId, String recipientEmail, LocalDateTime scheduledTime,
//			NotificationStatus status, String content) {
//		super();
//		this.id = id;
//		this.eventId = eventId;
//		this.recipientEmail = recipientEmail;
//		this.scheduledTime = scheduledTime;
//		this.status = status;
//		this.content = content;
//	}
//
//	public String getId() {
//		return id;
//	}
//
//	public void setId(String id) {
//		this.id = id;
//	}
//
//	public String getEventId() {
//		return eventId;
//	}
//
//	public void setEventId(String eventId) {
//		this.eventId = eventId;
//	}
//
//	public String getRecipientEmail() {
//		return recipientEmail;
//	}
//
//	public void setRecipientEmail(String recipientEmail) {
//		this.recipientEmail = recipientEmail;
//	}
//
//	public LocalDateTime getScheduledTime() {
//		return scheduledTime;
//	}
//
//	public void setScheduledTime(LocalDateTime scheduledTime) {
//		this.scheduledTime = scheduledTime;
//	}
//
//	public Notification.NotificationStatus getStatus() {
//		return status;
//	}
//
//	public void setStatus(Notification.NotificationStatus status) {
//		this.status = status;
//	}
//
//	public String getContent() {
//		return content;
//	}
//
//	public void setContent(String content) {
//		this.content = content;
//	}
	
	private String id;
    private String eventId;

    @Email(message = "Invalid email format")
    private String recipientEmail;

    private LocalDateTime scheduledTime;
    private Notification.NotificationStatus status;
    private String content;

}