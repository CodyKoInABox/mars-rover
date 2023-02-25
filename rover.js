//as partes mais novas do codigo estao bem baguncadas e sem muitos comentarios, no futuro talvez eu organize tudo


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
let rightBorder = [3, 7, 11, 15];
let mode = false;
let delay = false;
let delaytime = undefined;
let dateDifferenceSeconds = 0;
let delaySeconds;
let delayKilometers;
let delayValue = 5;
//le o cache do navegador para ver se o usuario ja usou o site antes, caso tenha usado, "lembra" de qual modo o usuario usou por ultimo e tambem lembra da ultima posicao do rover
mode = localStorage.mode;
delay = localStorage.delay;
delaytime = parseInt(localStorage.delayTime);
currentPosition = parseInt(localStorage.currentPosition);

let newDate = new Date();
let oldDate = localStorage.oldDate;

function bodyOnLoad(){  
    updateDelaySeconds();
    setmode();
    if(delay == "true"){
        dateDifference();
        applyDateDifference();
    }
    else{
        return;
    }
}

//executa a funcao beforeClose() quando o usuario fecha a aba
window.onbeforeunload = function beforeClose(){
    oldDate = new Date();
    localStorage.setItem("oldDate", oldDate);
    localStorage.setItem("delayTime", delaytime);

    //o return null evita que um pop-up seja aberto e acabe impedindo com que o usuario feche a aba
    return null;
}

//descobre a diferenca entre duas datas em segundos
function dateDifference(){
    dateDifferenceSeconds =(Date.parse(oldDate) - Date.parse(newDate))/1000
}

function applyDateDifference(){
        delaytime = delaytime + dateDifferenceSeconds;
        buttonDisable();
        enviardelay();
}


//funcao visual, ela apenas mostra ao usuario qual modo esta selecionado, se o cache do navegador indicar que o modo deve ser o B, o switch que tem na tela vai automaticamente para a posicao B
function setmode(){
    if(delay == "true"){
        document.getElementById("delayswitch").checked = true;
    }
    else{
        document.getElementById("delayswitch").checked = false; 
    }


    if(mode == "true"){
        document.getElementById("modeswitch").checked = true;
    }
    else{
        document.getElementById("modeswitch").checked = false; 
    }

    //verifica se e a primeira vez que o usuario acessa o site, se for, a posicao sera 0
    if(Number.isInteger(currentPosition) !== true){
        currentPosition = 0;
    }

    //chama a funcao que atualiza a posicao do rover baseado no cache do navegador
    positionUpdate()
}

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

function buttonDisable(){
    document.getElementById("enviar").disabled=true;
    document.getElementById("frente").disabled=true;
    document.getElementById("tras").disabled=true;
    document.getElementById("esquerda").disabled=true;
    document.getElementById("direita").disabled=true;
}

function buttonEnable(){
    document.getElementById("enviar").disabled=false;
    document.getElementById("frente").disabled=false;
    document.getElementById("tras").disabled=false;
    document.getElementById("esquerda").disabled=false;
    document.getElementById("direita").disabled=false;
}

function preenviar(){
    if(delay=="true" || delay==true){
        buttonDisable();
        //tempo do delay em segundos. (o timer nao e muito confiavel, ele acerta o tempo com uma margen de -+30s)
        delaytime = delayValue;
        enviardelay()
    }
    else{
        enviar();
    }
}



function enviardelay(){
    if(delaytime>1){
        delaytime--;
       document.getElementById("enviartext").textContent = minutify(delaytime);
        setTimeout(enviardelay, 1000);
    }
    else{
        enviar();
        buttonEnable();
    }
}

//transforma em minutos e segundos
function minutify(input){
    let minutes = parseInt(input/60);
    let minutesstring = minutes.toString();
    let seconds = input%60;
    let secondsstring = seconds.toString();
    return (minutesstring.padStart(2, "0") + ":" + secondsstring.padStart(2, "0"))
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
                //se estiver no modo true modo, ou seja, modo A, cancela TODOS os movimentos APOS o movimento invalido
                if(mode==true){
                i = array.length + 1;
            }
            //se estiver no modo false, ou seja, modo A, cancela APENAS o movimento invalido
            else{
                movementValue = positionBackup
                
            }
            }
            else{
                currentPosition = currentPosition + movementValue;
            }
    
            //IF ELSE que verifica se a posicao atual esta em alguma borda da matriz e muda as bools que definem se o rover esta em uma borda ou nao de acordo, caso esteja em uma borda, nao deixa o rover realizar movimentos verticais usando movimentos laterais, ou seja, nao deixa ir da posicao 3 para a 4 usando o movimento "direita"
            //caso a posicao seja 0 OU a posicao seja divisil por 4, ja que os unicos numeros divisiveis por 4 sao os da borda esquerda, nota-se que 0/4=infinidade, e o metodo isInteger considera inifinidade um int, logo, o codigo acaba considerando 0 divisivel por 4
            if(Number.isInteger(currentPosition/4)){
                canGoLeft = false;
                canGoRight = true;
            }
            //caso a posicao esteja em uma array de posicoes, sabe-se que ela esta na borda direita, tentei usar operacoes matematicas aqui mas nao cheguei em nenhuma que desse um resultado para 3, 7, 11 e 15 e outro para os demais numeros da matriz
            else if(rightBorder.includes(currentPosition)){
                canGoLeft = true;
                canGoRight = false;
            }
            //se chegar ate esse else significa que nao esta em nenhuma das bordas
            else{
                canGoLeft = true;
                canGoRight = true;
            }    
        }
    

    //muda a imagem do mapa para o mapa correspondente a posicao atual
    document.getElementById("map").src="map"+currentPosition+".png";
    //atualiza o texto de posicao para mostrar a posicao do rover
    document.getElementById("position").innerHTML = "Posicao = " + currentPosition;
    //limpa a lista de movimentos pendentes, lembrando que essa lista server apenas para auxiliar o usuario
    document.getElementById("historico").innerHTML = "Movimentos pendentes: ";
    //limpa a lista de movimentos a serem executados
    array = [];
    //volta a variavel "firstprint" para true, desse jeito, o proximo movimento na lista de movimentos pendentes NAO tera uma virgula antes
    firstprint = true;

    //envia a posicao atual do rover para o cache do navegador, dessa forma, o rover continuara na mesma posicao quando o usuario abrir o site novamente
    localStorage.setItem("currentPosition", currentPosition);
    document.getElementById("enviartext").innerHTML = "Enviar";
}

