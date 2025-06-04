function setupClickCounter() {
  let count = 0;
  const counterText = document.getElementById('click-counter') as HTMLElement;
  const button = document.getElementById(
    'increment-button'
  ) as HTMLButtonElement;

  function updateCounter() {
    count++;
    counterText.textContent = count.toString();
  }

  button.addEventListener('click', updateCounter);
}

function setupTimer() {
  const timerDisplay = document.getElementById('timer-display') as HTMLElement;
  const timerInput = document.getElementById('timer-input') as HTMLInputElement;
  const startButton = document.getElementById(
    'start-timer-button'
  ) as HTMLButtonElement;

  let countdown: number | undefined;
  let intervalId: number | undefined;

  function startCountdown() {
    const seconds = parseInt(timerInput.value);
    if (isNaN(seconds) || seconds <= 0) {
      timerDisplay.textContent = 'Ongeldig getal';
      return;
    }

    countdown = seconds;
    timerDisplay.textContent = countdown.toString();

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      if (countdown === undefined) return;

      countdown--;
      if (countdown <= 0) {
        timerDisplay.textContent = 'Tijd is om!';
        clearInterval(intervalId);
      } else {
        timerDisplay.textContent = countdown.toString();
      }
    }, 1000);
  }

  startButton.addEventListener('click', startCountdown);
}

function setupCalculator() {
  let expression = '';
  const display = document.getElementById('calculation-display') as HTMLElement;
  const buttons = document.getElementById('calculator-buttons') as HTMLElement;

  function updateDisplay(value: string) {
    display.textContent = value;
  }

  function clear() {
    expression = '';
    updateDisplay('0');
  }

  function calculate() {
    try {
      const result = eval(expression); // Alleen voor demo's – gebruik géén eval in productie
      updateDisplay(`${expression} = ${result}`);
      expression = result.toString();
    } catch {
      updateDisplay('Fout');
      expression = '';
    }
  }

  function handleButtonClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const value = target.getAttribute('data-value');
    if (!value) return;

    if (value === 'C') {
      clear();
    } else if (value === '=') {
      calculate();
    } else {
      expression += value;
      updateDisplay(expression);
    }
  }

  buttons.addEventListener('click', handleButtonClick);
}

function setupHeadingUpdater() {
  const heading = document.getElementById('dynamic-heading') as HTMLElement;
  const input = document.getElementById('heading-input') as HTMLInputElement;
  const button = document.getElementById('update-heading-button') as HTMLButtonElement;

  button.addEventListener('click', () => {
    heading.textContent = input.value;
  });
}

function main() {
  setupClickCounter();
  setupTimer();
  setupCalculator();
  setupHeadingUpdater();
}

main();
