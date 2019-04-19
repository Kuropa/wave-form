const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const getDescription = code => {
  switch (code) {
    case 'WRONG_LOGIN':
      return 'Такого логина не существует';
    case 'WRONG_PASS':
      return 'Неверный пароль';
    case 'SUCCESS':
      return 'Вы успешно залогинились';
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', function(req, res) {
  const { login, password } = req.body;
  console.log(`Попытка входа с логином ${login} и паролем ${password}`);

  let code;
  if (login.toLowerCase() === 'sveta') {
    if (password === '1234') {
      code = 'SUCCESS';
    } else {
      code = 'WRONG_PASS';
    }
  } else {
    code = 'WRONG_LOGIN';
  }

  console.log(`Результат: `, code);
  res.send(getDescription(code));
});

app.listen(3000, function () {
  console.log('Приложение запущено локально по адресу http://localhost:3000/');
});
