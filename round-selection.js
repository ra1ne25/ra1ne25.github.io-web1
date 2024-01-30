const words = [
    { word: 'пример', description: 'Что-то, что служит образцом или моделью для подражания.' },
    { word: 'книга', description: 'Объект, состоящий из набора письменных, печатных или иллюстрированных листов бумаги, скрепленных между собой.' },
    { word: 'река', description: 'Естественный водный поток значительной протяженности, текущий в углубленном русле.' },
    // Дополнительные слова и описания
  ];

function createRoundButtons() {
    const roundsContainer = document.getElementById('rounds');
    words.forEach((_, index) => {
        const button = document.createElement('button');
        button.textContent = `Раунд ${index + 1}`;
        button.className = "round-button btn btn-primary mb-3";
        button.onclick = () => startRound(index + 1);
        roundsContainer.appendChild(button);
    });
}

function startRound(roundNumber) {
    console.log("Выбран раунд №" + roundNumber);
    localStorage.setItem('selectedRound', roundNumber);
    window.location.href = 'game.html';
}

window.onload = createRoundButtons;