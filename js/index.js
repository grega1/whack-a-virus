//Classe para instanciar o jogador com nome e pontuação

class Player {

    setName(_name) {
      this.name = _name;
    }
  
    getName() {
      return this.name
    }
  
    setScore(_score = 0) {
      this.score = _score
    }
  
    getScore() {
      return this.score
    }
  
    increaseScore(scoreOfPlayer) {
      scoreOfPlayer = player1.getScore();
      let updatedScore = scoreOfPlayer + actionPoint;
      return updatedScore;
    }
  
  }
  
  let player1 = new Player();
  player1.setName(prompt("Qual o seu nome")); //Substituir pela entrada HTML
  player1.setScore();
  
  let actionPoint = (Number(prompt("Insira o valor de teste (Action Point)"))); //Variável que receberá a pontuação da destrução do alvo
  
  player1.setScore(player1.increaseScore());
  
  console.log(player1);
  