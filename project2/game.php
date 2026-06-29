<?php
session_start();
$pops = [
"Joey Tribbiani",
"Goofy",
"Mary Poppins",
"Smurfette",
"Care A Lot Bear",
"Scooby Doo"
];
//Δημιουργία χαρακτήρα
if (!isset($_SESSION['secret'])) {// Αν δεν υπάρχει η session 'secret' 
	$_SESSION ['secret'] = $pops[array_rand($pops)]; // Ένα τυχαίο pop από τον πίνακα (array) των pop
	$_SESSION ['tries'] = 0;
	$_SESSION ['won'] = false;
}
 $message = "";
 $discountCode = "";
 
// Yποβολή απάντησης
if ($_SERVER["REQUEST_METHOD"] == "POST" && !$_SESSION['won']) {  // Εάν ο χρήστης πάτησε "υποβολή" και δεν έχει νικήσει ακόμα

    $guess = trim($_POST["guess"]);// To trim αφαιρεί κενά
    $_SESSION['tries'] = $_SESSION['tries'] + 1;
    if (strcasecmp($guess, $_SESSION['secret']) == 0) { // Τo strcasecmp σημαίνει πως μπορείς να συγκρίνεις strings χωρίς να κάνεις διάκριση σε κεφαλαία και μικρά

        $_SESSION['won'] = true;
        $discountCode = "FUNKO15";

        $message = "🎉 ΣΩΣΤΑ! Βρήκες τον χαρακτήρα σε " . $_SESSION['tries'] . " προσπάθειες! <br>
        🎁 Κουπόνι: <b>$discountCode</b>";

    } else {
        $message = "😥 Λάθος, δοκίμασε ξανά!";
    }
}

// Επανεκκίνηση παιχνιδιού
if (isset($_POST['reset'])) {
    session_destroy();
    header("Location: game.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="el">
<head>
<meta charset="UTF-8">
<title> Funko Guess Game </title>
<link rel="stylesheet" href="style.css">
</head>
<body class="game-page">
<h1> Funko Guess Game </h1>
<p> Μάντεψε τον χαρακτήρα! </p>

<!-- Μήνυμα αποτελέσματος -->
<p><?php echo $message; ?></p>

<!-- Φόρμα μαντεψιάς -->
<form method="POST">
 <input class="game-input" type="text" name="guess" placeholder = "Γράψε το όνομα..." required> <!-- το placeholder είναι το γκρι κουτάκι ενώ το required σημαινει πως είναι υποχρεωτικό να συμπληρωθεί -->
<button class="game-button" type="submit"> Υποβολή </button>
 </form>
 <br>
 
 
<!-- Koυμπί reset -->
<form method="POST">
<button type="submit" name="reset"> Nέο Παιχνίδι </button>
</form>
</body>
</html>


