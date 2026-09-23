package com.studenthelpdesk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studenthelpdesk.model.Ticket;
import com.studenthelpdesk.model.TicketStatus;

public interface TicketRepository
        extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByTicketNumber(
            String ticketNumber
    );

    List<Ticket> findByStatus(
            TicketStatus status
    );

    List<Ticket> findByStudentId(
            Long studentId
    );

    List<Ticket> findByCategory(
            com.studenthelpdesk.model.Category category
    );

    List<Ticket> findByPriority(
            com.studenthelpdesk.model.Priority priority
    );
}