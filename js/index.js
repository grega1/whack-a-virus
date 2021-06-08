class Game {
  constructor(_name, _lifes = 3, _score, _time, _currentTime, _timerInterval = 100, _callbackTimeout, _callbackTimeInterval, _internalTimer, _internalTimeout) {
    this.name = _name;
    this.lifes = _lifes;
    this.score = _score;
    this.time = _time;
    this.currentTime = _currentTime;
    this.timerInterval = _timerInterval;
    this.callbackTimeout = _callbackTimeout;
    this.callbackTimeInterval = _callbackTimeInterval;
    this.internalTimer = _internalTimer;
    this.internalTimeout = _internalTimeout;
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

  //Timer
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


  rankingData() {

    return { name: this.name, score: this.score };

  }
};


let newGame = new Game();
//Manipulação das Telas do Jogo

//
let pressStart = document.getElementById("pressStart");
let captureContainer = document.getElementById("container");
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
//langPTBR.addEventListener('click',
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
function gameStart() {
  let userName = newGame.getName();
  newGame.setScore();
  let userScore = newGame.getScore();
  newGame.setLifeStatus(1);
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
            <h4> Score:${userScore}</h4>
            </div>
            <img src="img/croco.png" />
          </section>
          <section id="game-section">
            <div id="slot1" class="spots">
              <img src="img/spots.svg" id="hole1"/>
              <img src="img/coroninha-no-buraco.svg" id="virus1"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot2" class="spots">
              <img src="img/spots.svg" id="hole2"/>
              <img src="img/coroninha-no-buraco.svg" id="virus2"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot3" class="spots">
              <img src="img/spots.svg" id="hole3" />
              <img src="img/coroninha-no-buraco.svg" id="virus3"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot4" class="spots">
              <img src="img/spots.svg" id="hole4"/>
              <img src="img/coroninha-no-buraco.svg" id="virus4"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot5" class="spots">
              <img src="img/spots.svg" id="hole5" />
              <img src="img/coroninha-no-buraco.svg" id="virus5"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot6" class="spots">
              <img src="img/spots.svg" id="hole6" />
              <img src="img/coroninha-no-buraco.svg" id="virus6"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot7" class="spots">
              <img src="img/spots.svg" id="hole7"/>
              <img src="img/coroninha-no-buraco.svg" id="virus7"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot8" class="spots">
              <img src="img/spots.svg" id="hole8"/>
              <img src="img/coroninha-no-buraco.svg" id="virus8"  class="virus invisible" onclick="console.log('oi')"/>
            </div>
            <div id="slot9" class="spots">
              <img src="img/spots.svg" id="hole9" />
              <img src="img/coroninha-no-buraco.svg" id="virus9"  class="virus invisible" onclick="console.log('oi')"/>
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

  /*{
    let clock = clocks[id];
    let convertedDisplay = parseInput(id);
  
    clock.setTimer(convertedDisplay);
    clock.setTimerInterval();
  
    clock.setCallbackTimeInterval(() => {
      timers[id].value = clock.currentTimeString;
    });
  
    clock.setCallbackTimeout(() => {
      audio();
    });
    clock.startTimer();
  }*/
  let slotSequence = [];
  for (let i = 0; i < 20; i++) {
  let drawRange = newGame.drawSlots(1, 9);
  slotSequence.push(drawRange);
  }
console.log(slotSequence);
function showVirus() {
  
  for(let i= 0; i < slotSequence.length; i++){
    /*let slotNumber = slotSequence[i];
    console.log(slotNumber);
    let captureVirus = document.getElementById(`virus${slotNumber}`);
    let captureHole = document.getElementById(`hole${slotNumber}`);*/
    //let captureVirus = document.getElementById(`virus${i}`);
   //let removeVirus = captureVirus.parentNode.removeChild(captureVirus);   
      let interval1 =setInterval(() => {    
        let slotNumber = slotSequence[i];
        console.log(slotNumber);
        let captureVirus = document.getElementById(`virus${slotNumber}`);
        let captureHole = document.getElementById(`hole${slotNumber}`);  
        captureVirus.classList.add(`visible`);
        captureVirus.classList.remove(`invisible`);
        captureHole.classList.add(`invisible`);
        captureHole.classList.remove(`visible`);  
                      
      },100*i)
    let interval2 = setInterval(() => { 
      let slotNumber = slotSequence[i];
      let captureVirus = document.getElementById(`virus${slotNumber}`);
      let captureHole = document.getElementById(`hole${slotNumber}`);  
      captureVirus.classList.add(`invisible`);
      captureVirus.classList.remove(`visible`);
      captureHole.classList.add(`visible`);
      captureHole.classList.remove(`invisible`);
     },2000*i) 
       setTimeout(()=>{
        clearInterval(interval1);
        clearInterval(interval2);
        },10000*i)
};
};
  showVirus();
};

//Faz o virus aparecer
/*function showVirus() {
  
  for(let i= 0; i < slotSequence.length; i++){
    let slotNumber = slotSequence[i];
    let slotVirus = document.getElementById(`slot${slotNumber}`);
    slotVirus.innerHTML += `<img src="img/virus-icon.svg"  class="virus"/>`
      newGame.setCallbackTimeOut(()=>{
        slotVirus.innerHTML -= `<img src="img/virus-icon.svg"  class="virus"/>`
    },3000)
    newGame.setCallbackTimeOut(()=>{},2000)
  }
};*/
//sorteio da lista de aparições do vírus