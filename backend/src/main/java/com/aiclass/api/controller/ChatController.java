package com.aiclass.api.controller;

import com.aiclass.api.model.ChatMessage;
import com.aiclass.api.repository.ChatMessageRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "5. Comunicaciones - Mensajería Institucional", description = "Endpoints para chat interno, canales y mensajería escolar")
public class ChatController {

    private final ChatMessageRepository chatRepo;

    public ChatController(ChatMessageRepository chatRepo) {
        this.chatRepo = chatRepo;
    }

    @GetMapping
    @Operation(summary = "Listar mensajes de chat")
    public List<ChatMessage> getMessages(@RequestParam(defaultValue = "general") String channel) {
        return chatRepo.findByChannelNameOrderByCreatedAtAsc(channel);
    }

    @PostMapping
    @Operation(summary = "Enviar nuevo mensaje de chat")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage message) {
        ChatMessage saved = chatRepo.save(message);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
