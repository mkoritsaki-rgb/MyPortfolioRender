<?php
$score=0;
$q1=$_POST['q1'];
$q2=$_POST['q2'];
$q3=$_POST['q3'];
$q4=$_POST['q4'];
$q5=$_POST['q5'];
$q6=$_POST['q6'];
$q7=$_POST['q7'];
if ($q1=='Paella') {
	$score++;
}
if ($q2=='Gazpacho') {
	$score++;
}
if ($q3=='Turron') {
$score++;}

if ($q4=='Valencia') {
	$score++;
}
if ($q5=='Χριστόφορος Κολόμβος') {
	$score++;
}
if ($q6=='Salvador Dali') {
	$score++;
}

if ($q7=='Catalonia') {
	$score++;
}
 echo "Το σκορ σας είναι: ", "<br>", $score;
 ?>
 


