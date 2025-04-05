<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require 'PHPMailer/src/SMTP.php';
 
// Создаем письмо
$mail = new PHPMailer();
$mail->isSMTP();                   // Отправка через SMTP
$mail->SetLanguage('ru', 'PHPMailer/language/');
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth   = true;          // Enable SMTP authentication
$mail->Username   = 'hlohaster@gmail.com';       // ваше имя пользователя (без домена и @)
$mail->Password   = 'ghvs dxob klvi tqgs';    // ваш пароль
$mail->SMTPSecure = 'tls';         // шифрование ssl
$mail->Port   = 587;               // порт подключения
 
$mail->setFrom('hlohaster@gmail.com', 'Frezerline');    // от кого
$mail->addAddress('hlohaster@gmail.com', 'Frezerline'); // кому
 
$mail->Subject = 'Заявка с сайта';

$body = '<h1>Новая заявка с сайта</h1>';

if(trim(!empty($_POST['name']))){
  $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}

if(trim(!empty($_POST['phone']))){
  $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
}

if(trim(!empty($_POST['email']))){
  $body .= '<p><strong>Почта:</strong> ' . $_POST['email'] . '</p>';
}

if(trim(!empty($_POST['comment']))){
  $body .= '<p><strong>Комментарий:</strong> ' . $_POST['comment'] . '</p>';
}

// Обработка файлов
if (!empty($_FILES['files']) && isset($_FILES['files']['name'][0]) && $_FILES['files']['name'][0] !== '') {
  $files = $_FILES['files'];
  for ($i = 0; $i < count($files['name']); $i++) {
      if ($files['error'][$i] === UPLOAD_ERR_OK) {
          $tmpName = $files['tmp_name'][$i];
          $fileName = $files['name'][$i];
          $mail->addAttachment($tmpName, $fileName);
      }
  }
}

$mail->isHTML(true);  
$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
  $message = "Ошибка отправки";
} else {
  $message = "Данные отправлены!";
}

/* Возвращаем ответ */  
$response = ["message" => $message];

/* Ответ в формате JSON */
header('Content-type: application/json');
echo json_encode($response);
      
      ?>