// Массив слов и их описаний
const words = [
    { word: 'пример', description: 'Что-то, что служит образцом или моделью для подражания.' },
    { word: 'книга', description: 'Объект, состоящий из набора письменных, печатных или иллюстрированных листов бумаги, скрепленных между собой.' },
    { word: 'река', description: 'Естественный водный поток значительной протяженности, текущий в углубленном русле.' },
    // Дополнительные слова и описания
  ];
  
  let currentWordIndex;
  let selectedLetters = '';
  let totalScore = 0; // переменная для хранения счета
  
  // Обновление счета
// Обновление и сохранение счета
function updateScore(points) {
    totalScore += points;
    document.getElementById('totalScore').innerText = totalScore;
    saveScore(); // Сохраняем обновленный счет
}
  
  // Инициализация игры
  function initializeGame() {
    // Сброс предыдущего слова
    selectedLetters = '';

    const savedScore = localStorage.getItem('totalScore');
    if (savedScore) {
        totalScore = parseInt(savedScore);
        document.getElementById('totalScore').innerText = totalScore;
    }
  
    // Чтение номера раунда из localStorage и преобразование его в число
    const roundNumber = parseInt(localStorage.getItem('selectedRound'), 10);
  
    // Проверка на наличие номера раунда и его корректность
    if (isNaN(roundNumber) || roundNumber < 1 || roundNumber > words.length) {
        console.error('Invalid round number.');
        // Здесь мог бы быть код для обработки ошибки или показа сообщения пользователю 
        return;
    }
  
    // Настройка текущего индекса слова на основе номера раунда (номера раундов начинаются с 1)
    currentWordIndex = roundNumber - 1;
    const currentWord = words[currentWordIndex].word;
    const currentDescription = words[currentWordIndex].description;
  
    // Отображение описания слова
    document.getElementById('description').innerText = currentDescription;
  
    // Очистка предыдущих слотов для слов
    const wordSlots = document.getElementById('wordSlots');
    wordSlots.innerHTML = '';
  
    // Создание и отображение пустых слотов для нового слова
    for (let i = 0; i < currentWord.length; i++) {
        wordSlots.innerHTML += '<span class="blank">_</span>';
    }
  
    // Отображение букв для выбора из текущего слова
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
  
    // Перемешивание букв слова
    let letters = shuffleLetters(currentWord);
    letters.forEach(letter => {
        // Создание кнопки для каждой буквы
        let button = document.createElement('button');
        button.classList.add('letter-btn', 'btn', 'btn-primary', 'm-1');
        button.innerText = letter;
        button.addEventListener('click', () => selectLetter(letter, button));
        // Добавление кнопки в DOM
        lettersContainer.appendChild(button);
    });
}

  

  function startGame() {
    // Вы можете добавить здесь логику для показа страницы с выбором раундов.
    // Предположим, что у нас есть 5 раундов для выбора.
    let roundSelectionHTML = '<h2>Выберите раунд:</h2>';
    for (let i = 1; i <= 5; i++) {
        roundSelectionHTML += `<button onclick="startRound(${i})" class="btn btn-secondary m-2">Раунд ${i}</button>`;
    }

    // Див для выбора раунда, скрытый по умолчанию.
    document.getElementById('gameContainer').innerHTML = roundSelectionHTML;
    document.getElementById('gameContainer').classList.remove('d-none');
}

function startRound(roundNumber) {
    // Логика для начала определенного раунда
    // Эта функция пока пуста, замените ее на реальный код, который начинает раунд.
    console.log('Начало раунда: ', roundNumber);
    // Здесь будет код для инициализации раунда игры
}


  // Перемешивание букв слова
  function shuffleLetters(word) {
      let lettersArray = word.split('');
      for (let i = lettersArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
      }
      return lettersArray;
  }
  
  // Выбор буквы
