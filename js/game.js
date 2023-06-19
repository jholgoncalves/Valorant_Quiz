document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startQuiz);
});

var currentQuestion = 1;
var totalQuestions = 5;
var currentTheme;
var questions = [];
var score = 0;
var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("question-page");
var resultPage = document.getElementById("result-page");
var themeSelect = document.getElementById("theme-select");
var startButton = document.getElementById("start-button");
var questionText = document.getElementById("question");
var choicesList = document.getElementById("choices");
var answerButton = document.getElementById("answer-button");
var nextButton = document.getElementById("next-button");
var resultText = document.getElementById("result");
var restartButton = document.getElementById("restart-button");

startButton.addEventListener("click", startQuiz);
answerButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  var themeSelect = document.getElementById("theme-select");
  var temaText = document.getElementById("tema-text");
  var selectedTheme = "TEMA: " + themeSelect.options[themeSelect.selectedIndex].text.toUpperCase();
  var progressText = document.getElementById("progress-text");

  progressText.textContent = "Pergunta " + currentQuestion + " de " + totalQuestions;
  temaText.textContent = selectedTheme;

  currentTheme = themeSelect.value;
  userName = prompt("Digite o seu nome:");
  localStorage.setItem("userName", userName);

  questions = shuffleArray(temas[currentTheme]).slice(0, totalQuestions); // Sorteia a quantidade correta de perguntas do tema atual
  startPage.style.display = "none";
  questionPage.style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion(themeSelect);
}

// Responsável por exibir a pergunta atual, as opções de resposta e o progresso do quiz. 
function showQuestion() {
  var questionData = temas[currentTheme][currentQuestion];
  questionText.textContent = questionData.pergunta;
  choicesList.innerHTML = "";

  for (var choice in questionData.escolhas) {
      var li = document.createElement("li");
      var label = document.createElement("label");
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;
      label.appendChild(radio);
      label.innerHTML += " <span>" + questionData.escolhas[choice] + "</span>";
      li.appendChild(label);
      choicesList.appendChild(li);
  }

  var temaText = document.getElementById("tema-text");

  var progressText = document.getElementById("progress-text");
  progressText.textContent = currentQuestion + 1 + "/" + temas[currentTheme].length;
  progressText.textContent = "Pergunta: " + (currentQuestion + 1) + "/5";
}


