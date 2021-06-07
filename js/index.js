class Game {
    constructor(_name, _lives = 3, _score, _time, _currentTime, _timerInterval = 100, _callbackTimeout, _callbackTimeInterval, _internalTimer, _internalTimeout) {
      this.name = _name;
      this.lives = _lives;
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
  
  setLifeStatus(_lives = 3) {
    this.lives = _lives;
  }
  
  getLifeStatus() {
    return this.lives;
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
    let livesOfPlayer = this.lives;
    if (livesOfPlayer < 3) {
      return this.lives += 1
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
  
    return {name: this.name, score: this.score};
  
  }
  };
  
    
    
  let newGame = new Game();
  