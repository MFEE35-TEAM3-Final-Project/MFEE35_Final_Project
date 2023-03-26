<?php
// 設定資料庫執行個體的端點、使用者名稱、密碼和資料庫名稱
$endpoint = "mydbinstance.c9akciq32.rds.amazonaws.com";
$username = "mydbuser";
$password = "mypassword";
$dbname = "mydatabase";

// 建立 PDO 物件來連接到資料庫執行個體
try {
    $conn = new PDO("mysql:host=$endpoint;dbname=$dbname", $username, $password);
    // 設定 PDO 錯誤模式為例外
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// 準備 SQL 語句來插入一筆資料到 users 表格中
$sql = "INSERT INTO users (name, email) VALUES ('John', 'john@example.com')";

// 執行 SQL 語句
try {
    // 使用 exec() 因為沒有結果返回
    $conn->exec($sql);
    echo "New record created successfully";
} catch (PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

// 關閉資料庫連接
$conn = null;