// Chamada quando o quiz é concluído e exibe a pontuação do usuário, armazena o resultado no ranking e exibe a página de resultado.
function showResult() {
    questionPage.style.display = "none";
    resultPage.style.display = "block";

    var userName = localStorage.getItem("userName");
    resultText.textContent = userName + ", você finalizou o teste. Acertos: " + score + "/5";

    var ranking = localStorage.getItem("ranking");
    var testResult = {
        userName: userName,
        score: score,
        theme: currentTheme
    };

    if (ranking) {
        ranking = JSON.parse(ranking);
        ranking.push(testResult);
    } else {
        ranking = [testResult];
    }

    ranking.sort(function(a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("ranking", JSON.stringify(ranking));
}


// Perguntas e respostas para cada tema
var temas = {
  tema1: [
      {
          pergunta: "QUAIS TIMES A LEVIATAN DERROTOU NA FASE DE GRUPOS DO CHAMPIONS ISTAMBUL 2022?",
          resposta: "E",
          escolhas: {
              A: "Zeta Division, Team Liquid",
              B: "Edward Gaming, PaperRex",
              C: "Zeta Division, Paper Rex",
              D: "Edward Gaming, Team Liquid",
              E: "Team Liquid, PaperRex "
          }
      },
      {
        pergunta: "QUAL ERA O TIME DA ACEND CAMPEÃ DO CHAMPIONS BERLIN 2021?",
        resposta: "B",
        escolhas: {
            A: "Bonecold, Cned, L1nk, Koldamenta, Zeek",
            B: "Bonecold, Cned, Starxo, Kiles, Zeek",
            C: "Bonecold, Cned, L1nk, Koldamenta, vakk",
            D: "Bonecold, Cned, Starxo, Kiles, Nbs",
            E: "Bonecold, Cned, Starxo, Koldamenta, Br0die"
        }
      },
      {
        pergunta: "QUAL FOI O MAPA MAIS JOGADO DO CHAMPIONS ISTANBUL 2022?",
        resposta: "B",
        escolhas: {
            A: "Haven",
            B: "Ascent",
            C: "Bind",
            D: "Breeze",
            E: "Icebox"
        }
      },
      {
        pergunta: "QUAIS ERAM AS EQUIPES NO GRUPO B DO CHAMPIONS ISTAMBUL 2022?",
        resposta: "B",
        escolhas: {
            A: "PaperRex, Edward, Leviatan e Liquid",
            B: "OPTIC, Boom, Zeta e Loud",
            C: "FPX, Kru, Xset e Xerxia",
            D: "DRX, Furia, Fnatic e 100Thieves",
            E: "PaperRex, Boom, Zeta e Loud"
        }
      },
      {
        pergunta: "QUAIS FORAM OS TIMES ELIMINADOS NA FRASE DE GRUPO DO MASTER COPENHAGEN?",
        resposta: "A",
        escolhas: {
            A: "KRU, Loud, Xerxia e Northeption",
            B: "KRU, Guild, Optic e Northeption",
            C: "Xerxia, Guild, Loud e Northeption",
            D: "FPX, Xerxia, DRX e Northeption",
            E: "Optic, Guild, Loud e Kru"
        }
      },
      {
        pergunta: "QUAL ERA O GRUPO DA NIP NO MASTER REYKJAVÍK 2022?",
        resposta: "E",
        escolhas: {
            A: "Liquid, Optic, Xerxia e NIP",
            B: "Xerxia, Zeta, NIP e Fnatic",
            C: "DRX, Kru, NIP e Fnatic",
            D: "DRX, PaperRex, NIP e Fnatic",
            E: "DRX, Zeta, NIP e Fnatic "
        }
      },
      {
        pergunta: "QUEM FOI O VICE CAMPEÃO DO FIRST STRIKE BRASIL EM 2020?",
        resposta: "B",
        escolhas: {
            A: "Gamelanders",
            B: "Pain",
            C: "Havan Liberty",
            D: "B4",
            E: "Vorax"
        }
      },
      {
        pergunta: "QUAIS FORAM OS TIMES CAMPEÃO DO VCT REGIONAL 2023?",
        resposta: "B",
        escolhas: {
            A: "Loud, Fnatic e DRX",
            B: "Loud, Liquid e PaperRex",
            C: "NRG, Liquid e PaperRex",
            D: "Loud, Liquid e DRX",
            E: "EG, Fnatic e Zeta"
        }
      },
      {
        pergunta: "QUAIS TIMES DA CHINA PARTICIPARAM DO VCT LOCK//IN?",
        resposta: "B",
        escolhas: {
            A: "FPX e Xerxia",
            B: "EDG e FPX",
            C: "FPX e T1",
            D: "FPX e Global Esports",
            E: "Rex Regum e Talon"
        }
      },
      {
        pergunta: "QUAIS TIMES DO PACIFICO VÃO PARTICIPAR DO MASTER TOKYO?",
        resposta: "C",
        escolhas: {
            A: "DRX, Team Secret e Zeta",
            B: "PaperRex, DRX e Talon",
            C: "PaperRex, DRX e T1",
            D: "DRX, Gen.G e T1",
            E: "Paper Rex, Zeta e Gen.G"
        }
      },
  ],
  tema2: [
      {
          pergunta: "QUAL JOGADOR BRASILEIRO TERMINOU COM O MELHOR ACS NO MASTER BERLIN 2021?",
          resposta: "E",
          escolhas: {
              A: "Aspas",
              B: "Mwzera",
              C: "Saadhak",
              D: "Sacy",
              E: "Heat"
          }
      },
      {
        pergunta: "QUEM FOI O JOGADOR MAIS JOVEM NO CHAMPIONS ISTAMBUL 2022?",
        resposta: "B",
        escolhas: {
            A: "Less - Loud",
            B: "Alfajer - Fnatic ",
            C: "Aspas - Loud",
            D: "Enzo - Fnatic",
            E: "Zekken - Xset"
        }
      },
      {
        pergunta: "QUEM FOI O MVP DO CHAMPIONS ISTAMBUL 2022?",
        resposta: "C",
        escolhas: {
            A: "Yay - Optic",
            B: "Aspas - Loud",
            C: "Pancada - Loud ",
            D: "Laz - Zeta",
            E: "Derke - Fnatic"
        }
      },
      {
        pergunta: "QUEM ERA O DUELISTA DA GAMBIT NO MASTER BERLIN 2021?",
        resposta: "C",
        escolhas: {
            A: "Derke",
            B: "Chronicle",
            C: "Deffo",
            D: "Sheydos",
            E: "Keloqz"
        }
      },
      {
        pergunta: "QUAIS ORGANIZAÇÕES DE VALORANT SAADHAK JOGOU ANTES DA LOUD?",
        resposta: "E",
        escolhas: {
            A: "Vking e Six Karma",
            B: "Estral e 9z",
            C: "Vikings e 9z",
            D: "Vikings e Leviatan",
            E: "Vikings, Estral e 9z"
        }
    },
    {
      pergunta: "QUEM FOI O MVP DA FINAL DO VCT AMERICAS 2023?",
      resposta: "E",
      escolhas: {
          A: "Ardiss",
          B: "Victor",
          C: "Less",
          D: "Aspas",
          E: "Saadhak"
      }
    },
    {
      pergunta: "QUEM FOI O MVP DO PRIMEIRO CAMPEONATO INTERNACIONAL EM 2021?",
      resposta: "A",
      escolhas: {
          A: "Tenz",
          B: "Scream",
          C: "Aspas",
          D: "Shazam",
          E: "Derke"
      }
    },
    {
      pergunta: "QUAL FOI O JOGADOR TEVE MAIS FIRST KILL NO VCT AMERICAS 2023?",
      resposta: "B",
      escolhas: {
          A: "Aspas",
          B: "Dgzin",
          C: "Victor",
          D: "Ardiss",
          E: "Leaf"
      }
    },
    {
      pergunta: "QUAL JOGADOR TEVE A MAIOR TAXA DE HS NA FINAL DO VCT LOCK//IN 2023?",
      resposta: "C",
      escolhas: {
          A: "Less",
          B: "Aspas",
          C: "Tuyz",
          D: "Alfajer",
          E: "Derke"
      }
    },
    {
      pergunta: "QUAIS JOGADORES TEM 2 TITULOS INTERNACIONAL?",
      resposta: "D",
      escolhas: {
          A: "Aspas, Less, Saadhak",
          B: "Aspas, Less, Saadhak e Chronicle ",
          C: "Aspas, Less, Saadhak, Chronicle e Nats",
          D: "Aspas, Less, Saadhak, Chronicle, Nats e Redgar ",
          E: "Aspas, Less, Saadhak, Chronicle e Boaster"
      }
    },
      
  ],
  tema3: [
      {
          pergunta: "QUANTOS AGENTES EXISTEM NO VALORANT?",
          resposta: "A",
          escolhas: {
              A: "21",
              B: "22",
              C: "20",
              D: "19",
              E: "23"
          }
      },
      {
          pergunta: "QUAL NOME DA ULTIMATE DO BRIMSTONE?",
          resposta: "C",
          escolhas: {
              A: "Estraga prazeres",
              B: "Onda trovejante",
              C: "Ataque orbital ",
              D: "Sobrecarga",
              E: "Ataque celeste"
          }
      },
      {
          pergunta: "DE QUAL PAÍS É A SKYE?",
          resposta: "E",
          escolhas: {
              A: "Indonésia",
              B: "Índia",
              C: "Brasil",
              D: "Inglaterra",
              E: "Austrália"
          }
      },
      {
          pergunta: "QUANTOS SEGUNDOS DURA A IMOBILIZAÇÃO DA ULT DA KILLJOY?",
          resposta: "A",
          escolhas: {
              A: "8 Segundos ",
              B: "6 Segundos",
              C: "10 Segundos",
              D: "7 Segundos",
              E: "5 Segundos"
          }
      },
      {
          pergunta: "QUAL O TEMPO DE RECARGA DA CÂMERA DO CYPHER AO SER DESTRUÍDA?",
          resposta: "D",
          escolhas: {
              A: "30 segundos",
              B: "35 segundos",
              C: "40 segundos",
              D: "45 segundos",
              E: "50 segundos"
          }
      },
      {
          pergunta: "EM QUE PAÍS FICA O MAPA HAVEN?",
          resposta: "C",
          escolhas: {
              A: "Bangladesh",
              B: "China",
              C: "Butão",
              D: "Índia",
              E: "Tailândia"
          }
      },
      {
          pergunta: "QUAL O NOME DO MAPA DE TREINO DO VALORANT?",
          resposta: "A",
          escolhas: {
              A: "The Range",
              B: "Ascent",
              C: "Estande de tiro",
              D: "Treino",
              E: "Haven"
          }
      },
      {
          pergunta: "DE QUAL PAÍS É A FADE?",
          resposta: "D",
          escolhas: {
              A: "Hungria",
              B: "Armênia",
              C: "Síria",
              D: "Turquia ",
              E: "Não tem país de origem"
          }
      },
      {
          pergunta: "ONDE FICA LOCALIZADO O MAPA LOTUS?",
          resposta: "E",
          escolhas: {
              A: "Tailândia",
              B: "Peru",
              C: "Mexico",
              D: "Islândia",
              E: "Índia"
          }
      },
      {
          pergunta: "QUAL O NOME VERDADEIRO DO BRIMSTONE?",
          resposta: "E",
          escolhas: {
              A: "Tala Nicole",
              B: "Kirra Foster",
              C: "Erik Torsten",
              D: "Vincent Fabron",
              E: "Liam Byrne"
          }
      },
  ],
  tema4: [
    {
        pergunta: "QUAL AGENTE PODE SER ENCONTRADOS NO ESTANDE DE TIRO DE VALORANT?",
        resposta: "E",
        escolhas: {
            A: "Jett",
            B: "Brimstone",
            C: "Kayo",
            D: "Sova",
            E: "Cypher"
        }
    },
    {
        pergunta: "QUANTOS CREDITOS SÃO NECESSARIOS PARA COMPRAR GUARDIAN + COLETE 1 + SHORTY?",
        resposta: "B",
        escolhas: {
            A: "2.750",
            B: "2.800",
            C: "2.900",
            D: "2.600",
            E: "3.150"
        }
    },
    {
        pergunta: "QUANTOS CREDITOS CUSTA UMA STINGER?",
        resposta: "D",
        escolhas: {
            A: "1050",
            B: "1000",
            C: "900",
            D: "950",
            E: "850"
        }
    },
    {
        pergunta: "QUAL O DANO DE UM HS DE ODIN A MENOS DE 30M DE DISTANCIA?",
        resposta: "E",
        escolhas: {
            A: "75",
            B: "120",
            C: "150",
            D: "100",
            E: "95"
        }
    },
    {
        pergunta: "O QUE SIGNIFICA A SIGLA PMC?",
        resposta: "E",
        escolhas: {
            A: "Controle de Morte por Posição",
            B: "Pontuação máxima de clutch",
            C: "Pontuação multikill de combate",
            D: "Avarege Combat Score",
            E: "Pontuação média de combate"
        }
    },
    {
        pergunta: "QUAL O DANO DE UMA FACA (BOTÃO DIREITO) PELA FRENTE?",
        resposta: "B",
        escolhas: {
            A: "80",
            B: "75",
            C: "100",
            D: "150",
            E: "50"
        }
    },
    {
        pergunta: "QUANTAS ARMAS SILENCIADAS EXISTEM EM VALORANT?",
        resposta: "C",
        escolhas: {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5"
        }
    },
    {
        pergunta: "QUANTAS BALAS TEM UM CARTUCHO DE GUARDIAN?",
        resposta: "D",
        escolhas: {
            A: "15",
            B: "7",
            C: "10",
            D: "12",
            E: "11"
        }
    },
    {
        pergunta: "QUAL ARMA PESA MAIS NA CORRIDA DO AGENTE?",
        resposta: "D",
        escolhas: {
            A: "Ares",
            B: "Guardian",
            C: "Operator",
            D: "Judge",
            E: "Odin"
        }
    },
    {
        pergunta: "QUANTAS ARMAS EXISTEM NO MENU DE COMPRA DO VALORANT?",
        resposta: "A",
        escolhas: {
            A: "17",
            B: "16",
            C: "18",
            D: "15",
            E: "12"
        }
    },
  ]
};

// Checka a resposta para errada ou correta, e avisa o usuario para selecionar alguma alternativa
function checkAnswer() {
    var selectedChoice = document.querySelector('input[name="choice"]:checked');
    var warningMessage = document.getElementById("warning-message");
    if (!selectedChoice) {
      warningMessage.textContent = "*Selecione alguma resposta antes de continuar.";
      return;
    }
  
    warningMessage.textContent = "";
  
    var answer = selectedChoice.value;
    var questionData = questions[currentQuestion];
    var correctAnswer = questionData.resposta;

    if (answer === correctAnswer) {
        score++;
    }
  
    var choices = document.querySelectorAll('input[name="choice"]');
    for (var i = 0; i < choices.length; i++) {
      choices[i].disabled = true; // Desabilitar todas as opções de escolha
      if (choices[i].checked) {
        choices[i].parentElement.parentElement.classList.add("selected"); // Adicionar classe "selected" à opção selecionada
      }
    }
  
    answerButton.style.display = "none";
    nextButton.style.display = "block";
}  

// É responsável por exibir a próxima pergunta do quiz quando o botão "Próxima pergunta" é clicado. 
function showNextQuestion() {
    currentQuestion++;
    var progressText = document.getElementById("progress-text");

    progressText.textContent = "Pergunta " + currentQuestion + " de " + totalQuestions;

    if (currentQuestion < 5) {
        clearSelection();
        showQuestion();
        answerButton.style.display = "block";
        nextButton.style.display = "none";
    } else {
        showResult();
    }
}

// É responsável por limpar a seleção de uma pergunta do quiz.
function clearSelection() {
  var selectedChoice = document.querySelector('input[name="choice"]:checked');
  if (selectedChoice) {
    selectedChoice.checked = false;
    selectedChoice.parentElement.parentElement.classList.remove("correct", "incorrect");
  }
}

// Responsável por reiniciar o quiz, ou seja, retornar todas as perguntas e respostas ao estado inicial.
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    questionPage.style.display = "none";
    resultPage.style.display = "none";
    startPage.style.display = "block";
    clearSelection();
}

// Embaralha a perguntas para não ter sequencias iguais para os usuarios
function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}