<?php
$dogScore = 0;
$catScore = 0;

if ($_SERVER['REQUEST_METHOD'] == 'POST') { //Θέλουμε να εκτέλσουμε κώδικα μόνο όταν ο χρήστης στείλει δεδομένα
    $answers = $_POST;
    foreach ($answers as $ans) {
        if ($ans == 'dog') {
            $dogScore++;
        } else if ($ans == 'cat') {
            $catScore++;
        }
    }

    echo "<h1>Αποτελέσματα Quiz</h1>";

    if ($dogScore > $catScore) {
        echo "<p>Είσαι πιο κατάλληλος για σκύλο!</p>";
    } else if ($catScore > $dogScore) {
        echo "<p>Είσαι πιο κατάλληλος για γάτα!</p>";
    } else {
        echo "<p>Μπορείς να τα πας καλά και με τα δύο!</p>";
    }

}  

?>