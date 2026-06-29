<?php
include 'db.php';

$result = $enosi->query("SELECT * FROM articles ORDER BY created_at DESC");

while ($row = $result->fetch_assoc()) {

    echo "<div style='border:1px solid #ddd; padding:15px; margin:10px;'>";

    echo "<h2>" . $row['title'] . "</h2>";

    echo "<img src='" . $row['image'] . "' width='250'>";

    echo "<p>" . $row['content'] . "</p>";

    echo "</div>";
}
?>

