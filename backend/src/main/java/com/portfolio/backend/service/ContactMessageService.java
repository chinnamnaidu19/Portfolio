package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactMessageDTO;

import java.util.List;

public interface ContactMessageService {
    ContactMessageDTO submitMessage(ContactMessageDTO messageDTO, String ipAddress);
    ContactMessageDTO getMessageById(Long id);
    List<ContactMessageDTO> getAllMessages();
    void updateMessageStatus(Long id, String status);
    void deleteMessage(Long id);
}
