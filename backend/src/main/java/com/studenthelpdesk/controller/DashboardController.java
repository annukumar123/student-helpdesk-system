package com.studenthelpdesk.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studenthelpdesk.dto.DashboardStatsResponse;
import com.studenthelpdesk.model.TicketStatus;
import com.studenthelpdesk.repository.TicketRepository;
import com.studenthelpdesk.repository.UserRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public DashboardController(
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {

        long totalTickets =
                ticketRepository.count();

        long openTickets =
                ticketRepository
                        .findByStatus(TicketStatus.OPEN)
                        .size();

        long inProgressTickets =
                ticketRepository
                        .findByStatus(TicketStatus.IN_PROGRESS)
                        .size();

        long resolvedTickets =
                ticketRepository
                        .findByStatus(TicketStatus.RESOLVED)
                        .size();

        long closedTickets =
                ticketRepository
                        .findByStatus(TicketStatus.CLOSED)
                        .size();

        long totalStudents =
                userRepository.count();

        DashboardStatsResponse response =
                new DashboardStatsResponse(
                        totalTickets,
                        openTickets,
                        inProgressTickets,
                        resolvedTickets,
                        closedTickets,
                        totalStudents
                );

        return ResponseEntity.ok(response);
    }
}