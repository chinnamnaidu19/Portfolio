package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.ContactMessageDTO;
import com.portfolio.backend.service.ContactMessageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessageDTO>> submitMessage(
            @Valid @RequestBody ContactMessageDTO messageDTO,
            HttpServletRequest request
    ) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = request.getRemoteAddr();
        }

        ContactMessageDTO saved = contactMessageService.submitMessage(messageDTO, ipAddress);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thank you! Your message has been received.", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactMessageDTO>>> getAllMessages() {
        List<ContactMessageDTO> messages = contactMessageService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContactMessageDTO>> getMessageById(@PathVariable Long id) {
        ContactMessageDTO message = contactMessageService.getMessageById(id);
        return ResponseEntity.ok(ApiResponse.success(message));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        contactMessageService.updateMessageStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Message status updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success("Message deleted successfully", null));
    }
}
