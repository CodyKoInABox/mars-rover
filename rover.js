//definicao de variaveis
let currentPosition = 0;
let array = [];
let left = -1;
let right = 1;
let forward = -4;
let backward = 4;
let firstprint = true;
let canGoRight = true;
let canGoLeft = false;
//eu sinto que tem um jeito menos extenso de definir estas variaveis
let map0 = "map0.png";
let map1 = "map1.png";
let map2 = "map2.png";
let map3 = "map3.png";
let map4 = "map4.png";
let map5 = "map5.png";
let map6 = "map6.png";
let map7 = "map7.png";
let map8 = "map8.png";
let map9 = "map9.png";
let map10 = "map10.png";
let map11 = "map11.png";
let map12 = "map12.png";
let map13 = "map13.png";
let map14 = "map14.png";
let map15 = "map15.png";
let mapArray = [map0, map1, map2, map3, map4, map5, map6, map7, map8, map9, map10, map11, map12, map13, map14, map15];

//funcao que envia o comando "mover para esquerda" para a lista de comandos a serem executados, as proximas 3 funcoes seguem a mesma formatacao
function esquerda(){
    //envia a variavel "left" para a lista de comandos a serem executados. Ou seja, envia o valor -1 para uma array de nome "array"
    array.push(left);
    //o IF serve para adicionar uma virgula na lista de comandos pendentes caso NAO SEJA a primeira palavra, desse jeito, a lista so tem virgula DEPOIS de cada palavra
    if(firstprint == false){
        document.getElementById("historico").innerHTML += ", ";
    }
    //adiciona a palavra "Esquerda" na lista de comandos pendentes, essa lista serve apenas para auxiliar o usuario e nao tem nenhum impacto no funcionamento
    document.getElementById("historico").innerHTML += "Esquerda";
    //torna a variavel "firstprint" falsa, essa variavel foi e sera utilizada no IF para adicionar virgulas na lista de comandos pendentes
    firstprint = false;
}

//funcao que envia o comando "mover para direita" para a lista de comandos a serem executados, as proximas 2 funcoes seguem a mesma formatacao
function direita(){
    //envia a variavel "right" para a lista de comandos a serem executados. Ou seja, envia o valor 1 para uma array de nome "array"
    array.push(right);
    //o IF serve para adicionar uma virgula na lista de comandos pendentes caso NAO SEJA a primeira palavra, desse jeito, a lista so tem virgula DEPOIS de cada palavra
    if(firstprint == false){
        document.getElementById("historico").innerHTML += ", ";
    }
    //adiciona a palavra "Direita" na lista de comandos pendentes, essa lista serve apenas para auxiliar o usuario e nao tem nenhum impacto no funcionamento
    document.getElementById("historico").innerHTML += "Direita";
    //torna a variavel "firstprint" falsa, essa variavel foi e sera utilizada no IF para adicionar virgulas na lista de comandos pendentes
    firstprint = false;
}

//funcao que envia o comando "mover para frente" para a lista de comandos a serem executados, as proxima funcao segue a mesma formatacao
function frente(){
    //envia a variavel "forward" para a lista de comandos a serem executados. Ou seja, envia o valor -4 para uma array de nome "array"
    array.push(forward);
    //o IF serve para adicionar uma virgula na lista de comandos pendentes caso NAO SEJA a primeira palavra, desse jeito, a lista so tem virgula DEPOIS de cada palavra
    if(firstprint == false){
        document.getElementById("historico").innerHTML += ", ";
    }
    //adiciona a palavra "Frente" na lista de comandos pendentes, essa lista serve apenas para auxiliar o usuario e nao tem nenhum impacto no funcionamento
    document.getElementById("historico").innerHTML += "Frente";
    //torna a variavel "firstprint" falsa, essa variavel foi e sera utilizada no IF para adicionar virgulas na lista de comandos pendentes
    firstprint = false;
}

//funcao que envia o comando "mover para tras" para a lista de comandos a serem executados
function tras(){
    //envia a variavel "backward" para a lista de comandos a serem executados. Ou seja, envia o valor 4 para uma array de nome "array"
    array.push(backward);
    //o IF serve para adicionar uma virgula na lista de comandos pendentes caso NAO SEJA a primeira palavra, desse jeito, a lista so tem virgula DEPOIS de cada palavra
    if(firstprint == false){
        document.getElementById("historico").innerHTML += ", ";
    }
    //adiciona a palavra "Tras" na lista de comandos pendentes, essa lista serve apenas para auxiliar o usuario e nao tem nenhum impacto no funcionamento
    document.getElementById("historico").innerHTML += "Tras";
    //torna a variavel "firstprint" falsa, essa variavel foi e sera utilizada no IF para adicionar virgulas na lista de comandos pendentes
    firstprint = false;
}

