<?php
if(isset($_POST['num1'])) {
$num1=$_POST['num1'];
$ekptosi=$num1*20/100;
$teliki_timi=$num1-$ekptosi;
echo "Η τελική τιμή είναι: ","<br>", $teliki_timi;
}
?>
