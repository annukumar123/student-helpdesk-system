package model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Ticket {

    private final String ticketId;

    private String title;
    private String description;

    private Category category;
    private Priority priority;
    private TicketStatus status;

    private final User createdBy;

    private final LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

    public Ticket(
            String ticketId,
            String title,
            String description,
            Category category,
            Priority priority,
            User createdBy
    ) {
        this.ticketId = ticketId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = TicketStatus.OPEN;
        this.createdBy = createdBy;
        this.createdAt = LocalDateTime.now();
    }

    public String getTicketId() {
        return ticketId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }

    public Priority getPriority() {
        return priority;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void updateDetails(
            String title,
            String description,
            Category category,
            Priority priority
    ) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
    }

    public boolean changeStatus(TicketStatus newStatus) {

        if (newStatus == null) {
            return false;
        }

        if (status == newStatus) {
            return false;
        }

        boolean validTransition = switch (status) {

            case OPEN ->
                    newStatus == TicketStatus.IN_PROGRESS;

            case IN_PROGRESS ->
                    newStatus == TicketStatus.RESOLVED;

            case RESOLVED ->
                    newStatus == TicketStatus.CLOSED;

            case CLOSED ->
                    false;
        };

        if (!validTransition) {
            return false;
        }

        status = newStatus;

        if (newStatus == TicketStatus.RESOLVED) {
            resolvedAt = LocalDateTime.now();
        }

        return true;
    }

    public void displayTicket() {

        System.out.println();
        System.out.println("==============================================");
        System.out.println("                TICKET DETAILS");
        System.out.println("==============================================");

        System.out.println("Ticket ID    : " + ticketId);
        System.out.println("Title        : " + title);
        System.out.println("Description  : " + description);
        System.out.println("Category     : " + category);
        System.out.println("Priority     : " + priority);
        System.out.println("Status       : " + status);

        System.out.println("Created By   : " + createdBy.getName());
        System.out.println("Student ID   : " + createdBy.getUserId());
        System.out.println("Email        : " + createdBy.getEmail());

        System.out.println(
                "Created At   : " + createdAt.format(FORMATTER)
        );

        if (resolvedAt != null) {
            System.out.println(
                    "Resolved At  : " + resolvedAt.format(FORMATTER)
            );
        } else {
            System.out.println("Resolved At  : Not resolved");
        }

        System.out.println("==============================================");
    }

    @Override
    public String toString() {

        return String.format(
                "%-8s %-25s %-12s %-10s %-15s",
                ticketId,
                title.length() > 23
                        ? title.substring(0, 23) + ".."
                        : title,
                category,
                priority,
                status
        );
    }
}