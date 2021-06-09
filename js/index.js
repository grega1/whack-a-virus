class Game {
  constructor(_name, _lifes = 3, _score = 0, _currentLevel) {
    this.name = _name;
    this.lifes = _lifes;
    this.score = _score;
    this.currentLevel = _currentLevel;
  }

  setName(_name) {
    this.name = _name;
  }

  getName() {
    return this.name;
  }

  setScore(_score = 0) {
    this.score = _score;
  }

  getScore() {
    return this.score;
  }
  getIntervalByLevel() {
    switch (this.currentLevel) {
      case 1:
        return 1500;
        break;
      case 2:
        return 1200;
        break;
      case 3:
        return 1000;
        break;
    }
  }
  getPointsByLevel() {
    switch (this.currentLevel) {
      case 1:
        return 10;
        break;
      case 2:
        return 20;
        break;
      case 3:
        return 30;
        break;
    }
  }

  setLifeStatus(_lifes = 3) {
    this.lifes = _lifes;
  }

  getLifeStatus() {
    return this.lifes;
  }

  //actionPoint = Pontuação recebida por destruir o alvo
  increaseScore(_actionPoint) {
    let scoreOfPlayer = this.score;
    let updatedScore = scoreOfPlayer + _actionPoint;
    return updatedScore;
  }

  drawSlots(_firstSlot, _lastSlot) {
    return Math.round(Math.random() * (_lastSlot - _firstSlot)) + _firstSlot;

  }

  // _levelBonus = Bônus recebido ao final da fase, caso o jogador tenha todas as vidas
  levelAward(_levelBonus) {
    let lifesOfPlayer = this.lifes;
    if (lifesOfPlayer < 3) {
      return this.lifes += 1
    } else {
      return this.score += _levelBonus;
    }
  }

  rankingData() {

    return { name: this.name, score: this.score };

  }
};
 //Timer
class Timer {
  constructor(_time, _currentTime, _timerInterval = 100, _callbackTimeout, _callbackTimeInterval, _internalTimer, _internalTimeout) {
    this.time = _time;
    this.currentTime = _currentTime;
    this.timerInterval = _timerInterval;
    this.callbackTimeout = _callbackTimeout;
    this.callbackTimeInterval = _callbackTimeInterval;
    this.internalTimer = _internalTimer;
    this.internalTimeout = _internalTimeout;
  }
 
  setTimer(_time) {
    this.time = _time;
  }

  setTimerInterval(_timerInterval = 100) {
    this.timerInterval = _timerInterval;
  }

  setCallbackTimeout(_callbackTimeout) {
    this.callbackTimeout = _callbackTimeout;
  }

  setCallbackTimeInterval(_callbackTimeInterval) {
    this.callbackTimeInterval = _callbackTimeInterval;
  }

  getCurrentTime() {
    return this.currentTime;

  }

  startTimer() {
    this.currentTime = this.time;
    this.internalTimeout = setTimeout(this.callbackTimeout, this.currentTime);
    this.internalTimer = setInterval(() => {
      this.currentTime -= this.timerInterval;
      this.callbackTimeInterval();
      if (this.currentTime <= 0) {
        clearInterval(this.internalTimer)
      }
    }, this.timerInterval);
    this.currentTimeString;
  }