//funcao que move o rover utilizando uma lista de comandos criada pelas 4 funcoes anteriores
function enviar(){
    //cria um backup da posicao atual
    let positionBackup = currentPosition;
    for(let i = 0; i<array.length; i++){
        //faz com que o valor de movimento seja igual ao movimento a ser executado, ou seja, igual a algum valor da lista (array) de movimentos a serem executados
        let movementValue = parseFloat(array[i]);
        //testa a posicao para garantir que o rover nao saia da matriz a seguir:
        //00-01-02-03
        //04-05-06-07
        //08-09-10-11
        //12-13-14-15
        let positionTest = currentPosition + movementValue;
        
        //um IF ELSE que move o rover caso o teste de posicao de um resultado entre 0 e 15 ou mantem o rover na mesma posicao em caso de algum outro resultado
        //tambem checa se o rover esta em alguma borda da matriz, caso esteja, nao deixa usar o movimento lateral para ir para a linha de baixo ou de cima
        if(positionTest<0 || positionTest>15 || canGoRight == false && movementValue == 1 || canGoLeft == false && movementValue == -1){ 
            movementValue = positionBackup
        }
        else{
            currentPosition = currentPosition + movementValue;
        }

        //ela tambem muda a bool que define se o rover esta em alguma borda da matriz, caso esteja, o IF ELSE acima nao vai deixar com que ele se mova verticalmente usando movimentos laterais
        //eu sinto que tem algum jeito menos extenso de fazer isso, mas ainda nao consegui implementar sem dar erro
        switch(currentPosition){

            case 0:
                canGoRight = true;
                canGoLeft = false;
                break;
                case 1:
                    canGoRight = true;
                    canGoLeft = true;
                    break;
                    case 2:
                        canGoRight = true;
                        canGoLeft = true;
                        break;
                        case 3:
                            canGoRight = false;
                            canGoLeft = true;
                            break;
                            case 4:
                                canGoRight = true;
                                canGoLeft = false;
                                break;
                                case 5:
                                    canGoRight = true;
                                    canGoLeft = true;
                                    break;
                                    case 6:
                                        canGoRight = true;
                                        canGoLeft = true;
                                        break;
                                        case 7:
                                            canGoRight = false;
                                            canGoLeft = true;
                                            break;
                                            case 8:
                                                canGoRight = true;
                                                canGoLeft = false;
                                                break;
                                                case 9:
                                                    canGoRight = true;
                                                    canGoLeft = true;
                                                    break;
                                                    case 10:
                                                        canGoRight = true;
                                                        canGoLeft = true;
                                                        break;
                                                        case 11:
                                                            canGoRight = false;
                                                            canGoLeft = true;
                                                            break;
                                                            case 12:
                                                                canGoRight = true;
                                                                canGoLeft = false;
                                                                break;
                                                                case 13:
                                                                    canGoRight = true;
                                                                    canGoLeft = true;
                                                                    break;
                                                                    case 14:
                                                                        canGoRight = true;
                                                                        canGoLeft = true;
                                                                        break;
                                                                        case 15:
                                                                            canGoRight = false;
                                                                            canGoLeft = true;
                                                                            break;
                
            }
    }

    //mudar a imagem do mapa para o mapa correspondente a posicao atual, baseado em uma array de imagens
    document.getElementById("map").src=mapArray[currentPosition];

    //atualiza o texto de posicao para mostrar a posicao do rover
    document.getElementById("position").innerHTML = "Posicao = " + currentPosition;
    //limpa a lista de movimentos pendentes, lembrando que essa lista server apenas para auxiliar o usuario
    document.getElementById("historico").innerHTML = "Movimentos pendentes: ";
    //limpa a lista de movimentos a serem executados
    array = [];
    //volta a variavel "firstprint" para true, desse jeito, o proximo movimento na lista de movimentos pendentes NAO tera uma virgula antes
    firstprint = true;
}