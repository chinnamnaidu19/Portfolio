package com.portfolio.backend.service;

import com.portfolio.backend.entity.ContactMessage;

public interface EmailNotificationService {
    void sendContactAlert(ContactMessage message);
}
