<?php
session_start(); // Ανοίγει η session, η προσωρινή μνήμη
if(isset($_SESSION["cart"])) { //ελέγχει αν υπάρχει καλάθι. Το isset ελέγχει αν υπάρχει μια μεταβλητή και αν έχει τιμή
	$cart=$_SESSION["cart"]; //Το περιεχόμενο του session αποθηκεύεται στη μεταβλητή $cart
} else {
	$cart=[]; //Δημιουργία άδειου καλαθιού
}
$total = 0; // Η μεταβλητή θα κρατήσει το συνολικό κόστος 
?>
<h1> Το καλάθι σου </h1>
<?php
foreach($cart as $item) // Η foreach διαβάζει όλα τα στοιχεία ενός πίνακα ένα-ένα
{
echo"<p>"; // Εμφανίζει κείμενο
echo $item["name"], "-",$item["price"],"€"; // Παίρνει το όνομα του προϊόντος και τη τιμή
echo "</p>";
$total= $total+$item["price"];
}
?>
<h2>
Σύνολο: <?php echo $total; ?> € 
</h2>
<form action="agora.php" method="post">
<button type="submit"> Αγορά </button>
</form>

 
	












