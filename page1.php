<?php
// Подключение к базе данных
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение информации о версии веб-браузера пользователя
$user_agent = $_SERVER['HTTP_USER_AGENT'];

// Запись информации о версии веб-браузера пользователя в базу данных
$sql = "INSERT INTO user_agents (user_agent) VALUES ('$user_agent')";

if ($conn->query($sql) === TRUE) {
    // Получение ID последней добавленной записи
    $last_id = $conn->insert_id;
    // Вывод информации о версии браузера пользователю
    echo "<h2>Ваш браузер</h2>";
    echo "<p>Информация о вашем браузере успешно сохранена в базе данных.</p>";
    echo "<p>Версия вашего браузера: " . $user_agent . "</p>";
    echo "<p>ID записи в базе данных: " . $last_id . "</p>";
} else {
    echo "Ошибка при добавлении информации: " . $conn->error;
}

// Закрытие подключения
$conn->close();
?>
