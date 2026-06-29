<?php
session_start();// Ξεκινά μια session που είναι ένας προσωρινός αποθηκευτικός χώρος για κάθε χρήστη. Απαραίτητη για κάθε cart
$name = $_POST["name"]; // Πίνακας που περιέχει τα δεδομένα που στάλθηκαν με POST
$price= $_POST["price"];
if(!isset($_SESSION["cart"])) // Αν δεν υπάρχει το cart στη session 
{
	$_SESSION["cart"] = []; // το δημιουργώ με ένα άδειο πίνακα
}
$_SESSION["cart"][] = // Προσθέτω ένα νέο στοιχείο στο τέλος του πίνακα
[
"name" =>$name, // Το => λέγεται asscoiative array και σημαίνει key-value
"price"=>$price
];
echo "Προστέθηκε στο καλάθι!";
?>









