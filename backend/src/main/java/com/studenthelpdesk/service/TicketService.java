package com.studenthelpdesk.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studenthelpdesk.exception.ResourceNotFoundException;
import com.studenthelpdesk.model.Category;
import com.studenthelpdesk.model.Priority;
import com.studenthelpdesk.model.Ticket;
import com.studenthelpdesk.model.TicketStatus;
import com.studenthelpdesk.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) {

        if (ticket.getTicketNumber() == null ||
                ticket.getTicketNumber().isBlank()) {

            ticket.setTicketNumber(
                    generateTicketNumber()
            );
        }

        if (ticket.getStatus() == null) {
            ticket.setStatus(TicketStatus.OPEN);
        }

        if (ticket.getCreatedAt() == null) {
            ticket.setCreatedAt(
                    LocalDateTime.now()
            );
        }

        if (ticket.getStudentEmail() != null) {
            ticket.setStudentEmail(
                    normalizeEmail(
                            ticket.getStudentEmail()
                    )
            );
        }

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {

        return ticketRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ticket not found with id: " + id
                        )
                );
    }

    public Ticket getTicketByNumber(
            String ticketNumber) {

        return ticketRepository
                .findByTicketNumber(ticketNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ticket not found: "
                                        + ticketNumber
                        )
                );
    }

    public List<Ticket> getTicketsByStatus(
            TicketStatus status) {

        return ticketRepository.findByStatus(status);
    }

    public List<Ticket> getTicketsByStudent(
            Long studentId) {

        return ticketRepository.findByStudentId(studentId);
    }

    public List<Ticket> getTicketsByCategory(
            Category category) {

        return ticketRepository.findByCategory(category);
    }

    public List<Ticket> getTicketsByPriority(
            Priority priority) {

        return ticketRepository.findByPriority(priority);
    }

    public Ticket updateTicket(
            Long id,
            Ticket updatedTicket) {

        Ticket existingTicket =
                getTicketById(id);

        existingTicket.setTitle(
                updatedTicket.getTitle()
        );

        existingTicket.setDescription(
                updatedTicket.getDescription()
        );

        existingTicket.setCategory(
                updatedTicket.getCategory()
        );

        existingTicket.setPriority(
                updatedTicket.getPriority()
        );

        if (updatedTicket.getStudentId() != null) {

            existingTicket.setStudentId(
                    updatedTicket.getStudentId()
            );
        }

        if (updatedTicket.getStudentName() != null) {

            existingTicket.setStudentName(
                    updatedTicket.getStudentName()
            );
        }

        if (updatedTicket.getStudentEmail() != null) {

            existingTicket.setStudentEmail(
                    normalizeEmail(
                            updatedTicket.getStudentEmail()
                    )
            );
        }

        return ticketRepository.save(
                existingTicket
        );
    }

    public Ticket changeStatus(
            Long id,
            TicketStatus status) {

        if (status == null) {

            throw new IllegalArgumentException(
                    "Ticket status cannot be null"
            );
        }

        Ticket ticket =
                getTicketById(id);

        ticket.setStatus(status);

        if (status == TicketStatus.RESOLVED) {

            if (ticket.getResolvedAt() == null) {

                ticket.setResolvedAt(
                        LocalDateTime.now()
                );
            }

        } else if (status == TicketStatus.OPEN ||
                   status == TicketStatus.IN_PROGRESS) {

            ticket.setResolvedAt(null);
        }

        return ticketRepository.save(ticket);
    }

    public Ticket resolveTicket(Long id) {

        return changeStatus(
                id,
                TicketStatus.RESOLVED
        );
    }

    public Ticket closeTicket(Long id) {

        return changeStatus(
                id,
                TicketStatus.CLOSED
        );
    }

    public void deleteTicket(Long id) {

        if (!ticketRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "Ticket not found with id: " + id
            );
        }

        ticketRepository.deleteById(id);
    }

    private String generateTicketNumber() {

        long nextNumber = 1001;

        List<Ticket> tickets =
                ticketRepository.findAll();

        for (Ticket ticket : tickets) {

            String ticketNumber =
                    ticket.getTicketNumber();

            if (ticketNumber == null) {
                continue;
            }

            if (!ticketNumber.startsWith("T")) {
                continue;
            }

            try {

                long number =
                        Long.parseLong(
                                ticketNumber.substring(1)
                        );

                if (number >= nextNumber) {

                    nextNumber = number + 1;
                }

            } catch (NumberFormatException ignored) {
                // Ignore invalid ticket-number formats
            }
        }

        return "T" + nextNumber;
    }

    private String normalizeEmail(String email) {

        return email.trim().toLowerCase();
    }
}