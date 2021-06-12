class Game {
    constructor(_name, _lifes = 3, _score = 0, _currentLevel = 1, _playMusic = true, _soundEffects = true, _levelBonus) {
        this.name = _name;
        this.lifes = _lifes;
        this.score = _score;
        this.currentLevel = _currentLevel;
        this.playMusic = _playMusic;
        this.soundEffects = _soundEffects;
        this.levelBonus = _levelBonus;
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
    setCurrentLevel(_currentLevel = 1) {
        this.currentLevel = _currentLevel;
    }
    getCurrentLevel() {
        return this.currentLevel;
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
            case 4:
                return 800;
                break;
            case 5:
                return 500;
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
            case 4:
                return 40;
                break;
            case 5:
                return 50;
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
    increaseScore(_actionPoint = 5) {
        /* let scoreOfPlayer = this.score;
        let updatedScore = scoreOfPlayer + _actionPoint;
        return updatedScore; */
        this.score = this.score + parseInt(_actionPoint);
    }

    drawSlots(_firstSlot, _lastSlot) {
        return Math.round(Math.random() * (_lastSlot - _firstSlot)) + _firstSlot;

    }
    setPlayMusic(_playMusic) {
        this.playMusic = _playMusic;
    }
    setSoundEffects(_soundEffects) {
        this.soundEffects = _soundEffects;
    }
    getPlayMusic() {
        return this.playMusic;
    }
    getSoundEffects() {
            return this.soundEffects;
        }
        //criar função fora para mutar e executar

    // _levelBonus = Bônus recebido ao final da fase, caso o jogador tenha todas as vidas
    levelAward() {
        switch (this.currentLevel) {
            case 1:
                this.levelBonus = 100;
                break;
            case 2:
                this.levelBonus = 200;
                break;
            case 3:
                this.levelBonus = 300;
                break;
            case 4:
                this.levelBonus = 400;
                break;
            case 5:
                this.levelBonus = 500;
                break;
        };

        if (this.lifes < 3) {
            return this.lifes += 1
        } else {
            return this.score += this.levelBonus;
        }
    }

    rankingData() {

        return { name: this.name, score: this.score };

    }
    ismuted() {

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

    stopTimer() {
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
const newGame = new Game();
const levelTimer = new Timer();

//Audios//
const btnSelectSound = "../audio/btn-select.mp3"; // guardar o caminho como strig
const maskUpSound = "../audio/mask-up.mp3";
const levelUpSound = "../audio/level-up.mp3";
const gameStartSound = "../audio/game-start.ogg";
const virusExplosionSound = "../audio/virus-explosion.mp3";
const sprayClicksSound = "../audio/spray-click.mp3";
const gameWinSound = "../audio/game-win.mp3";
const vaxxBreakingSound = "../audio/vaxx-breaking.mp3";
const backgroundSound = "../audio/background-sound.mp3";
const increaseSound = "../audio/increase-sound.mp3";
const mainMusic = new Audio(backgroundSound);
mainMusic.volume = 0.1;
mainMusic.play();
mainMusic.loop = true;

function playAudio(sound) {
    const audioToPlay = new Audio(sound);
    audioToPlay.volume = 0.1;
    audioToPlay.play();
}

//Sequência das Configurações da Tela do Jogo
let captureContainer = document.getElementById("container");

function makeSettings() {
    captureContainer.innerHTML += `<section id="modal-configuration-sound" class="modal">
            
  <section class="modal-with-border">
      <div id="circle1" class="circles">
      </div>
      <div id="circle2" class="circles">
      </div>
      <div id="circle3" class="circles">
      </div>
      <div id="circle4" class="circles">
      </div>

      <h3 class="modal-titles">SOM</h3>

      <section id="sound-configuration" class="sound-menu">

          

            <div id="slider-sound-volume">
              <label for="sound-volume">Volume do Som:</label>
              <input type="range" min="0" max="100" value="10" class="slider" id="sound-volume">
            </div>

            

      </section>

      <button id="btn-return-game" class="return-game" onclick="closeSettings()">Voltar</button>
      
  </section>
  
</section>`
    let captureSoundVol = document.getElementById("sound-volume");

    captureSoundVol.addEventListener("change", function(e) {
        let eventVol = e.currentTarget.value / 100;
        mainMusic.volume = eventVol;
    });

};
makeSettings();

let btnReturnGame = document.getElementById("btn-return-game");
let removeBtnBox = document.getElementById("btn-box");
let captureModalConfigurations = document.getElementById("modal-configuration-sound");
captureModalConfigurations.style.display = "none";

function openSettings() {
    captureModalConfigurations.classList.add("absolute-with-blur");
    captureModalConfigurations.style.display = "flex";
    removeBtnBox.classList.add("relative-with-blur");

}

function closeSettings() {
    let captureModalConfigurations = document.getElementById("modal-configuration-sound");
    captureModalConfigurations.classList.remove("absolute-with-blur");
    captureModalConfigurations.style.display = "none";
    let removeBtnBox = document.getElementById("btn-box");

    //Tratamento de erros
    try {
        removeBtnBox.classList.remove("relative-with-blur");
    } catch (error) {
        let removeBtnBox = document.getElementById("modal-nickname");
        removeBtnBox.classList.remove("relative-with-blur");
    }
    try {
        removeBtnBox.classList.remove("relative-with-blur");
    } catch (error) {
        let removeBtnBox = document.getElementById("modal-instructions");
        removeBtnBox.classList.remove("relative-with-blur");
    }
    try {
        removeBtnBox.classList.remove("relative-with-blur");
    } catch (error) {
        let removeBtnBox = document.getElementById("game-box");
        removeBtnBox.classList.remove("relative-with-blur");
    }
}


function closeSettingsSound() {
    let modalSound = document.getElementById("modal-configuration-sound");
    modalSound.style.display = "none";
    let captureModalConfigurations = document.getElementById("modal-configuration-sound");
    captureModalConfigurations.style.display = "flex";
}
let captureSoundConfigurations = document.getElementById("btn-sound-configuration");
let captureSoundVol;

//Sequência do Jogo
let pressStart = document.getElementById("pressStart");
pressStart.addEventListener("click", () => {;
    let captureSettings = document.getElementById("sound");
    captureSettings.parentNode.removeChild(captureSettings);
    let removeBtnBox = document.getElementById("btn-box");
    removeBtnBox.parentNode.removeChild(removeBtnBox);
    captureContainer.innerHTML +=
        `<div id="modal-nickname" class="modal">
      <div class="modal-with-border">
        <div id="circle1" class="circles">        
        </div>
        <div id="circle2" class="circles">        
        </div>
        <div id="circle3" class="circles">        
        </div>
        <div id="circle4" class="circles">        
        </div>
      <h2 class="modal-titles"> Insira seu nome
      </h2>
      <div id="input-nickname" >
        <input type="text" name="nickname" id="user-input" value="Player1">           
      </div>
      <div>
          <button id="play-game" class="btn-sec" onclick="showInstructions()"> Jogar </button>
      </div>
    </div>
    </div>`
    removeBtnBox = document.getElementById("modal-nickname");
    captureModalConfigurations = document.getElementById("modal-configuration-sound");
});

function showInstructions() {
    let removeBtnBox = document.getElementById("modal-instructions");
    let captureName = document.getElementById("user-input").value;
    newGame.setName(captureName);
    let modalNickName = document.getElementById("modal-nickname");
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
        <h2 class="modal-titles"> Regras
        </h2>
        <div id="text-instructions">  
        <p>
        O vírus sai aleatóriamente de um dos slots. O(a) jogador(a) deve acertar o spray de álcool 70 no vírus que está visível, utilizando o mouse para acumular pontos.
        </p>
        <p>
        O(a) jogador(a) terá um minuto para acertar o máximo de coroninhas possível. O intervalo de tempo será constante para todas as fases, porém a velocidade em que os coroninhas aparecem, aumentará a medida que o(a) jogador(a) avançar os níveis.
        </p>
        <p>    
        Caso o(a) jogador(a) não consiga acertar o coroninha antes dele sumir, ele(a) perderá uma vida.
        Se perder todas as vidas o jogo é encerrado. Cada nível avançado irá restaurar uma das vidas, se o(a) jogador(a) estiver com as vidas completas ele(a) receberá um bônus na pontuação. O bônus será proporcional a dificuldade do nível.
        Vence o jogo quem concluir os 5 níveis.
        </p>
                  
        </div>
      <div>
          <button id="play-game" class="btn-sec" onclick="gameStart()"> Iniciar </button>
      </div>
    </div>
    </div>`
    removeBtnBox = document.getElementById("modal-instructions");
    captureModalConfigurations = document.getElementById("modal-configuration-sound");
}

let slotSequence = [];

function gameStart() {
    let userName = newGame.getName();
    newGame.setScore();
    newGame.setLifeStatus();
    let userLifes = newGame.getLifeStatus();
    let modalInstructions = document.getElementById("modal-instructions");
    modalInstructions.parentNode.removeChild(modalInstructions);
    captureContainer.innerHTML += `
    <div id="game-box">
      <section id="modal-ingame" class="modal">
      <section class="modal-with-border">
          <section class="background-with-crocodile">
            <div id="player-scoreboard">
              <h4> Nome: ${userName}</h4>
              <h4 id="score">Pontos: 0 </h4>
            </div>
            <div id="scoreboard-footer">
                <section id="modal-next-level" class="invisible">
                    <div class="orange-stroke invisible">
                    <p>Next level unlocked!</p>
                    </div>
                  </section>
                <img class="happy-crocodile invisible" src="img/happy-jacarezin.svg" id="happy" />
                <img class="happy-crocodile " src="img/Jacarezin.png"  id="normal"/>
            </div>
          </section>
          <section id="game-section">
            <div id="slot1" class="spots">
              <img src="img/spots.svg" id="hole1"/>
              <img src="img/coroninha-no-buraco.svg" id="virus1"  class="virus invisible" onclick="hitVirus(1)" />
            </div>
            <div id="slot2" class="spots">
              <img src="img/spots.svg" id="hole2"/>
              <img src="img/coroninha-no-buraco.svg" id="virus2"  class="virus invisible" onclick="hitVirus(2)" />
            </div>
            <div id="slot3" class="spots">
              <img src="img/spots.svg" id="hole3" />
              <img src="img/coroninha-no-buraco.svg" id="virus3"  class="virus invisible" onclick="hitVirus(3)" />
            </div>
            <div id="slot4" class="spots">
              <img src="img/spots.svg" id="hole4"/>
              <img src="img/coroninha-no-buraco.svg" id="virus4"  class="virus invisible" onclick="hitVirus(4)" />
            </div>
            <div id="slot5" class="spots">
              <img src="img/spots.svg" id="hole5" />
              <img src="img/coroninha-no-buraco.svg" id="virus5"  class="virus invisible" onclick="hitVirus(5)" />
            </div>
            <div id="slot6" class="spots">
              <img src="img/spots.svg" id="hole6" />
              <img src="img/coroninha-no-buraco.svg" id="virus6"  class="virus invisible" onclick="hitVirus(6)" />
            </div>
            <div id="slot7" class="spots">
              <img src="img/spots.svg" id="hole7"/>
              <img src="img/coroninha-no-buraco.svg" id="virus7"  class="virus invisible" onclick="hitVirus(7)" />
            </div>
            <div id="slot8" class="spots">
              <img src="img/spots.svg" id="hole8"/>
              <img src="img/coroninha-no-buraco.svg" id="virus8"  class="virus invisible" onclick="hitVirus(8)" />
            </div>
            <div id="slot9" class="spots">
              <img src="img/spots.svg" id="hole9" />
              <img src="img/coroninha-no-buraco.svg" id="virus9"  class="virus invisible" onclick="hitVirus(9)" />
            </div>
          </section>
        </section>
      </section>  

      <div id="right-box">
        <section id="modal-level" class="modal">
         
          <section class="modal-with-border">            
            <div id="currentLevel">
              <h4>Nível:1
              </h4>             
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
              <button id="btn-next-level" onclick="startNextLevel()">
                <img src="img/next-btn.png">
              </button>
            </div>
          </section>
        </section>
      </div>`
    removeBtnBox = document.getElementById("game-ingame");
    captureModalConfigurations = document.getElementById("modal-configuration-sound");
    let masks = document.getElementById("masks");
    for (let i = 1; i <= userLifes; i++) {
        masks.innerHTML += `<img src="img/icon-heart.png" id="mask${i}"/>`
    }
    startLevel();
};

function showVirus() {
    let drawRange = newGame.drawSlots(1, 9);
    let captureVirus = document.getElementById(`virus${drawRange}`);
    let captureHole = document.getElementById(`hole${drawRange}`);


    captureVirus.classList.add("visible");
    captureVirus.classList.remove("invisible");
    captureHole.classList.add("invisible");
    captureHole.classList.remove("visible");


    setTimeout(() => {
        let decreaseLife = document.getElementById(`masks`);
        let remainLives = '';

        if (captureVirus.classList.contains("visible") && decreaseLife.hasChildNodes()) {
            newGame.setLifeStatus((newGame.getLifeStatus() - 1));
            for (let i = 1; i <= newGame.getLifeStatus(); i++) {
                remainLives += `<img src="img/icon-heart.png" id="mask${i}" />`
            }
            decreaseLife.innerHTML = remainLives;
        }

        captureVirus.classList.add("invisible");
        captureVirus.classList.remove("visible");
        captureHole.classList.add("visible");
        captureHole.classList.remove("invisible");

        if (newGame.getLifeStatus() <= 0) {
            levelTimer.stopTimer();
            showGameLost();
        }



    }, (newGame.getIntervalByLevel() / 1.5))

}


function startLevel(level = newGame.getCurrentLevel()) {
    console.table(newGame);
    newGame.setCurrentLevel(level);
    levelTimer.setTimer(10000);
    levelTimer.setTimerInterval(newGame.getIntervalByLevel());
    levelTimer.setCallbackTimeout(finishLevel);
    levelTimer.setCallbackTimeInterval(showVirus);
    levelTimer.startTimer();

}

function finishLevel() {
    levelTimer.stopTimer();
    for (let i = 1; i <= 9; i++) {
        let clearVirus = document.getElementById(`virus${[i]}`);
        let clearHole = document.getElementById(`hole${[i]}`);
        clearVirus.classList.add("invisible");
        clearVirus.classList.remove("visible");
        clearHole.classList.add("visible");
        clearHole.classList.remove("invisible");
    }
    nextLevel();
}

function hitVirus(id, level = newGame.getCurrentLevel()) {
    newGame.getScore();
    let captureScore = document.getElementById("score");
    let captureLevel = document.getElementById("currentlevel");
    let virusValue = newGame.getPointsByLevel(level);
    let captureVirus = document.getElementById(`virus${id}`);
    let captureHole = document.getElementById(`hole${id}`);

    newGame.increaseScore(virusValue);

    captureVirus.classList.remove("visible")
    captureVirus.classList.add("invisible");
    captureHole.classList.add("visible");
    captureHole.classList.remove("invisible");
    playAudio(sprayClicksSound);
    setTimeout(() => {
        playAudio(increaseSound);
        captureScore.innerHTML = `Score: ${newGame.getScore()}`;
    }, 300);
}

function nextLevel() {
    if (newGame.getCurrentLevel() < 4) {
        const happyCrocodyle = document.getElementById("happy");
        const normalCrocodyle = document.getElementById("normal");
        const nextLevelModal = document.getElementById("modal-next-level");
        const nextLevelBtn = document.getElementById("btn-next-level");
        happyCrocodyle.style.display = "block";
        normalCrocodyle.style.display = "none";
        nextLevelModal.style.display = "flex";
        nextLevelBtn.style.display = "block";
        playAudio(gameWinSound);
        newGame.levelAward(newGame.getCurrentLevel());
    } else {
        newGame.levelAward(newGame.getCurrentLevel());
        showGameWin();
    }
}

function startNextLevel() {
    //Atualização das vidas na tela quando troca de nível.
    let upadateLives = document.getElementById(`masks`);
    let remainLives = '';
    for (let i = 1; i <= newGame.getLifeStatus(); i++) {
        remainLives += `<img src="img/icon-heart.png" id="mask${i}" />`
    }
    upadateLives.innerHTML = remainLives;

    const happyCrocodyle = document.getElementById("happy");
    const normalCrocodyle = document.getElementById("normal");
    const nextLevelModal = document.getElementById("modal-next-level");
    const nextLevelBtn = document.getElementById("btn-next-level");
    happyCrocodyle.style.display = "none";
    normalCrocodyle.style.display = "block";
    nextLevelModal.style.display = "none";
    nextLevelBtn.style.display = "none";

    newGame.setCurrentLevel(newGame.getCurrentLevel() + 1);
    let incrementedLevel = newGame.getCurrentLevel();
    startLevel(incrementedLevel);
}

function showGameLost() {
    let removeBtnBox = document.getElementById("game-box");
    removeBtnBox.classList.add(`relative-with-blur`);
    captureContainer.innerHTML += ` <div id="modal-gameover" class="modal">
  <div class="modal-with-border">
    <div id="circle1" class="circles">        
    </div>
    <div id="circle2" class="circles">        
    </div>
    <div id="circle3" class="circles">        
    </div>
    <div id="circle4" class="circles">        
    </div>
  <h2 class="modal-titles"> Game Over
  </h2>
  <div id="icon" class="sad-croco">
    <img src="/img/sad-jacarezin.svg" alt="sad crocodile">

    <p>Pontuação final: <br />
        <p class="modal-titles">${newGame.getScore()}</p>
    </p>
  </div>
  <div id="btn-retry-and-return">
      <button id="btn-return-start" class="return-start" onclick="restart()"> Reiniciar </button>
  </div>
</div>
</div>`
}

function showGameWin() {
    let removeBtnBox = document.getElementById("game-box");
    removeBtnBox.classList.add(`relative-with-blur`);
    captureContainer.innerHTML += `
  <div id="modal-gamewin" class="modal">
      <div class="modal-with-border">
        <div id="circle1" class="circles">        
        </div>
        <div id="circle2" class="circles">        
        </div>
        <div id="circle3" class="circles">        
        </div>
        <div id="circle4" class="circles">        
        </div>
      <h2 class="modal-titles"> You Won
      </h2>
      <div id="icon" class="happy-croco">
        <img src="/img/happy-jacarezin.svg" alt="happy-alligator">

        <p>Pontuação final: <br />
        <p class="modal-titles">${newGame.getScore()}</p>
        </p>
      </div>
      <div id="btn-retry-and-return">
          <button id="btn-return-start" class="return-start" onclick="restart()">Reiniciar </button>
      </div>
    </div>
    </div>`
}

function restart() {
    location.reload();
}