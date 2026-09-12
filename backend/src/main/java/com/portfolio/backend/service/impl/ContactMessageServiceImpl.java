package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.ContactMessageDTO;
import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.ContactMessageRepository;
import com.portfolio.backend.service.ContactMessageService;
import com.portfolio.backend.service.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailNotificationService emailNotificationService;

    @Override
    @Transactional
    public ContactMessageDTO submitMessage(ContactMessageDTO dto, String ipAddress) {
        log.info("Received contact message from: {} ({})", dto.getName(), dto.getEmail());

        ContactMessage entity = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .status(ContactMessage.MessageStatus.UNREAD)
                .ipAddress(ipAddress)
                .build();

        ContactMessage saved = contactMessageRepository.save(entity);
        try {
            emailNotificationService.sendContactAlert(saved);
        } catch (Exception e) {
            log.warn("Non-blocking email alert exception: {}", e.getMessage());
        }
        return mapToDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactMessageDTO getMessageById(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        return mapToDTO(message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactMessageDTO> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateMessageStatus(Long id, String statusStr) {
        log.info("Updating contact message id {} to status {}", id, statusStr);
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));

        try {
            message.setStatus(ContactMessage.MessageStatus.valueOf(statusStr.toUpperCase()));
            contactMessageRepository.save(message);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid message status: " + statusStr);
        }
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        log.info("Deleting contact message id: {}", id);
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Contact message not found with id: " + id);
        }
        contactMessageRepository.deleteById(id);
    }

    private ContactMessageDTO mapToDTO(ContactMessage entity) {
        return ContactMessageDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .subject(entity.getSubject())
                .message(entity.getMessage())
                .status(entity.getStatus().name())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
