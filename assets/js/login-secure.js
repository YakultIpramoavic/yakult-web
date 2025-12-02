// ======================
// CẤU HÌNH BẢO MẬT
// ======================
const ADMIN_USERNAME = "yakult_admin";

// HASH mật khẩu mới (yakult2024)
const HASH = "0348b3fed24e001bc5a8ce4968a46e1a9f88f95f89b9aa93c53810e4507996ee";

// Pepper bí mật
const PEPPER = "YAKULT_PEPPER_KEY_92@#%*!!";

let maxAttempts = 5;
let lockMinutes = 0;

// ======================
// SHA-256
// ======================
async function sha256(msg) {
    const data = new TextEncoder().encode(msg);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Hash kép
async function doubleHash(pass) {
    const h1 = await sha256(pass + PEPPER);
    const h2 = await sha256(h1);
    return h2;
}

// ======================
// LOGIN + ANTI BRUTE FORCE
// ======================
async function login() {

    // Kiểm tra khóa
    const lockUntil = localStorage.getItem("yakult_lock_time");
    const now = Date.now();

    if (lockUntil && now < lockUntil) {
        const mins = Math.ceil((lockUntil - now) / 60000);
        document.getElementById("lockMsg").innerText =
            `Bạn đã bị khóa đăng nhập (${mins} phút còn lại)`;
        return;
    }

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (user !== ADMIN_USERNAME) {
        failAttempt();
        return showError("Sai username!");
    }

    const hashed = await doubleHash(pass);

    if (hashed !== HASH) {
        failAttempt();
        return showError("Sai mật khẩu!");
    }

    // LOGIN THÀNH CÔNG
    localStorage.setItem("yakult_admin_token", "logged");
    localStorage.setItem("yakult_last_active", Date.now());

    window.location.href = "yakult-security-zone-91022.html";
}

function failAttempt() {
    let attempts = parseInt(localStorage.getItem("yakult_attempts") || "0");
    attempts++;
    localStorage.setItem("yakult_attempts", attempts);

    if (attempts >= maxAttempts) {
        localStorage.setItem("yakult_attempts", 0);
        localStorage.setItem("yakult_lock_time", Date.now() + lockMinutes * 60000);
        showError(`Bạn đã bị khóa ${lockMinutes} phút!`);
    }
}

function showError(msg) {
    document.getElementById("error").innerText = msg;
}

