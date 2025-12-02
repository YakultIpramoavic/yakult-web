const gameListEl = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");
let opened = null;

/* RENDER GAME LIST */
function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(g => {
        const wrapper = document.createElement("div");
        wrapper.className = "game-wrapper";

        const card = document.createElement("div");
        card.className = "game-card";
        card.onclick = () => openGame(wrapper, g);

        card.innerHTML = `
            <img src="${g.image}" class="game-img">
            <div class="game-info">
                <div class="game-title">${g.name}</div>
                <span class="vip-tag">VIP</span>
            </div>
        `;

        const detail = document.createElement("div");
        detail.className = "inline-detail";

        wrapper.appendChild(card);
        wrapper.appendChild(detail);
        gameListEl.appendChild(wrapper);
    });
}

/* OPEN INLINE DETAIL */
function openGame(wrapper, game) {
    const detail = wrapper.querySelector(".inline-detail");

    if (opened === game.id) {
        detail.innerHTML = "";
        opened = null;
        return;
    }

    document.querySelectorAll(".inline-detail").forEach(d => (d.innerHTML = ""));

    opened = game.id;

    detail.innerHTML = `
        <div class="detail-card">
            <img src="${game.image}" class="detail-img">

            <div class="detail-header">
                <h2>${game.name}</h2>
                <span class="badge">VIP</span>
            </div>

            <button class="toggle-detail" onclick="toggleDetails(this)">Hide Details</button>

            <div class="detail-body">
                <h3>Features:</h3>
                <ul class="feature-list">
                    ${game.features.map(f => `<li>✔ ${f}</li>`).join("")}
                </ul>

                <a href="${game.script}" class="btn download">Download Script</a>
                <a href="${game.video}" class="btn review">Watch Review</a>

                <button class="btn copy-btn" onclick="copyScript('${game.script}')">Copy Script</button>

                <button class="btn report-btn">Report Error</button>
            </div>
        </div>
    `;
}

function toggleDetails(btn) {
    const body = btn.parentElement.querySelector(".detail-body");

    if (body.style.display === "none") {
        body.style.display = "block";
        btn.innerText = "Hide Details";
    } else {
        body.style.display = "none";
        btn.innerText = "Show Details";
    }
}

function copyScript(text) {
    navigator.clipboard.writeText(text);
    alert("Đã copy script!");
}

/* SEARCH */
searchInput.oninput = () => {
    const key = searchInput.value.toLowerCase();
    const filtered = gamesData.filter(g => g.name.toLowerCase().includes(key));
    renderGames(filtered);
};

/* INIT */
renderGames(gamesData);

