from flask import Flask, request, render_template, redirect, url_for
from models import SessionLocal, WelcomeMessage

app = Flask(__name__)

@app.route('/')
def index():
    session = SessionLocal()
    messages = session.query(WelcomeMessage).all()
    session.close()
    return render_template('index.html', messages=messages)

@app.route('/edit/<int:message_id>', methods=['GET', 'POST'])
def edit_message(message_id):
    session = SessionLocal()
    message = session.query(WelcomeMessage).filter_by(id=message_id).first()
    if request.method == 'POST':
        message_text = request.form['message']
        message.message = message_text
        session.commit()
        session.close()
        return redirect(url_for('index'))
    session.close()
    return render_template('edit.html', message=message)

@app.route('/add', methods=['GET', 'POST'])
def add_message():
    if request.method == 'POST':
        chat_id = request.form['chat_id']
        message_text = request.form['message']
        session = SessionLocal()
        new_message = WelcomeMessage(chat_id=chat_id, message=message_text)
        session.add(new_message)
        session.commit()
        session.close()
        return redirect(url_for('index'))
    return render_template('add.html')

@app.route('/info', methods=['GET', 'POST'])
def add_info():
    if request.method == 'POST':
        info_text = request.form['info']
        # обработка информации (например, сохранение в БД)
        return redirect(url_for('index'))
    return render_template('info.html')

if __name__ == '__main__':
    app.run(debug=True)
