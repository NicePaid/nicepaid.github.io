from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils import executor
import os

API_TOKEN = '6702682084:AAFYbcYYY5ZSL-ZErBkDN-hZ1nc81EwHFJI'

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start_command(message: types.Message):
    web_app_info = types.WebAppInfo(url="https://your-domain.com/mych.html")
    keyboard = InlineKeyboardMarkup(row_width=1)
    button = InlineKeyboardButton(text="Open Mych Page", web_app=web_app_info)
    keyboard.add(button)
    await message.reply("Click the button to open Mych page.", reply_markup=keyboard)

@dp.message_handler(content_types=types.ContentType.WEB_APP_DATA)
async def web_app_data_handler(message: types.Message):
    if message.web_app_data.data == "add_to_group_or_channel":
        await message.answer("Opening menu to add to group or channel...")
        # Здесь можно добавить логику для добавления в группу или канал

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
