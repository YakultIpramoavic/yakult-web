const gameListEl = document.getElementById("gameList");
const detailBox = document.getElementById("gameDetail");
const searchInput = document.getElementById("searchInput");

let opened = null;

// Render danh sách game
function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(g => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.onclick = () => openGame(g);

        card.innerHTML = `
            <img src="${g.image}" class="game-img">
            <div class="game-info">
                <div class="game-title">${g.name}</div>
                <span class="vip-tag">VIP</span>
            </div>
        `;

        gameListEl.appendChild(card);
    });
}

// Search
searchInput.oninput = () => {
    const key = searchInput.value.toLowerCase();
    const filtered = gamesData.filter(g => g.name.toLowerCase().includes(key));
    renderGames(filtered);
};

// Accordion mở
function openGame(game) {
    if (opened === game.id) {
        detailBox.innerHTML = "";
        opened = null;
        return;
    }

    opened = game.id;

    detailBox.innerHTML = `
        <div class="detail-card">

            <img src="${game.image}" class="detail-img">

            <div class="detail-header">
                <h2>${game.name}</h2>
                <span class="badge">VIP</span>
            </div>

            <button class="toggle-detail" onclick="toggleDetails()">Hide Details</button>

            <div id="moreDetails" class="detail-body">

                <h3>Features:</h3>
                <ul class="feature-list">
                    ${game.features.map(f => `<li>✔ ${f}</li>`).join("")}
                </ul>

                <a href="${game.script}" class="btn download">Download Script</a>
                <a href="${game.video}" class="btn review">Watch Review</a>

                <button class="btn copy-btn" onclick="copyScript('${game.script}')">
                    Copy Script
                </button>

                <button class="btn report-btn">Report Error</button>

            </div>
        </div>
    `;
}

// Show/hide details
function toggleDetails() {
    const box = document.getElementById("moreDetails");
    const btn = document.querySelector(".toggle-detail");

    if (box.style.display === "none") {
        box.style.display = "block";
        btn.innerText = "Hide Details";
    } else {
        box.style.display = "none";
        btn.innerText = "Show Details";
    }
}

function copyScript(text) {
    navigator.clipboard.writeText(text);
    alert("Đã copy script!");
}

// Initial render
renderGames(gamesData);
