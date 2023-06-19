    /*
    function resetRanking() {
        // Remove os dados do ranking do armazenamento local
        localStorage.removeItem("ranking");
    
        // Limpa o conteúdo do elemento rank-container
        var rankContainer = document.getElementById("rank-container");
        rankContainer.innerHTML = "<p>O ranking foi zerado.</p>";
    }
    */

    var ranking = localStorage.getItem("ranking");

    if (ranking) {
      ranking = JSON.parse(ranking);
      var rankContainer = document.getElementById("rank-container");
      var themes = {};
      
      var themeNames = {
        tema1: "eSPORTS",
        tema2: "JOGADORES",
        tema3: "AGENTES E MAPAS",
        tema4: "SOBRE O JOGO"
      };
    
      for (var i = 0; i < ranking.length; i++) {
        var theme = ranking[i].theme;
        if (!themes[theme]) {
          themes[theme] = [];
        }
        themes[theme].push(ranking[i]);
      }
    
      var sortedThemes = Object.keys(themes).sort();
    
      for (var j = 0; j < sortedThemes.length; j++) {
        var theme = sortedThemes[j];
        var themeRank = document.createElement("div");
        themeRank.className = "theme-rank";
        
        var themeTitle = document.createElement("h2");
        themeTitle.textContent = themeNames[theme];
        themeRank.appendChild(themeTitle);
        
        var themeTable = document.createElement("table");
        themeTable.innerHTML = `
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;
    
        var themeRankBody = themeTable.querySelector("tbody");
        var themeRanking = themes[theme];
    
        for (var k = 0; k < themeRanking.length; k++) {
          var rankRow = document.createElement("tr");
          rankRow.innerHTML = `
            <td>${k + 1}</td>
            <td>${themeRanking[k].userName}</td>
            <td>${themeRanking[k].score}/5</td>
          `;
          themeRankBody.appendChild(rankRow);
        }
    
        themeRank.appendChild(themeTable);
        rankContainer.appendChild(themeRank);
      }
    
    /*
    var resetButton = document.createElement("button");
    resetButton.textContent = "Zerar Ranking";
    resetButton.addEventListener("click", resetRanking);
    rankContainer.appendChild(resetButton);
    } else {
    rankContainer.innerHTML = "<p>Nenhum resultado de ranking encontrado.</p>";
    */
}