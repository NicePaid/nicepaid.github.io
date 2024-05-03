import asyncio
import sqlite3
from aiogram import Bot, Dispatcher, executor, types


# Создание бота и диспетчера
API_TOKEN = '6858266857:AAFW2qM48sK3YoC_HEyD-rzNVQ_3ln3e5sw'
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

# Функция для отправки значения id1 пользователю, если оно меньше 6
async def send_id_value(cursor):
    try:
        # Получение значения поля id1 из базы данных
        cursor.execute("SELECT id FROM users")
        id_value = cursor.fetchone()[0]

        # Проверка значения id1 и отправка сообщения пользователю, если оно меньше 6
        if id_value < 6:
            await bot.send_message(chat_id='YOUR_CHAT_ID', text=f"Значение id: {id_value}")
    except Exception as e:
        print(f"Error while executing SQL query: {e}")


# Команда-обработчик для старта бота
@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply("Привет! Я бот, который будет отправлять вам значение поля id раз в минуту, если оно меньше 6.")

# Асинхронная функция для выполнения периодической отправки значения id1
async def periodic_task():
    # Подключение к базе данных
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    try:
        while True:
            await send_id_value(cursor)
            await asyncio.sleep(5)  # Ожидание 5 секунд перед повторным выполнением
    finally:
        # Закрытие соединения
        conn.close()

# Запуск периодической задачи
async def on_startup(dp):
    asyncio.create_task(periodic_task())

if __name__ == '__main__':
    executor.start_polling(dp, on_startup=on_startup)
