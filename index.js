// Импортируем необходимые модули
const express = require("express");
const bodyParser = require("body-parser");

// Инициализируем приложение Express
const app = express();
const PORT = 3000;

// Middleware для парсинга JSON в теле запроса
app.use(bodyParser.json());

// Массив для хранения товаров (вместо базы данных)
let shopItems = [];
let nextId = 1;

// Роуты

// Получить все товары
app.get("/items", (req, res) => {
  res.json(shopItems);
});

// Получить один товар по ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Получаем ID из параметра запроса
  const item = shopItems.find((i) => i.id === id); // Находим товар по ID
  if (!item) {
    return res.status(404).json({ error: "Item not found" }); // Если товар не найден
  }
  res.json(item); // Возвращаем товар
});

// Добавить новый товар
app.post("/items", (req, res) => {
  const { name, description, price } = req.body; // Извлекаем данные из тела запроса
  if (!name || !description || !price) {
    return res
      .status(400)
      .json({ error: "Name, description, and price are required" }); // Проверка на обязательные поля
  }

  const newItem = { id: nextId++, name, description, price }; // Создаем новый товар
  shopItems.push(newItem); // Добавляем товар в массив
  res.status(201).json(newItem); // Возвращаем новый товар с кодом 201 (создано)
});

// Обновить товар по ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Получаем ID из параметра запроса
  const { name, description, price } = req.body; // Извлекаем данные из тела запроса
  const item = shopItems.find((i) => i.id === id); // Находим товар по ID

  if (!item) {
    return res.status(404).json({ error: "Item not found" }); // Если товар не найден
  }

  // Обновляем поля товара, если они присутствуют в запросе
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  if (price !== undefined) item.price = price;

  res.json(item); // Возвращаем обновленный товар
});

// Удалить товар по ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Получаем ID из параметра запроса
  const itemIndex = shopItems.findIndex((i) => i.id === id); // Находим индекс товара по ID

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" }); // Если товар не найден
  }

  shopItems.splice(itemIndex, 1); // Удаляем товар из массива
  res.status(204).send(); // Возвращаем статус 204 (успешно удалено) без содержимого
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
