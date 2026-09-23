import model.Category;
import model.Priority;
import model.Ticket;
import model.TicketStatus;
import model.User;

import service.TicketService;
import service.UserService;

import util.InputValidator;

import java.util.List;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner =
            new Scanner(System.in);

    private static final UserService userService =
            new UserService();

    private static final TicketService ticketService =
            new TicketService();

    public static void main(String[] args) {

        showWelcomeMessage();

        boolean running = true;

        while (running) {

            displayMainMenu();

            int choice = InputValidator.readIntInRange(
                    scanner,
                    "Enter your choice: ",
                    0,
                    9
            );

            System.out.println();

            switch (choice) {

                case 1 -> createTicket();

                case 2 -> viewAllTickets();

                case 3 -> searchTicket();

                case 4 -> updateTicket();

                case 5 -> changeTicketStatus();

                case 6 -> resolveTicket();

                case 7 -> closeTicket();

                case 8 -> filterTickets();

                case 9 -> ticketService.displayStatistics();

                case 0 -> {
                    running = false;
                    System.out.println(
                            "Thank you for using Student Helpdesk System!"
                    );
                }
            }

            if (running) {
                System.out.println();
                System.out.println(
                        "Press Enter to continue..."
                );
                scanner.nextLine();
            }
        }

        scanner.close();
    }

    // ============================================
    // WELCOME
    // ============================================

    private static void showWelcomeMessage() {

        System.out.println();
        System.out.println(
                "================================================"
        );
        System.out.println(
                "       STUDENT HELPDESK SYSTEM"
        );
        System.out.println(
                "================================================"
        );
        System.out.println(
                "Welcome to the Student Support Ticket System"
        );
    }

    // ============================================
    // MAIN MENU
    // ============================================

    private static void displayMainMenu() {

        System.out.println();
        System.out.println(
                "================================================"
        );
        System.out.println(
                "                  MAIN MENU"
        );
        System.out.println(
                "================================================"
        );

        System.out.println("1. Create Ticket");
        System.out.println("2. View All Tickets");
        System.out.println("3. Search Ticket");
        System.out.println("4. Update Ticket");
        System.out.println("5. Change Ticket Status");
        System.out.println("6. Resolve Ticket");
        System.out.println("7. Close Ticket");
        System.out.println("8. Filter Tickets");
        System.out.println("9. View Statistics");
        System.out.println("0. Exit");

        System.out.println(
                "================================================"
        );
    }

    // ============================================
    // CREATE TICKET
    // ============================================

    private static void createTicket() {

        System.out.println(
                "--------------- CREATE TICKET ----------------"
        );

        String userId = InputValidator.readNonEmpty(
                scanner,
                "Enter Student ID: "
        );

        User user = userService.findUserById(userId);

        if (user == null) {

            System.out.println();
            System.out.println(
                    "New student. Enter student details."
            );

            String name = InputValidator.readNonEmpty(
                    scanner,
                    "Enter Student Name: "
            );

            String email = InputValidator.readEmail(
                    scanner,
                    "Enter Email: "
            );

            user = new User(
                    userId,
                    name,
                    email
            );

            userService.addUser(user);

        } else {

            System.out.println(
                    "Existing student found: "
                            + user.getName()
            );
        }

        String title = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket Title: "
        );

        String description = InputValidator.readNonEmpty(
                scanner,
                "Enter Description: "
        );

        Category category = selectCategory();

        Priority priority = selectPriority();

        Ticket ticket = ticketService.createTicket(
                title,
                description,
                category,
                priority,
                user
        );

        System.out.println();
        System.out.println(
                "Ticket created successfully!"
        );

        System.out.println(
                "Ticket ID: " + ticket.getTicketId()
        );

        System.out.println(
                "Status: " + ticket.getStatus()
        );
    }

    // ============================================
    // VIEW ALL TICKETS
    // ============================================

    private static void viewAllTickets() {

        List<Ticket> tickets =
                ticketService.getAllTickets();

        System.out.println(
                "--------------- ALL TICKETS ------------------"
        );

        if (tickets.isEmpty()) {

            System.out.println(
                    "No tickets found."
            );

            return;
        }

        printTicketTable(tickets);

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID to view details (or 0 to return): "
        );

        if (!ticketId.equals("0")) {

            Ticket ticket =
                    ticketService.findTicketById(ticketId);

            if (ticket == null) {

                System.out.println(
                        "Ticket not found."
                );

            } else {

                ticket.displayTicket();
            }
        }
    }

    // ============================================
    // SEARCH
    // ============================================

    private static void searchTicket() {

        System.out.println(
                "--------------- SEARCH TICKET ----------------"
        );

        String keyword = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID, title, description, or student name: "
        );

        List<Ticket> results =
                ticketService.searchTickets(keyword);

        if (results.isEmpty()) {

            System.out.println(
                    "No matching tickets found."
            );

            return;
        }

        System.out.println(
                results.size() + " ticket(s) found."
        );

        printTicketTable(results);

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID to view details (or 0 to return): "
        );

        if (!ticketId.equals("0")) {

            Ticket ticket =
                    ticketService.findTicketById(ticketId);

            if (ticket == null) {
                System.out.println(
                        "Ticket not found."
                );
            } else {
                ticket.displayTicket();
            }
        }
    }

    // ============================================
    // UPDATE
    // ============================================

    private static void updateTicket() {

        System.out.println(
                "--------------- UPDATE TICKET ----------------"
        );

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID: "
        );

        Ticket ticket =
                ticketService.findTicketById(ticketId);

        if (ticket == null) {

            System.out.println(
                    "Ticket not found."
            );

            return;
        }

        if (ticket.getStatus() == TicketStatus.CLOSED) {

            System.out.println(
                    "Closed tickets cannot be updated."
            );

            return;
        }

        System.out.println(
                "Current title: " + ticket.getTitle()
        );

        String title = InputValidator.readNonEmpty(
                scanner,
                "Enter New Title: "
        );

        String description = InputValidator.readNonEmpty(
                scanner,
                "Enter New Description: "
        );

        Category category = selectCategory();

        Priority priority = selectPriority();

        boolean updated =
                ticketService.updateTicket(
                        ticketId,
                        title,
                        description,
                        category,
                        priority
                );

        if (updated) {

            System.out.println(
                    "Ticket updated successfully."
            );

        } else {

            System.out.println(
                    "Unable to update ticket."
            );
        }
    }

    // ============================================
    // CHANGE STATUS
    // ============================================

    private static void changeTicketStatus() {

        System.out.println(
                "------------ CHANGE TICKET STATUS ------------"
        );

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID: "
        );

        Ticket ticket =
                ticketService.findTicketById(ticketId);

        if (ticket == null) {

            System.out.println(
                    "Ticket not found."
            );

            return;
        }

        System.out.println(
                "Current Status: "
                        + ticket.getStatus()
        );

        System.out.println();
        System.out.println("Allowed next status:");

        switch (ticket.getStatus()) {

            case OPEN ->
                    System.out.println(
                            "1. IN_PROGRESS"
                    );

            case IN_PROGRESS ->
                    System.out.println(
                            "1. RESOLVED"
                    );

            case RESOLVED ->
                    System.out.println(
                            "1. CLOSED"
                    );

            case CLOSED ->
                    System.out.println(
                            "No further status changes allowed."
                    );
        }

        if (ticket.getStatus() == TicketStatus.CLOSED) {
            return;
        }

        int choice = InputValidator.readIntInRange(
                scanner,
                "Enter choice: ",
                1,
                1
        );

        TicketStatus newStatus;

        switch (ticket.getStatus()) {

            case OPEN ->
                    newStatus = TicketStatus.IN_PROGRESS;

            case IN_PROGRESS ->
                    newStatus = TicketStatus.RESOLVED;

            case RESOLVED ->
                    newStatus = TicketStatus.CLOSED;

            default ->
                    newStatus = TicketStatus.CLOSED;
        }

        boolean changed =
                ticketService.changeStatus(
                        ticketId,
                        newStatus
                );

        if (changed) {

            System.out.println(
                    "Ticket status changed to "
                            + newStatus
            );

        } else {

            System.out.println(
                    "Invalid status transition."
            );
        }
    }

    // ============================================
    // RESOLVE
    // ============================================

    private static void resolveTicket() {

        System.out.println(
                "--------------- RESOLVE TICKET ---------------"
        );

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID: "
        );

        Ticket ticket =
                ticketService.findTicketById(ticketId);

        if (ticket == null) {

            System.out.println(
                    "Ticket not found."
            );

            return;
        }

        if (ticket.getStatus() != TicketStatus.IN_PROGRESS) {

            System.out.println(
                    "Only IN_PROGRESS tickets can be resolved."
            );

            return;
        }

        boolean resolved =
                ticketService.resolveTicket(ticketId);

        if (resolved) {

            System.out.println(
                    "Ticket resolved successfully."
            );

        } else {

            System.out.println(
                    "Unable to resolve ticket."
            );
        }
    }

    // ============================================
    // CLOSE
    // ============================================

    private static void closeTicket() {

        System.out.println(
                "---------------- CLOSE TICKET ----------------"
        );

        String ticketId = InputValidator.readNonEmpty(
                scanner,
                "Enter Ticket ID: "
        );

        Ticket ticket =
                ticketService.findTicketById(ticketId);

        if (ticket == null) {

            System.out.println(
                    "Ticket not found."
            );

            return;
        }

        if (ticket.getStatus() != TicketStatus.RESOLVED) {

            System.out.println(
                    "Only RESOLVED tickets can be closed."
            );

            return;
        }

        boolean closed =
                ticketService.closeTicket(ticketId);

        if (closed) {

            System.out.println(
                    "Ticket closed successfully."
            );

        } else {

            System.out.println(
                    "Unable to close ticket."
            );
        }
    }

    // ============================================
    // FILTER
    // ============================================

    private static void filterTickets() {

        System.out.println(
                "---------------- FILTER TICKETS ---------------"
        );

        System.out.println("1. Filter by Status");
        System.out.println("2. Filter by Priority");
        System.out.println("3. Filter by Category");

        int choice = InputValidator.readIntInRange(
                scanner,
                "Enter choice: ",
                1,
                3
        );

        List<Ticket> results;

        switch (choice) {

            case 1 -> {

                TicketStatus status =
                        selectStatus();

                results =
                        ticketService.getTicketsByStatus(
                                status
                        );
            }

            case 2 -> {

                Priority priority =
                        selectPriority();

                results =
                        ticketService.getTicketsByPriority(
                                priority
                        );
            }

            case 3 -> {

                Category category =
                        selectCategory();

                results =
                        ticketService.getTicketsByCategory(
                                category
                        );
            }

            default ->
                    results = List.of();
        }

        if (results.isEmpty()) {

            System.out.println(
                    "No tickets found."
            );

        } else {

            printTicketTable(results);
        }
    }

    // ============================================
    // SELECT CATEGORY
    // ============================================

    private static Category selectCategory() {

        System.out.println();
        System.out.println("Select Category:");

        Category[] categories =
                Category.values();

        for (int i = 0; i < categories.length; i++) {

            System.out.println(
                    (i + 1) + ". " + categories[i]
            );
        }

        int choice = InputValidator.readIntInRange(
                scanner,
                "Enter choice: ",
                1,
                categories.length
        );

        return categories[choice - 1];
    }

    // ============================================
    // SELECT PRIORITY
    // ============================================

    private static Priority selectPriority() {

        System.out.println();
        System.out.println("Select Priority:");

        Priority[] priorities =
                Priority.values();

        for (int i = 0; i < priorities.length; i++) {

            System.out.println(
                    (i + 1) + ". " + priorities[i]
            );
        }

        int choice = InputValidator.readIntInRange(
                scanner,
                "Enter choice: ",
                1,
                priorities.length
        );

        return priorities[choice - 1];
    }

    // ============================================
    // SELECT STATUS
    // ============================================

    private static TicketStatus selectStatus() {

        System.out.println();
        System.out.println("Select Status:");

        TicketStatus[] statuses =
                TicketStatus.values();

        for (int i = 0; i < statuses.length; i++) {

            System.out.println(
                    (i + 1) + ". " + statuses[i]
            );
        }

        int choice = InputValidator.readIntInRange(
                scanner,
                "Enter choice: ",
                1,
                statuses.length
        );

        return statuses[choice - 1];
    }

    // ============================================
    // PRINT TICKET TABLE
    // ============================================

    private static void printTicketTable(
            List<Ticket> tickets
    ) {

        System.out.println();

        System.out.printf(
                "%-8s %-25s %-12s %-10s %-15s%n",
                "ID",
                "TITLE",
                "CATEGORY",
                "PRIORITY",
                "STATUS"
        );

        System.out.println(
                "--------------------------------------------------------------------------"
        );

        for (Ticket ticket : tickets) {
            System.out.println(ticket);
        }

        System.out.println(
                "--------------------------------------------------------------------------"
        );
    }
}