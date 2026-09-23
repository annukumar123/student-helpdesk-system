package service;

import model.Category;
import model.Priority;
import model.Ticket;
import model.TicketStatus;
import model.User;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class TicketService {

    private final Map<String, Ticket> tickets;

    private int nextTicketNumber;

    public TicketService() {
        tickets = new java.util.LinkedHashMap<>();
        nextTicketNumber = 1001;
    }

    // ============================================
    // CREATE TICKET
    // ============================================

    public Ticket createTicket(
            String title,
            String description,
            Category category,
            Priority priority,
            User user
    ) {

        String ticketId = "T" + nextTicketNumber++;

        Ticket ticket = new Ticket(
                ticketId,
                title,
                description,
                category,
                priority,
                user
        );

        tickets.put(ticketId, ticket);

        return ticket;
    }

    // ============================================
    // FIND TICKET
    // ============================================

    public Ticket findTicketById(String ticketId) {
        return tickets.get(ticketId);
    }

    // ============================================
    // CHECK TICKET EXISTENCE
    // ============================================

    public boolean ticketExists(String ticketId) {
        return tickets.containsKey(ticketId);
    }

    // ============================================
    // UPDATE TICKET
    // ============================================

    public boolean updateTicket(
            String ticketId,
            String title,
            String description,
            Category category,
            Priority priority
    ) {

        Ticket ticket = tickets.get(ticketId);

        if (ticket == null) {
            return false;
        }

        if (ticket.getStatus() == TicketStatus.CLOSED) {
            return false;
        }

        ticket.updateDetails(
                title,
                description,
                category,
                priority
        );

        return true;
    }

    // ============================================
    // CHANGE STATUS
    // ============================================

    public boolean changeStatus(
            String ticketId,
            TicketStatus newStatus
    ) {

        Ticket ticket = tickets.get(ticketId);

        if (ticket == null) {
            return false;
        }

        return ticket.changeStatus(newStatus);
    }

    // ============================================
    // RESOLVE TICKET
    // ============================================

    public boolean resolveTicket(String ticketId) {

        Ticket ticket = tickets.get(ticketId);

        if (ticket == null) {
            return false;
        }

        return ticket.changeStatus(TicketStatus.RESOLVED);
    }

    // ============================================
    // CLOSE TICKET
    // ============================================

    public boolean closeTicket(String ticketId) {

        Ticket ticket = tickets.get(ticketId);

        if (ticket == null) {
            return false;
        }

        return ticket.changeStatus(TicketStatus.CLOSED);
    }

    // ============================================
    // GET ALL TICKETS
    // ============================================

    public List<Ticket> getAllTickets() {
        return new ArrayList<>(tickets.values());
    }

    // ============================================
    // SEARCH TICKETS
    // ============================================

    public List<Ticket> searchTickets(String keyword) {

        List<Ticket> results = new ArrayList<>();

        String searchText = keyword.toLowerCase();

        for (Ticket ticket : tickets.values()) {

            if (
                    ticket.getTicketId()
                            .toLowerCase()
                            .contains(searchText)

                    || ticket.getTitle()
                            .toLowerCase()
                            .contains(searchText)

                    || ticket.getDescription()
                            .toLowerCase()
                            .contains(searchText)

                    || ticket.getCreatedBy()
                            .getName()
                            .toLowerCase()
                            .contains(searchText)
            ) {

                results.add(ticket);
            }
        }

        return results;
    }

    // ============================================
    // FILTER BY STATUS
    // ============================================

    public List<Ticket> getTicketsByStatus(
            TicketStatus status
    ) {

        List<Ticket> results = new ArrayList<>();

        for (Ticket ticket : tickets.values()) {

            if (ticket.getStatus() == status) {
                results.add(ticket);
            }
        }

        return results;
    }

    // ============================================
    // FILTER BY PRIORITY
    // ============================================

    public List<Ticket> getTicketsByPriority(
            Priority priority
    ) {

        List<Ticket> results = new ArrayList<>();

        for (Ticket ticket : tickets.values()) {

            if (ticket.getPriority() == priority) {
                results.add(ticket);
            }
        }

        return results;
    }

    // ============================================
    // FILTER BY CATEGORY
    // ============================================

    public List<Ticket> getTicketsByCategory(
            Category category
    ) {

        List<Ticket> results = new ArrayList<>();

        for (Ticket ticket : tickets.values()) {

            if (ticket.getCategory() == category) {
                results.add(ticket);
            }
        }

        return results;
    }

    // ============================================
    // TICKET COUNT
    // ============================================

    public int getTicketCount() {
        return tickets.size();
    }

    // ============================================
    // STATISTICS
    // ============================================

    public void displayStatistics() {

        System.out.println();
        System.out.println("==============================================");
        System.out.println("             TICKET STATISTICS");
        System.out.println("==============================================");

        System.out.println(
                "Total Tickets    : " + tickets.size()
        );

        int open = 0;
        int inProgress = 0;
        int resolved = 0;
        int closed = 0;

        for (Ticket ticket : tickets.values()) {

            switch (ticket.getStatus()) {

                case OPEN -> open++;

                case IN_PROGRESS -> inProgress++;

                case RESOLVED -> resolved++;

                case CLOSED -> closed++;
            }
        }

        System.out.println("Open             : " + open);
        System.out.println("In Progress      : " + inProgress);
        System.out.println("Resolved         : " + resolved);
        System.out.println("Closed           : " + closed);

        System.out.println("==============================================");
    }
}