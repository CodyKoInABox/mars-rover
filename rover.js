//definicao de variaveis
let currentPosition = 0;
let array = [];
let left = -1;
let right = 1;
let forward = -4;
let backward = 4;
let firstprint = true;

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
        if(positionTest>=0 && positionTest<=15){
            currentPosition = currentPosition + movementValue;
        }
        else{
            movementValue = positionBackup
        }
    }

    console.log(currentPosition);
    //essa parte muda o mapa, eu sinto que tem algum jeito menos extenso de fazer isso
    switch(currentPosition){

    case 0:
        document.getElementById("map").src="map0.png";
        break;
        case 1:
            document.getElementById("map").src="map1.png";
            break;
            case 2:
                document.getElementById("map").src="map2.png";
                break;
                case 3:
                    document.getElementById("map").src="map3.png";
                    break;
                    case 4:
                        document.getElementById("map").src="map4.png";
                        break;
                        case 5:
                            document.getElementById("map").src="map5.png";
                            break;
                            case 6:
                                document.getElementById("map").src="map6.png";
                                break;
                                case 7:
                                    document.getElementById("map").src="map7.png";
                                    break;
                                    case 8:
                                        document.getElementById("map").src="map8.png";
                                        break;
                                        case 9:
                                            document.getElementById("map").src="map9.png";
                                            break;
                                            case 10:
                                                document.getElementById("map").src="map10.png";
                                                break;
                                                case 11:
                                                    document.getElementById("map").src="map11.png";
                                                    break;
                                                    case 12:
                                                        document.getElementById("map").src="map12.png";
                                                        break;
                                                        case 13:
                                                            document.getElementById("map").src="map13.png";
                                                            break;
                                                            case 14:
                                                                document.getElementById("map").src="map14.png";
                                                                break;
                                                                case 15:
                                                                    document.getElementById("map").src="map15.png";
                                                                    break;
        
    }

    //atualiza o texto de posicao para mostrar a posicao do rover
    document.getElementById("position").innerHTML = "Posicao = " + currentPosition;
    //limpa a lista de movimentos pendentes, lembrando que essa lista server apenas para auxiliar o usuario
    document.getElementById("historico").innerHTML = "Movimentos pendentes: ";
    //limpa a lista de movimentos a serem executados
    array = [];
    //volta a variavel "firstprint" para true, desse jeito, o proximo movimento na lista de movimentos pendentes NAO tera uma virgula antes
    firstprint = true;
}