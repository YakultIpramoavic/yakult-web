const gameListEl = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");

function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img src="${game.image}" class="game-img">

            <div class="card-info">
                <div class="game-title">${game.name}</div>
                <span class="tag">VIP</span>

                <button class="show-btn" onclick="toggleDetails(${game.id})">
                    ▼ Show Details
                </button>
            </div>

            <div id="details-${game.id}" class="details" style="display:none;">

                <hr>

                <h3>Features:</h3>
                <ul class="feature-list">
                    ${game.features.map(f => `<li>${f}</li>`).join("")}
                </ul>

                <hr>

                <h3>PURCHASE OPTIONS:</h3>
                <div class="buy-btn">Lifetime – $8 / IDR 80k</div>
                <div class="review-btn">▶ Watch Review</div>

                <div class="share-box">
                    <span>Share this script:</span><br><br>
                    <button class="copy-btn" onclick="copyScript('${game.script}')">
                        🔗 Copy Script Link
                    </button>
                </div>

                <button class="error-btn">❗ Report Error</button>
            </div>
        `;

        gameListEl.appendChild(card);
    });
}

function toggleDetails(id) {
    const box = document.getElementById("details-" + id);
    const btn = event.target;

    if (box.style.display === "none") {
        box.style.display = "block";
        btn.innerText = "▲ Hide Details";
    } else {
        box.style.display = "none";
        btn.innerText = "▼ Show Details";
    }
}

function copyScript(text) {
    navigator.clipboard.writeText(text);
    alert("Đã copy!");
}

searchInput.oninput = () => {
    const key = searchInput.value.toLowerCase();
    renderGames(gamesData.filter(g => g.name.toLowerCase().includes(key)));
};

renderGames(gamesData);
