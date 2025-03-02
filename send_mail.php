<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $name = $_POST['name']; 
    $phone = $_POST['phone']; 
    $email = $_POST['email']; 
    $comment = isset($_POST['comment']) ? $_POST['comment'] : 'Без комментария'; 

    $to = "hlohaster@gmail.com"; 
    
    // Тема письма
    $subject = "Новая заявка с формы"; // Тема письма (можно заменить)

    // Формирование тела письма
    $message = "Имя: $name\nТелефон: $phone\nПочта: $email\nКомментарий: $comment";

    // Обработка файлов (если они прикреплены)
    if (!empty($_FILES['files']['name'][0])) {
        $files = $_FILES['files'];

        // Здесь можно добавить код для прикрепления файлов к письму
        // Например, можно сохранять файлы на сервере или прикреплять их к письму
    }

    // Отправка письма
    $headers = "From: $email"; // Заголовки письма (от кого)

    // Функция mail() отправляет письмо
    // Замените your-email@example.com на ваш почтовый ящик для тестирования
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]); // Возвращаем успешный ответ
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки письма.']); // Сообщение об ошибке
    }
}