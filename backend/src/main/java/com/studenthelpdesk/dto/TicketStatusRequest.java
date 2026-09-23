package com.studenthelpdesk.dto;

import com.studenthelpdesk.model.TicketStatus;

import jakarta.validation.constraints.NotNull;

public class TicketStatusRequest {

    @NotNull(message = "Ticket status is required")
    private TicketStatus status;

    public TicketStatusRequest() {
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }
}