//fucao que atualiza a posicao do rover baseado no cache do navegador
function positionUpdate(){
        //muda a imagem do mapa para o mapa correspondente a posicao atual
        document.getElementById("map").src="map"+currentPosition+".png";
        //atualiza o texto de posicao para mostrar a posicao do rover
        document.getElementById("position").innerHTML = "Posicao = " + currentPosition;

        //IF ELSE que verifica se a posicao atual esta em alguma borda da matriz e muda as bools que definem se o rover esta em uma borda ou nao de acordo, caso esteja em uma borda, nao deixa o rover realizar movimentos verticais usando movimentos laterais, ou seja, nao deixa ir da posicao 3 para a 4 usando o movimento "direita"
        //caso a posicao seja 0 OU a posicao seja divisil por 4, ja que os unicos numeros divisiveis por 4 sao os da borda esquerda, nota-se que 0/4=infinidade, e o metodo isInteger considera inifinidade um int, logo, o codigo acaba considerando 0 divisivel por 4
        if(Number.isInteger(currentPosition/4)){
            canGoLeft = false;
            canGoRight = true;
        }
        //caso a posicao esteja em uma array de posicoes, sabe-se que ela esta na borda direita, tentei usar operacoes matematicas aqui mas nao cheguei em nenhuma que desse um resultado para 3, 7, 11 e 15 e outro para os demais numeros da matriz
        else if(rightBorder.includes(currentPosition)){
            canGoLeft = true;
            canGoRight = false;
        }
        //se chegar ate esse else significa que nao esta em nenhuma das bordas
        else{
            canGoLeft = true;
            canGoRight = true;
        }    
}


//funcao que muda a bool "mode" dependendo do switch que tem em cima do mapa, o valor "true" corresponde ao modo B e o valor "false" corresponde ao modo A
//tambem envia o modo selecionado para o cache do navegador, dessa forma, o modo continuara igual quando o usuario abrir o site novamente
function modeswitch(){
    if(document.getElementById("modeswitch").checked){
        localStorage.setItem("mode", true);
        mode = true;
    }
    else{
        localStorage.setItem("mode", false);
        mode = false;
    }
}

function delayswitch(){
    if(document.getElementById("delayswitch").checked){
        localStorage.setItem("delay", true);
        delay = true;
    }
    else{
        localStorage.setItem("delay", false);
        delaytime = 0;
        delay = false;
    }
}

//funcao que abre o pop-up que explica os modos
function openhelp(){
    document.getElementById("helpcontainer").style.visibility = "visible";
    document.getElementById("buttoncontainer").style.visibility = "hidden";
}

//funcao que fecha o pop-up que explica os modos
function closehelp(){
    document.getElementById("helpcontainer").style.visibility = "hidden";
    document.getElementById("buttoncontainer").style.visibility = "visible";
}

function openhelpDelay(){
    document.getElementById("helpcontainerDelay").style.visibility = "visible";
    document.getElementById("buttoncontainer").style.visibility = "hidden";
}

function closehelpDelay(){
    document.getElementById("helpcontainerDelay").style.visibility = "hidden";
    document.getElementById("buttoncontainer").style.visibility = "visible";
}

function updateDelaySeconds(){
    if(parseInt(document.getElementById("delaySeconds").value) > 3600){
        document.getElementById("delaySeconds").value = 3600;
    }
    if(parseInt(document.getElementById("delaySeconds").value) < 5){
        document.getElementById("delaySeconds").value = 5;
    }
    delaySeconds = parseInt(document.getElementById("delaySeconds").value);
    document.getElementById("delaySeconds").value = delaySeconds;
    delayValue = delaySeconds;

    //multiplica o tempo em segundos pela velocidade da luz para descobrir a distancia e divide por 2000 pois: divide por 1000 para transformar de metros em KM, divide por 2 para descobrir apenas a distancia de ida.
    delayKilometers = Math.trunc((delaySeconds * 299792458)/2000);
    document.getElementById("delayKilometers").value = delayKilometers;
}

function updateDelayKilometers(){
    if(parseInt(document.getElementById("delayKilometers").value) > 179875474){
        document.getElementById("delayKilometers").value =  179875474;
    }
    if(parseInt(document.getElementById("delayKilometers").value) < 749481){
        document.getElementById("delayKilometers").value =  749481;
    }
    delayKilometers = parseInt(document.getElementById("delayKilometers").value);
    document.getElementById("delayKilometers").value = delayKilometers;
    delaySeconds = Math.trunc(((delayKilometers*2000)/299792458)+1);
    delayValue = delaySeconds;
    document.getElementById("delaySeconds").value = delaySeconds;
}