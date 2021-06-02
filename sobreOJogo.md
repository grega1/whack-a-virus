# WHACK A VIRUS
    - Objetivo:
    Matar o coroninha utilizando o spray de álcool 70, para acumular pontos e garantir uma colocação no ranking, que terá a exibição das 5 primeiras posições.

    - Como funciona?
    O vírus sai aleatóriamente de um dos slots. A pessoa que estiver jogando deve acertar o spray de álcool 70 no vírus que está visível, utilizando o mouse ou uma das teclas de atalho previamente configuradas por ela.

    A pessoa terá um determinado intervalo de tempo para acertar o máximo de coroninhas possível e atingir uma pontuação mínima para passar de fase. O intervalo de tempo será constante para todas as fases, porém a velocidade em que os coroninhas aparecem, aumentará a medida que a pessoa avançar os níveis.

    Caso a pessoa não consiga acertar o coroninha antes dele sumir, a pessoa perderá uma vida. Cada nível avançado irá restaurar uma das vidas, caso a pessoa esteja com as vidas completas ela receberá um bônus na pontuação. O bônus será proporcional a dificuldade do nível.

    
FLUXO DO JOGO

Passo 1: (PRESS TO START)

    Através do botão principal da tela inicial, a pessoa será direcionada para o modal de configuração de linguagem.

Passo 2: (SELECIOANR A LINGUAGEM)

    A pessoa escolherá entre os idiomas Inglês e Português

Passo 3: (CONFIGURAÇÃO DAS TECLAS DE ATALHO)

    A pessoa deverá relacionar cada slote a tecla de atalho de sua preferência
    
Passo 4: (INSERIR O NOME)

    Antes de iniciar a partida o nome deverá ser registrado para possibilitar a identificação no ranking.

Passo 5 - Ação principal: (JOGAR)

    A pessoa iniciará o jogo

Passo 5 - Ação secundária: (INSTRUÇÕES)

    Caso deseje, a pessoa poderá ter acesso as instruções antes de iniciar a partida

Passo 6:

    Utilizando o mouse e/ou as teclas de atalho, a pessoa deverá matar o máximo de coroninhas possível, no tempo determinado, afim de acumular pontos para passar de nível. O jogo acaba caso a pessoa perca todas as vidas ou não acumule pontos suficientes para passar para o próximo nível.

ENTRADAS

    1. Nome (Deve ser armazenado em um objeto que conterá o nome e a pontuação do jogador)
    Instanciar um novo objeto com as características acima.

    2. Linguagem
    Botões que disparam um evento para mudar a linguagem do jogo.

    3. Teclas de atalho
    Inputs tipo texto, que ao o receber conteúdo de uma tecla a armazenará (para os eventos de keyUp e keyDown).

    4. Sons
    Inputs tipo slider para ajustar o volume (volume principal, volume do some e efeitos sonoros).

    5. Vidas
    Settadas no início da partida ou no início de cada fase, dependendo da quantidade de vidas que ela possui. (só restaura no início de cada fase, caso não estejam completas).

    6. Hit
    Ao clicar em um dos slots ou apertar a tecla relacionada a este, será disparado o evento que incrementará a pontuação e substituirá a imagem, pela animação do coroninha destruído.

PROCESSAMENTO

    1. Linguagem
    Configuração para alternar a linguagem.

    2. Função para configuração das teclas de atalho

    3. Pontuação
    Função para manter a pontuação do jogador atualizada

    4. Iniciar o Timer

    5. Exibir os coroninhas aleatoriamente
    Configurar as funções responsáveis por exibir os alvos. (Definir a quantidade de coroninhas para a quantidade de slotes).

    6. Destruição do alvo
    Criação das funções que: incrementam a pontuação e substitui a imagem do alvo pela animação do alvo destruído.

    7. Trocar de fases
    De acordo com a finalização do tempo e pontuação mínima atingida.

    8. Dificuldade de cada nível
    Função para variar a velocidade em que os coroninhas aparecem.

    9. Incremento da pontuação
    Criação da função que incrementa a pontuação e substitui a imagem do coroninha pela animação do coroninha destruído.

    10. Premição de conclusão de nível
    Função para restaurar uma vida, caso esteja incompleta ou adicionar um bônus a pontuação caso esteja completa.


SAÍDAS

    1. Linguagem (será exibida no jogo, de acordo com a escolha do usuário)
    
    2. Sons
    Efeitos sonoros e música que serão executados ao longo do jogo

    3. Coroninhas
    Imagens que aparecerão aleatoriamente com o objetivo de receberem o click.

    4. Coroninha animations
    Animação que será exibida quando a pessoa click no lugar correto.

    5. Incremento da pontuação
    Função para incrementar a pontuação cada vez que um coroninha for atingido.

    6. Vidas
    Exibição das máscaras de acordo com a quantidade de vidas que a pessoa tem.

    7. Tempo
    Exibição do tempo restante para o encerramento da fase

    8. Ranking