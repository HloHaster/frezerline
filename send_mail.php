<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
    $mail->IsHTML(true); /* Разрешаем работу с HTML */
    
    $name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
    $phone = $_POST["phone"]; /* Телефон */
    $email = $_POST["email"]; /* Почту */
    $message = $_POST["comment"]; /* Сообщение с формы */

    $email_template = "template_mail.html";

    $body = file_get_contents($email_template); // Сохраняем данные в $body
    $body = str_replace('%name%', $name, $body); // Заменяем строку %name% на имя
    $body = str_replace('%phone%', $phone, $body); // строку %phone% на телефон
    $body = str_replace('%email%', $email, $body); // строку %email% на почту
    $body = str_replace('%comment%', $comment, $body); // строку %comment% на сообщение

    $body = $name . '' . $phone . '' . $email . '' . $comment;
    $theme = "[Заявка с сайта]"


    $mail->addAddress("hlohaster@gmail.com")

    $mail->Subject = $theme
    $mail->Body = $body

    $mail->Send

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