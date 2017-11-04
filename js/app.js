// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0; //posicao em relacao ao eixo x
    this.y = 0; //posicao em relacao ao eixo y
    this.speed = 50 + Math.floor(56 * Math.random()); // velocidade do inimigo
    this.line = Math.floor(3 * Math.random()); // indice aleatorio para o array position
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //atualiza o local do inimigo
    if(this.x <= 505){ // se objeto nao atingiu o fim da linha, ele é incrementado
        this.x = (this.x + this.speed * dt);
    }else { // se chegou ao fim da linha ele volta ao inicio
        this.reset();
    }
    // controla a colisão
    this.colision();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // array com a posicao das tres linhas onde passam os inimigos
    var position = [60, 150, 230];
    // a posicao do inimigo e escolhido aleatoriamente
    this.y = position[this.line];
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// reseta as propriedades do objeto
Enemy.prototype.reset = function(){
    this.x = 0; // faz com que o objeto retorne ao inicio da linha
    this.speed = 50 + Math.floor(56 * Math.random()); //velocidade
    this.line = Math.floor(3 * Math.random()); // indice para o array de linhas dos inimigos
};
// controle de colisao
Enemy.prototype.colision = function(){
    // dimensoes da imagem
    var width = 101;
    var height = 171;
    // se houver colisao, o jogador é resetado
    if (this.x + (width - 2) > player.x + 16 && // colisao pela direita
        this.x + 3  < player.x + (width - 16)  && // colisao pela esq
        this.y + (height - 26) > player.y + 62 && // colisao por baixo
        this.y + 78 < player.y + (height - 29)){// colisao pela cima

        player.reset();
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200; // posicao do eixo x
    this.y = 380; // posicao do eixo y
    this.key = ' '; // controla a tecla acionada
    this.pontos = 0; // pontuação do jogador
};
// reseta as propriedades do objeto
Player.prototype.reset = function(){
    this.x = 200; //posicao em relacao ao eixo x
    this.y = 380; //posicao em relacao ao eixo y
    this.pontos = 0;
};
// atualiza o objeto jogador
Player.prototype.update = function(){
    if (this.y >= 20) { // se o jogador nao chegou a agua, segue o jogo
        if (this.key == 'up') { // move para cima
            this.y -= 20;
        }
        if (this.key == 'down' && this.y <= 410) { // move para baixo
            this.y += 20;
        }
        if (this.key == 'left' && this.x >= 0) { // move para esquerda
            this.x -= 20;
        }
        if (this.key == 'right' && this.x <= 406) { // move para direita
            this.x += 20;
        }

        this.key = ' '; // limpa a variavel de tecla pressionada
    }else { // se o jogador chegou na agua ele ganhou
        this.pontos++; // soma da pontuaçao
        // reseta a posicao do jogador
        this.x = 200;
        this.y = 380;
    }
};
// desenha na tela
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // desenha o objeto
    ctx.font = '38px serif';
    ctx.fillText(this.pontos, 20, 90); // desenha o texto de pontuaçao
};

Player.prototype.handleInput = function(event){
    this.key = event;// a propriedade do objeto recebe a tecla acionada
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
// inimigos
var allEnemies = [bug1, bug2, bug3];
// jogador
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
