'use strict';

const button = document.querySelector('.button');
const win = document.querySelector('.win');
const text = document.querySelector('.win__player');
let firstDraw = false;
const countForWin = 3;
let currentPlayer = 1;
let pastPlayer = 2;
let moveCounter = 0;
const section = document.querySelector('.tictac__wrapper');

initGame();

function initGame() {
  let myField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  if (!firstDraw) {
    firstDraw = true;
    drawField(myField, section);
  }

  section.addEventListener('click', event => {
    const selectedCell = event.target.closest('.cell');
    const noHover = event.target.closest('.no-hover');

    if (!selectedCell) {
      return;
    }

    if (noHover) {
      return;
    }

    if (moveCounter === 0) {
      myField = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    }

    selectedCell.classList.add('no-hover');

    const x = selectedCell.dataset.x;
    const y = selectedCell.dataset.y;
    const coordsArray = [+x, +y];

    if (currentPlayer === 1) {
      myField[x][y] = currentPlayer;
      selectedCell.innerHTML = `<span class="tic"></span>`;
      moveCounter++;

      if (moveCounter > 4) {
        checkDraw(myField);
        horizontalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        verticalySearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveRightSearch(myField, coordsArray, currentPlayer, pastPlayer);
        curveLeftSearch(myField, coordsArray, currentPlayer, pastPlayer);
      }
      pastPlayer = currentPlayer;
      currentPlayer = 2;

      return;
    }

    if (currentPlayer === 2) {
      myField[x][y] = currentPlayer;
      selectedCell.innerHTML = `<span class="toe"></span>`;
      moveCounter++;

      if (moveCounter > 4) {
        checkDraw(myField);
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

function checkDraw(field) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) {
        return;
      }
    }
  }
  text.textContent = `Ничья`;
  win.style.display = 'block';

  return;
}

function horizontalySearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumHoriz = 0;

  for (let i = y; i < countForWin; i++) {
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

  for (let i = y; i > 0; i--) {
    if (field[x][i - 1] && field[x][i - 1] === player) {
      sumHoriz++;
    }
  }

  sumHoriz++;

  if (sumHoriz !== countForWin) {
    return;
  } else {
    checkAnswer(player, section);
  }
}

function verticalySearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumVert = 0;

  for (let i = x; i < countForWin; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y] === pastMove || field[i + 1][y] === 0) {
      break;
    }

    if (field[i + 1][y] === player) {
      sumVert++;
    }
  }

  for (let i = x; i > 0; i--) {
    if (field[i - 1][y] && field[i - 1][y] === player) {
      sumVert++;
    }
  }

  sumVert++;

  if (sumVert !== countForWin) {
    return;
  } else {
    checkAnswer(player, section);
  }
}

function curveRightSearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumCurveR = 0;
  let countCurve = 1;

  for (let i = x; i < countForWin; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y + countCurve] === 0
      || field[i + 1][i + countCurve] === pastMove) {
      break;
    }

    if (field[i + 1][i + countCurve] === player) {
      countCurve++;
      sumCurveR++;
    }
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
      sumCurveR++;
    }
  }

  sumCurveR++;

  if (sumCurveR !== countForWin) {
    return;
  } else {
    checkAnswer(player, section);
  }
}

function curveLeftSearch(field, coords, player, pastMove) {
  const [x, y] = coords;
  let sumCurveL = 0;
  let countCurve = 1;

  for (let i = x; i < countForWin; i++) {
    if (i + 1 === field.length) {
      break;
    }

    if (field[i + 1][y - countCurve] === 0
      || field[i + 1][y - countCurve] === pastMove) {
        break;
    }

    if (field[i + 1][y - countCurve] === player) {
      countCurve++;
      sumCurveL++;
    }
  }

  countCurve = 1;

  for (let i = x; i > 0; i--) {
    if (field[i - 1][y + countCurve] === 0
      || field[i - 1][y + countCurve] === pastMove) {
        break;
    }

    if (field[i - 1][y + countCurve]
      && field[i - 1][y + countCurve] === player) {
      countCurve++;
      sumCurveL++;
    }
  }

  sumCurveL++;

  if (sumCurveL !== countForWin) {
    return;
  } else {
    checkAnswer(player, section);
  }
}

function checkAnswer(playerNo, sctn) {
  text.textContent = `Player ${playerNo} won`;
  win.style.display = 'block';
  clearField(sctn);

  return;
}

function drawField(field, element) {
  let sectionField = '';

  for (let i = 0; i < field.length; i++) {
    sectionField += `<div class="cell__wrapper">`;

    for (let j = 0; j < field[i].length; j++) {
      if (i + 1 === field.length) {
        sectionField += `
          <div class="cell" data-x="${i}" data-y="${j}"
          style="margin-bottom: 0;">
          </div>
        `;
        continue;
      }

      if (j + 1 === field.length[i]) {
        sectionField += `
        <div class="cell" data-x="${i}" data-y="${j}" style="margin-right: 0;">
        </div>
        `;
      } else {
        sectionField += `<div class="cell" data-x="${i}" data-y="${j}"></div>`;
      }
    }
    sectionField += `</div>`;
  }

  element.innerHTML = `
    ${sectionField}
  `;
}

function clearField(element) {
  element.innerHTML = ``;
}

button.addEventListener('click', () => {
  moveCounter = 0;
  currentPlayer = 1;
  pastPlayer = 2;
  firstDraw = false;
  initGame();
  win.style.display = 'none';
});
