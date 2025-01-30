package com.bfms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;



@Document(collection = "notifications")
public class Notification {
	@Id
	private String id;
	private String eventId;
	private String recipientEmail;
	private LocalDateTime scheduledTime;
	private NotificationStatus status;
	private String content;

	public enum NotificationStatus {
		PENDING, SENT, FAILED
	}

	public Notification() {
		super();
	}

	public Notification(String id, String eventId, String recipientEmail, LocalDateTime scheduledTime,
			NotificationStatus status, String content) {
		super();
		this.id = id;
		this.eventId = eventId;
		this.recipientEmail = recipientEmail;
		this.scheduledTime = scheduledTime;
		this.status = status;
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getRecipientEmail() {
		return recipientEmail;
	}

	public void setRecipientEmail(String recipientEmail) {
		this.recipientEmail = recipientEmail;
	}

	public LocalDateTime getScheduledTime() {
		return scheduledTime;
	}

	public void setScheduledTime(LocalDateTime scheduledTime) {
		this.scheduledTime = scheduledTime;
	}

	public NotificationStatus getStatus() {
		return status;
	}

	public void setStatus(NotificationStatus status) {
		this.status = status;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}