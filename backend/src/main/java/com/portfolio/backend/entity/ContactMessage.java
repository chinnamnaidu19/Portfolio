package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact_messages", indexes = {
    @Index(name = "idx_msg_status", columnList = "status"),
    @Index(name = "idx_msg_created_at", columnList = "created_at"),
    @Index(name = "idx_msg_email", columnList = "sender_email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessage extends BaseAuditableEntity {

    @Column(name = "sender_name", nullable = false, length = 100)
    private String name;

    @Column(name = "sender_email", nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 200)
    private String subject;

    @Lob
    @Column(name = "message_body", nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MessageStatus status = MessageStatus.UNREAD;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    public enum MessageStatus {
        UNREAD,
        READ,
        RESPONDED,
        ARCHIVED
    }
}
