package util;

import java.util.Scanner;
import java.util.regex.Pattern;

public class InputValidator {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile(
                    "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
            );

    private InputValidator() {
        // Utility class
    }

    // ============================================
    // NON EMPTY STRING
    // ============================================

    public static String readNonEmpty(
            Scanner scanner,
            String message
    ) {

        while (true) {

            System.out.print(message);

            String input = scanner.nextLine().trim();

            if (!input.isEmpty()) {
                return input;
            }

            System.out.println(
                    "Input cannot be empty. Please try again."
            );
        }
    }

    // ============================================
    // INTEGER
    // ============================================

    public static int readInt(
            Scanner scanner,
            String message
    ) {

        while (true) {

            System.out.print(message);

            String input = scanner.nextLine().trim();

            try {

                return Integer.parseInt(input);

            } catch (NumberFormatException e) {

                System.out.println(
                        "Please enter a valid number."
                );
            }
        }
    }

    // ============================================
    // INTEGER RANGE
    // ============================================

    public static int readIntInRange(
            Scanner scanner,
            String message,
            int min,
            int max
    ) {

        while (true) {

            int value = readInt(scanner, message);

            if (value >= min && value <= max) {
                return value;
            }

            System.out.println(
                    "Please enter a value between "
                            + min + " and " + max + "."
            );
        }
    }

    // ============================================
    // EMAIL
    // ============================================

    public static String readEmail(
            Scanner scanner,
            String message
    ) {

        while (true) {

            String email =
                    readNonEmpty(scanner, message);

            if (EMAIL_PATTERN.matcher(email).matches()) {
                return email;
            }

            System.out.println(
                    "Invalid email format. Please try again."
            );
        }
    }
}