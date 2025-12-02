const gameListEl = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");
let opened = null;

/* RENDER GAME LIST */
function renderGames(list) {
    gameListEl.innerHTML = "";

    list.forEach(g => {
        const wrapper = document.createElement("div");
        wrapper.className = "game-card";

        wrapper.innerHTML = `
            <img src="${g.image}" class="game-img">

            <div class="card-info">
                <div class="game-title">${g.name}</div>
                <span class="tag">VIP</span>

                <button class="show-btn" onclick="toggleDetails(${g.id})">
                    Show Details
                </button>
            </div>

            <div id="details-${g.id}" class="details" style="display:none;">
                <h3>Features</h3>
                <ul>${g.features.map(f => `<li>✔ ${f}</li>`).join("")}</ul>

                <a href="${g.script}" class="btn btn-download">Download Script</a>
                <a href="${g.video}" class="btn btn-video">Watch Review</a>
                <button onclick="copyScript('${g.script}')" class="btn btn-copy">Copy Script</button>
                <button class="btn btn-error">Report Error</button>
            </div>
        `;

        gameListEl.appendChild(wrapper);
    });
}

/* SHOW | HIDE DETAILS */
function toggleDetails(id) {
    const box = document.getElementById("details-" + id);
    const btn = event.target;

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
    alert("Copied!");
}

/* SEARCH */
searchInput.oninput = () => {
    const key = searchInput.value.toLowerCase();
    renderGames(gamesData.filter(g => g.name.toLowerCase().includes(key)));
};

/* INIT */
renderGames(gamesData);
