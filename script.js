  // При загрузке страницы проверяем сохраненный счет и если есть, обновляем его
  window.onload = function() {
    const savedScore = localStorage.getItem('totalScore');
    if (savedScore) {
      document.getElementById('totalScore').innerText = savedScore;
    }
  };

  document.getElementById('startGame').addEventListener('click', function() {
      window.location.href = 'round-selection.html'; // Название страницы для выбора раундов
  });
