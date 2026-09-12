package com.portfolio.backend;

import com.portfolio.backend.dto.ContactMessageDTO;
import com.portfolio.backend.service.ContactMessageService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ContactMessageServiceTests {

    @Autowired
    private ContactMessageService contactMessageService;

    @Test
    @DisplayName("7. Test Submit Contact Message")
    void testSubmitContactMessage() {
        ContactMessageDTO messageDTO = ContactMessageDTO.builder()
                .name("Recruiter Sarah")
                .email("sarah.tech@google.com")
                .subject("Senior Java Engineer Opportunity")
                .message("Hi Alexander, we were impressed by your distributed systems portfolio and would like to discuss a role.")
                .build();

        ContactMessageDTO submitted = contactMessageService.submitMessage(messageDTO, "192.168.1.100");

        assertNotNull(submitted.getId(), "Message ID should be generated upon insertion");
        assertEquals("Recruiter Sarah", submitted.getName());
        assertEquals("sarah.tech@google.com", submitted.getEmail());
        assertEquals("UNREAD", submitted.getStatus());
        assertNotNull(submitted.getCreatedAt());

        // Verify retrieval
        ContactMessageDTO retrieved = contactMessageService.getMessageById(submitted.getId());
        assertNotNull(retrieved);
        assertEquals(submitted.getSubject(), retrieved.getSubject());

        // Verify list
        List<ContactMessageDTO> allMessages = contactMessageService.getAllMessages();
        assertFalse(allMessages.isEmpty());
        assertTrue(allMessages.stream().anyMatch(m -> m.getId().equals(submitted.getId())));
    }
}
