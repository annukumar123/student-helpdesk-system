package com.studenthelpdesk.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studenthelpdesk.dto.TicketStatusRequest;
import com.studenthelpdesk.model.Category;
import com.studenthelpdesk.model.Priority;
import com.studenthelpdesk.model.Ticket;
import com.studenthelpdesk.model.TicketStatus;
import com.studenthelpdesk.service.TicketService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @Valid @RequestBody Ticket ticket) {

        return ResponseEntity.ok(
                ticketService.createTicket(ticket)
        );
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {

        return ResponseEntity.ok(
                ticketService.getAllTickets()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.getTicketById(id)
        );
    }

    @GetMapping("/number/{ticketNumber}")
    public ResponseEntity<Ticket> getTicketByNumber(
            @PathVariable String ticketNumber) {

        return ResponseEntity.ok(
                ticketService.getTicketByNumber(
                        ticketNumber
                )
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Ticket>> getTicketsByStatus(
            @PathVariable TicketStatus status) {

        return ResponseEntity.ok(
                ticketService.getTicketsByStatus(status)
        );
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Ticket>> getTicketsByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                ticketService.getTicketsByStudent(studentId)
        );
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Ticket>> getTicketsByCategory(
            @PathVariable Category category) {

        return ResponseEntity.ok(
                ticketService.getTicketsByCategory(category)
        );
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Ticket>> getTicketsByPriority(
            @PathVariable Priority priority) {

        return ResponseEntity.ok(
                ticketService.getTicketsByPriority(priority)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id,
            @Valid @RequestBody Ticket ticket) {

        return ResponseEntity.ok(
                ticketService.updateTicket(
                        id,
                        ticket
                )
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> changeStatus(
            @PathVariable Long id,
            @Valid @RequestBody TicketStatusRequest request) {

        return ResponseEntity.ok(
                ticketService.changeStatus(
                        id,
                        request.getStatus()
                )
        );
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<Ticket> resolveTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.resolveTicket(id)
        );
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<Ticket> closeTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ticketService.closeTicket(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(
            @PathVariable Long id) {

        ticketService.deleteTicket(id);

        return ResponseEntity.noContent().build();
    }
}