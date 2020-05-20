'use strict';

const button = document.querySelector('.button');
const win = document.querySelector('.win__homoku');
const playerNumber = document.querySelector('.number-player');
const winPlayerText = document.querySelector('.win__text-homoku');
let currentPlayer = 1;
let pastPlayer = 2;
let firstDraw = false;
const countForWin = 5;
let moveCounter = 0;

initGame();

function initGame() {
  const section = document.querySelector('.homoku__wrapper');
  const myField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  if (!firstDraw) {
    firstDraw = true;
    drawField(myField, section);
    playerNumber.textContent = `нажми на поле, чтобы начать`;
  }

  section.addEventListener('click', event => {
    const selectedCell = event.target.closest('.homoku-cell');
    const noHover = event.target.closest('.no-hover__homoku');

    if (noHover) {
      return;
    }

    if (!selectedCell) {
      return;
    }

    playerNumber.textContent = `Ходит игрок номер ${pastPlayer}`;
    selectedCell.classList.add('no-hover__homoku');

    const x = selectedCell.dataset.x;
    const y = selectedCell.dataset.y;
    const coordsArray = [+x, +y];

    if (currentPlayer === 1) {
      myField[x][y] = currentPlayer;

      selectedCell.innerHTML = `
      <img src="images/white.jpg" alt="" width="30" class="chip">
      `;
      moveCounter++;

      if (moveCounter > 8) {
        horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }

      pastPlayer = currentPlayer;
      currentPlayer = 2;

      return;
    } else if (currentPlayer === 2) {
      myField[x][y] = currentPlayer;

      selectedCell.innerHTML = `
        <img src="images/black.jpg" alt="" width="30" class="chip">
      `;
      moveCounter++;

      if (moveCounter > 8) {
        horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }

      pastPlayer = currentPlayer;
      currentPlayer = 1;

      return;
    }
  });
}

function horizontalySearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumHoriz = 0;

  for (let i = y; i < countForWin + y; i++) {
    if (field[x][i + 1] === 0) {
      break;
    }

    if (field[x][i + 1] === pastMove) {
      break;
    }

    if (field[x][i + 1] && field[x][i + 1] === player) {
      sumHoriz++;
    }
  }

  if (sumHoriz + 1 >= countForWin) {
    showAnswer(player);

    return;
  }

  for (let i = y; i > 0; i--) {
    if (field[x][i - 1] === 0 || field[x][i - 1] === pastMove) {
      break;
    }

    if (field[x][i - 1] && field[x][i - 1] === player) {
      sumHoriz++;
    }
  }

  sumHoriz++;

  if (sumHoriz < countForWin) {
    return;
  } else {
    showAnswer(player);
  }
}

function verticalySearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumVert = 0;

  for (let i = x; i < countForWin + x; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y] === pastMove) {
      break;
    }

    if (field[i + 1][y] === 0) {
      break;
    }

    if (field[i + 1][y] && field[i + 1][y] === player) {
      sumVert++;
    }
  }

  if (sumVert + 1 >= countForWin) {
    showAnswer(player);
  }

  for (let i = x; i > 0; i--) {
    if (field[i - 1][y] === pastMove || field[i - 1][y] === 0) {
      break;
    }

    if (field[i - 1][y] && field[i - 1][y] === player) {
      sumVert++;
    }
  }

  sumVert++;

  if (sumVert < countForWin) {
    return;
  } else {
    showAnswer(player);
  }
}

function curveRightSearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumCurveR = 0;
  let countCurve = 1;

  for (let i = x; i < countForWin + x; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y - countCurve] === 0
      || field[i + 1][y - countCurve] === pastMove) {
      break;
    }

    if (field[i + 1][y - countCurve] === player) {
      countCurve++;
      sumCurveR++;
    }
  }

  if (sumCurveR + 1 >= countForWin) {
    showAnswer(player);

    return;
  }

  countCurve = 1;

  for (let i = x; i > 0; i--) {
    if (y + countCurve > field[i].length) {
      break;
    }

    if (field[i - 1][y + countCurve] === 0
      || field[i - 1][y + countCurve] === pastMove) {
      break;
    }

    if (field[i - 1][y + countCurve]
      && field[i - 1][y + countCurve] === player) {
      countCurve++;
      sumCurveR++;
    }
  }

  sumCurveR++;

  if (sumCurveR < countForWin) {
    return;
  } else {
    showAnswer(player);
  }
}

function curveLeftSearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumCurveL = 0;
  let countCurve = 1;

  for (let i = x; i < countForWin + x; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y + countCurve] === 0
      || field[i + 1][y + countCurve] === pastMove) {
      break;
    }

    if (field[i + 1][y + countCurve] === player) {
      sumCurveL++;
      countCurve++;
    }
  }

  if (sumCurveL >= countForWin) {
    showAnswer();

    return;
  }

  countCurve = 1;

  for (let i = x; i > 0; i--) {
    if (field[i - 1][y - countCurve] === 0
      || field[i - 1][y - countCurve] === pastMove) {
      break;
    }

    if (field[i - 1][y - countCurve]
      && field[i - 1][y - countCurve] === player) {
      countCurve++;
      sumCurveL++;
    }
  }

  sumCurveL++;

  if (sumCurveL < countForWin) {
    return;
  } else {
    showAnswer(player);
  }
}

function showAnswer(playerNo) {
  playerNumber.textContent = 'Победа';
  winPlayerText.textContent = `Победил игрок номер ${playerNo}`;
  win.style.display = 'block';

  return;
}

function drawField(field, element) {
  let sectionField = '';

  for (let i = 0; i < field.length; i++) {
    sectionField += `<div class="homoku-cell__wrapper">`;

    for (let j = 0; j < field[i].length; j++) {
      if (i + 1 === field.length) {
        sectionField += `
          <div class="homoku-cell" data-x="${i}" data-y="${j}"></div>
        `;
        continue;
      }

      if (j + 1 === field.length[i]) {
        sectionField += `
        <div class="homoku-cell" data-x="${i}" data-y="${j}"></div>
        `;
      } else {
        sectionField +=`
        <div class="homoku-cell" data-x="${i}" data-y="${j}"></div>
        `;
      }
    }
    sectionField += `</div>`;
  }

  element.innerHTML = `
    ${sectionField}
  `;
}

button.addEventListener('click', () => {
  moveCounter = 0;
  currentPlayer = 1;
  pastPlayer = 2;
  firstDraw = false;
  initGame();
  win.style.display = 'none';
});