// Выбор буквы
function selectLetter(letter, button) {
    const currentWord = words[currentWordIndex].word;

    let letterCountInWord = currentWord.split(letter).length - 1;
    let letterCountInSelection = selectedLetters.split(letter).length - 1;

    if (letterCountInSelection < letterCountInWord) {
        selectedLetters += letter;
        button.disabled = true; // Отключаем кнопку, чтобы избежать сбоя UI
        updateSlots();
    } else {
        button.disabled = true; // Если буква уже выбрана максимальное количество раз, отключаем её
    }

    if (selectedLetters.length === currentWord.length) {
        checkWord();
    }
}
  
  // Обновление состояния слотов для букв
  function updateSlots() {
    const slots = document.getElementById('wordSlots').children;
    for (let i = 0; i < slots.length; i++) {
        if (selectedLetters[i]) {
            slots[i].innerText = selectedLetters[i];
            slots[i].style.cursor = 'pointer'; // Стиль курсора для подсказки кликабельности
            slots[i].onclick = function() {
                removeLetter(i); // Удаление буквы по индексу
            };
        } else {
            slots[i].innerText = '_';
            slots[i].style.cursor = 'default';
            slots[i].onclick = null;
        }
    }
}

function removeLetter(index) {
    // Получаем доступ к слотам и кнопкам с буквами
    const slots = document.getElementById('wordSlots').children;
    const lettersContainer = document.getElementById('letters');

    // Определяем букву для повторного использования
    const letterToEnable = selectedLetters[index];

    // Возвращаем букву в массив доступных для выбора букв
    selectedLetters = selectedLetters.substring(0, index) + selectedLetters.substring(index + 1);
    
    // Теперь устанавливаем слот, из которого была удалена буква, в состояние "_"
    slots[index].innerText = "_";

    // Поиск и включение соответствующей кнопки буквы
    const letterButtons = lettersContainer.getElementsByClassName('letter-btn');
    for (let button of letterButtons) {
        if (button.innerText === letterToEnable && button.disabled) {
            button.disabled = false;
            break;
        }
    }

    // Обновляем слоты, чтобы отобразить изменения
    updateSlots();
}

  // Проверка слова
// Проверка слова и переход к следующему раунду
function checkWord() {
    if (selectedLetters === words[currentWordIndex].word) {
        updateScore(10); // Правильное слово добавляет 10 очков
        alert('Вы угадали! Слово: ' + selectedLetters);

        // Устанавливаем и сохраняем номер следующего раунда
        const nextRoundNumber = currentWordIndex + 2; // "+ 2" потому что массив начинается с 0, а раунды с 1
        localStorage.setItem('selectedRound', String(nextRoundNumber)); 

        // Проверяем, что следующий раунд не выходит за границы массива
        if (nextRoundNumber <= words.length) {
            initializeGame(); // Запуск следующего раунда
        } else {
            alert('Вы прошли все раунды! Ваш итоговый счёт: ' + totalScore);
            // Здесь код для перезапуска игры с первого раунда или завершения игры
        }
    } else {
        updateScore(-5); // Неправильное слово вычитает 5 очков
        alert('Попробуйте еще раз.');
        initializeGame(); // Повторить раунд
    }
}

// Функция подсказки, которая открывает следующую неоткрытую букву в слове
function useHint() {
    if (totalScore >= 5) { // Стоимость подсказки – 5 баллов
        const slots = document.getElementById('wordSlots').children;
        const currentWord = words[currentWordIndex].word;
        for (let i = 0; i < slots.length; i++) {
            if (slots[i].innerText === "_") {
                slots[i].innerText = currentWord[i];
                selectedLetters += currentWord[i]; // Добавляем букву в выбранные
                updateScore(-5); // Отнимаем баллы за использование подсказки
                break;
            }
        }
    } else {
        alert("Недостаточно баллов для использования подсказки!");
    }
}

// Сохранить счет в localStorage
function saveScore() {
    localStorage.setItem('totalScore', totalScore);
  }

  
  
  // Запуск игры при полной загрузке страницы
  window.onload = initializeGame;
