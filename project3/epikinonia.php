<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ελέγχουμε αν τα πεδία υπάρχουν για ασφάλεια
    $name = isset($_POST["name"]) ? $_POST["name"] : '';
    $message = isset($_POST["message"]) ? $_POST["message"] : '';

    // Ανοίγουμε το αρχείο
    $file = fopen("contacts.txt", "a");
    $data = "Όνομα: $name\nΜήνυμα: $message\n\n";

    fwrite($file, $data); // Γράφουμε στο αρχείο
    fclose($file); // Κλείνουμε το αρχείο

    echo "Το μήνυμα σας στάλθηκε επιτυχώς!";
}
?>