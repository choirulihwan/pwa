
<?php
$regId ="Your Device Token";
 
// INCLUDE YOUR FCM FILE
include_once 'fcm.php';    
 
$notification = array();
$arrNotification= array();			
$arrData = array();											
$arrNotification["body"] ="Test by Vijay.";
$arrNotification["title"] = "PHP ADVICES";
$arrNotification["sound"] = "default";
$arrNotification["type"] = 1;
 
$fcm = new FCM();
$result = $fcm->send_notification($regId, $arrNotification,"Android");
?>