  get stopTimer() {
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimeout);

  }

  get resetTimer() {
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimeout);
    this.time = 0;
    this.timerInterval = 100;
    this.currentTime = 0;
  }

  get currentTimeString() {
    let milliseconds = Math.floor((this.currentTime % 1000) / 10);
    let seconds = Math.floor((this.currentTime / 1000) % 60);
    let minutes = Math.floor((this.currentTime / (1000 * 60)) % 60);
    let hours = Math.floor((this.currentTime / (1000 * 60 * 60)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
}
// Instances
let newGame = new Game();
let virusTimer = new Timer();
let gameTimer = new Timer();

//Audios//
let btnSelectSound =new Audio('../audio/btn-select.wav');
let maskUpSound = new Audio('../audio/mask-up.wav');
let levelUpSound = new Audio('../audio/level-up.wav');
let gameStartSound = new Audio('../audio/game-start.ogg');
let virusExplosionSound = new Audio('../audio/virus-explosion.wav');
let sprayClicksSound = new Audio('../audio/spray-click.wav');
let gameWinSound = new Audio('../audio/game-win.wav');
let vaxxBreakingSound = new Audio('../audio/vaxx-breaking.wav');



//Manipulação das Telas do Jogo
//Sequência das Configurações da Tela do Jogo
let captureContainer = document.getElementById("container");
let captureSettings = document.getElementById("settings-button");
//captureSettings.addEventListener('click',()=>
function makeSettings() {
  captureContainer.innerHTML += ` 
            <section id="modal-configuration" class="modal">
            
            <section class="modal-with-border">
                <div id="circle1" class="circles">
                </div>
                <div id="circle2" class="circles">
                </div>
                <div id="circle3" class="circles">
                </div>
                <div id="circle4" class="circles">
                </div>

                <h3>Ajustes</h3>

                <section id="main-menu" class="main-menu">

                <button id="btn-sound-configuration" class="sound" onclick="openConfigSound()"> Sons </button>
                <button id="btn-shortcut-key" class="shortcut-key"> Teclas de Atalho</button>
                <button id="btn-help" class="menu-help">Ajuda</button>

                </section>

                <button id="btn-return-game" class="return-game">Voltar para o Jogo</button>
                
            </section>
            
        </section>`

};
makeSettings();
let captureModalConfigurations = document.getElementById("modal-configuration");
captureModalConfigurations.style.display = 'none'
function openSetting() {
  let removeBtnBox = document.getElementById('btn-box');
  removeBtnBox.classList.add(`relative-with-blur`);
  captureModalConfigurations.style.display = 'flex'
  makeSettings();

}

let captureSoundConfigurations = document.getElementById("btn-sound-configuration");
let captureShorcutKeys = document.getElementById("btn-shortcut-key");
let captureHelps = document.getElementById("btn-help");

function openConfigSound() {

  captureModalConfigurations.parentNode.removeChild(captureModalConfigurations);
  captureContainer.innerHTML += `<section id="modal-configuration" class="modal">
            
    <section class="modal-with-border">
        <div id="circle1" class="circles">
        </div>
        <div id="circle2" class="circles">
        </div>
        <div id="circle3" class="circles">
        </div>
        <div id="circle4" class="circles">
        </div>

        <h3>Sound</h3>

        <section id="sound-configuration" class="sound-menu">

            <div id="slider-main-volume">
                <label for="main-volume">Volume Principal:</label>
                <input type="range" min="1" max="100" value="50" class="slider" id="main-volume">
              </div>

              <div id="slider-sound-volume">
                <label for="sound-volume">Sound Volume:</label>
                <input type="range" min="1" max="100" value="50" class="slider" id="sound-volume">
              </div>

              <div id="slider-sound-effects">
                <label for="sound-effects">Sound Effects:</label>
                <input type="range" min="1" max="100" value="50" class="slider" id="sound-effects">
            </div>

        </section>

        <button id="btn-return-game" class="return-game">Return to Main Menu</button>
        
    </section>
    
</section>`

};

//Sequência do Jogo
let pressStart = document.getElementById("pressStart");
pressStart.addEventListener('click', () => {
  let newGame = new Game();
  let removeBtnBox = document.getElementById('btn-box');
  removeBtnBox.parentNode.removeChild(removeBtnBox);
  captureContainer.innerHTML += `<div id="modal-language" class="modal">
       <div class="modal-with-border">
         <div id="circle1" class="circles">        
         </div>
         <div id="circle2" class="circles">        
         </div>
         <div id="circle3" class="circles">        
         </div>
         <div id="circle4" class="circles">        
         </div>
       <h2 class="modal-titles"> Selecione seu idioma
       </h2>
       <div id="language" class="language-box">
         <input type="radio" name="language" id="lang-EN" value="lang-EN"> 
         <label for="lang-EN"><img src="./img/english.png" id="flag-EN" alt="">English</label>
         <input type="radio" name="language" id="lang-ptBR" value="lang-ptBR"> 
         <label for="lang-ptBR"><img src="./img/br.png" id="flag-ptBR"alt="" onclick="portugueseRoute()">Português</label>
       </div>
       <div>
           <button id="select-language" class="btn-sec" onclick="avancaLinguagem()">Continue </button>
       </div>
     </div>
     </div>`
});

let langPTBR = document.getElementById('select-language');

function portugueseRoute() {
  let modalLanguage = document.getElementById('modal-language');
  modalLanguage.parentNode.removeChild(modalLanguage);
  captureContainer.innerHTML += `<div id="modal-nickname" class="modal">
      <div class="modal-with-border">
        <div id="circle1" class="circles">        
        </div>
        <div id="circle2" class="circles">        
        </div>
        <div id="circle3" class="circles">        
        </div>
        <div id="circle4" class="circles">        
        </div>
      <h2 class="modal-titles"> Insert your nickname
      </h2>
      <div id="input-nickname" >
        <input type="text" name="nickname" id="user-input">           
      </div>
      <div>
          <button id="play-game" class="btn-sec" onclick="showInstructions()"> Play </button>
      </div>
    </div>
    </div>`
    makeSettings();
};


function showInstructions() {
  let captureName = document.getElementById("user-input").value;
  newGame.setName(captureName);
  console.log(newGame.getName());
  let modalNickName = document.getElementById('modal-nickname');
  modalNickName.parentNode.removeChild(modalNickName);
  captureContainer.innerHTML += ` <div id="modal-instructions" class="modal">
      <div class="modal-with-border">
        <div id="circle1" class="circles">        
        </div>
        <div id="circle2" class="circles">        
        </div>
        <div id="circle3" class="circles">        
        </div>
        <div id="circle4" class="circles">        
        </div>
        <h2 class="modal-titles"> Instructions
        </h2>
        <div id="text-instructions">
         
          <p>Hit corona vírus with alcohol spray to score</p>
          <p>If you break the vacine you will lose and can continue using your mask, but think fast! You will have a short to use it!</p>
          <p>Each level of dificulty clear you will win a mask</p>
                  
        </div>
      <div>
          <button id="play-game" class="btn-sec" onclick="gameStart()"> Game Start </button>
      </div>
    </div>
    </div>`
}
let slotSequence = [];

function gameStart() {
  let userName = newGame.getName();
  newGame.setScore();
  let userScore = newGame.getScore();
  newGame.setLifeStatus(3);
  let userLifes = newGame.getLifeStatus();
  let modalInstructions = document.getElementById('modal-instructions');
  modalInstructions.parentNode.removeChild(modalInstructions);
  captureContainer.innerHTML += `<header>      
      <button id="help-button">
        <img src="img/help-icon.png" />
      </button>
    </header>
    <div id="game-box">
      <section id="modal-ingame" class="modal">
        <section class="modal-with-border">
          <section class="background-with-crocodile">
            <div id="showNameAndScore">
            <h4> Name:${userName}</h4>
            <h4 id="score">Score:0 </h4>
            </div>
            <img src="img/Jacarezin.png" />
          </section>
          <section id="game-section">
            <div id="slot1" class="spots">
              <img src="img/spots.svg" id="hole1"/>
              <img src="img/coroninha-no-buraco.svg" id="virus1"  class="virus invisible" />
            </div>
            <div id="slot2" class="spots">
              <img src="img/spots.svg" id="hole2"/>
              <img src="img/coroninha-no-buraco.svg" id="virus2"  class="virus invisible" />
            </div>
            <div id="slot3" class="spots">
              <img src="img/spots.svg" id="hole3" />
              <img src="img/coroninha-no-buraco.svg" id="virus3"  class="virus invisible" />
            </div>
            <div id="slot4" class="spots">
              <img src="img/spots.svg" id="hole4"/>
              <img src="img/coroninha-no-buraco.svg" id="virus4"  class="virus invisible" />
            </div>
            <div id="slot5" class="spots">
              <img src="img/spots.svg" id="hole5" />
              <img src="img/coroninha-no-buraco.svg" id="virus5"  class="virus invisible" />
            </div>
            <div id="slot6" class="spots">
              <img src="img/spots.svg" id="hole6" />
              <img src="img/coroninha-no-buraco.svg" id="virus6"  class="virus invisible" />
            </div>
            <div id="slot7" class="spots">
              <img src="img/spots.svg" id="hole7"/>
              <img src="img/coroninha-no-buraco.svg" id="virus7"  class="virus invisible" />
            </div>
            <div id="slot8" class="spots">
              <img src="img/spots.svg" id="hole8"/>
              <img src="img/coroninha-no-buraco.svg" id="virus8"  class="virus invisible" />
            </div>
            <div id="slot9" class="spots">
              <img src="img/spots.svg" id="hole9" />
              <img src="img/coroninha-no-buraco.svg" id="virus9"  class="virus invisible" />
            </div>
          </section>
        </section>
      </section>  

      <div id="right-box">
        <section id="modal-ranking" class="modal">
         
          <section class="modal-with-border">
            <p id="title-ranking"> Top 5 Score</p>
            <div id="name-rank">
              <h4>Nome</h4>
             
            </div>
            <hr></hr>
            <div id="score-rank">
              <h4>Pontuação</h4>
            
            </div>
          </section>
        </section>
        <section id="modal-info-game" class="modal">
          <section class="modal-with-border">
            <div id="lifes">
              <h4 id=>Máscaras restantes</h4>
              <div id="masks">              
              </div>
            </div>
            <div id="time-remain">
              <h4>Tempo restante:
              <br>
              </h4>
              <p> </p>
            
            </div>
            <div id="next">
              <button id="next-level">
                <img src="img/next-btn.png">
              </button>
            </div>
          </section>
        </section>
      </div>`
  let masks = document.getElementById("masks");
  for (let i = 1; i <= userLifes; i++) {
    masks.innerHTML += `<img src="img/icon-heart.png"/>`

  }

  function showVirus() {
    const virusValue = newGame.getPointsByLevel();
    const intervalByLevel = newGame.getIntervalByLevel();
    let interval1 = setInterval(() => {
      let drawRange = newGame.drawSlots(1, 9);
      let captureVirus = document.getElementById(`virus${drawRange}`);
      let captureHole = document.getElementById(`hole${drawRange}`);
      let captureScore = document.getElementById(`score`)
      captureVirus.classList.add(`visible`);
      captureVirus.classList.remove(`invisible`);
      captureHole.classList.add(`invisible`);
      captureHole.classList.remove(`visible`);
      captureVirus.addEventListener('click', () => {
        let storageScore = newGame.increaseScore(virusValue);
        newGame.setScore(storageScore);
        captureScore.innerHTML = `Score:${newGame.getScore()}`
        console.log(newGame.getScore());
        captureVirus.classList.remove(`visible`)
        captureVirus.classList.add(`invisible`);
        captureHole.classList.add(`visible`);
        captureHole.classList.remove(`invisible`);

      })


    }, intervalByLevel)
    let interval2 = setInterval(() => {

      let drawRange = newGame.drawSlots(1, 9);
      let captureVirus = document.getElementById(`virus${drawRange}`);
      let captureHole = document.getElementById(`hole${drawRange}`);

      captureVirus.classList.add(`invisible`);
      captureVirus.classList.remove(`visible`);
      captureHole.classList.add(`visible`);
      captureHole.classList.remove(`invisible`);
    }, 2000)
    setTimeout(() => {
      clearInterval(interval1);
      clearInterval(interval2);
    }, 60000)

  };
  showVirus();
};

