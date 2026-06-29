<?php
$score_gallika=0;
$q1=$_POST['q1'];
$q2=$_POST['q2'];
$q3=$_POST['q3'];
$q4=$_POST['q4'];
$q5=$_POST['q5'];
$q6=$_POST['q6'];
$q7=$_POST['q7'];

if ($q1=="Boeuf Bourguignon") {
	$score_gallika++;
}
if ($q2=="Napoleon Bonaparte") {
	$score_gallika++;
}
if ($q3=="ροκφόρ") {
	$score_gallika++;
}
if ($q4=="μακαρόν") {
	$score_gallika++;
}
if ($q5=="Escargots") {
	$score_gallika++;
}
if ($q6=="Victor Hugo") {
	$score_gallika++;
}
if ($q7=="Creme brulee") {
	$score_gallika++;
}

echo "Το σκορ σας είναι: ".$score_gallika;
?>