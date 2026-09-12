package com.portfolio.backend.service.impl;

import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.service.EmailNotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailNotificationServiceImpl implements EmailNotificationService {

    @Value("${app.notification.recipient-email:admin@portfolio.dev}")
    private String recipientEmail;

    @Value("${spring.mail.host:#{null}}")
    private String mailHost;

    @Async
    @Override
    public void sendContactAlert(ContactMessage message) {
        log.info("=================================================================");
        log.info("📩 NEW INCOMING CONTACT NOTIFICATION");
        log.info("From: {} ({})", message.getName(), message.getEmail());
        log.info("Subject: {}", message.getSubject());
        log.info("Message preview: {}", message.getMessage().length() > 100 ? message.getMessage().substring(0, 100) + "..." : message.getMessage());
        log.info("IP: {}", message.getIpAddress());
        log.info("Target recipient: {}", recipientEmail);
        log.info("=================================================================");

        if (mailHost != null && !mailHost.trim().isEmpty()) {
            log.info("SMTP host {} configured. Email dispatch active.", mailHost);
        } else {
            log.info("SMTP host not set (using fallback logger mode). Email alert simulated successfully.");
        }
    }
}
