// Link Telegram chung cho toàn site – NHỚ THAY BẰNG LINK THẬT CỦA BẠN
const TELEGRAM_LINK = 'https://t.me/your_channel';

// Số game mỗi trang (phân trang)
const PAGE_SIZE = 12;

// State lọc & phân trang
const state = {
  search: '',
  platform: 'all',
  status: 'all',
  page: 1
};

// Helper bỏ dấu tiếng Việt để search mượt
function normalize(str) {
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Lọc danh sách game theo state hiện tại
function getFilteredGames() {
  if (!Array.isArray(GAMES)) return [];

  const searchNorm = normalize(state.search || '');

  return GAMES.filter((game) => {
    const platformMatch =
      state.platform === 'all' || game.platform === state.platform;

    const statusMatch =
      state.status === 'all' || game.status === state.status;

    const text = `${game.name || ''} ${game.description || ''}`;
    const textNorm = normalize(text);
    const searchMatch = !searchNorm || textNorm.includes(searchNorm);

    return platformMatch && statusMatch && searchMatch;
  });
}

// Render danh sách game + phân trang
function renderGames() {
  const listEl = document.getElementById('games-list');
  const countEl = document.getElementById('games-count');
  const heroCountEl = document.getElementById('games-count-hero');
  const pageInfoEl = document.getElementById('page-info');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');

  if (!listEl || !countEl || !pageInfoEl || !prevBtn || !nextBtn) return;

  const filtered = getFilteredGames();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Giữ page trong khoảng hợp lệ
  if (state.page > totalPages) {
    state.page = totalPages;
  }
  if (state.page < 1) {
    state.page = 1;
  }

  const start = (state.page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filtered.slice(start, end);

  // Số lượng
  countEl.textContent = total.toString();
  if (heroCountEl) {
    heroCountEl.textContent = total > 0 ? `${total}+` : '0';
  }

  // Clear list
  listEl.innerHTML = '';

  if (pageItems.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'game-card';
    empty.innerHTML = '<p class="game-description">Không tìm thấy game phù hợp với từ khóa / bộ lọc.</p>';
    listEl.appendChild(empty);
  } else {
    pageItems.forEach((game) => {
      const card = document.createElement('article');
      card.className = 'game-card';

      // Xử lý class trạng thái
      let statusClass = '';
      if (game.status === 'Hoạt động') statusClass = 'status-ok';
      else if (game.status === 'Đang fix') statusClass = 'status-fix';
      else if (game.status === 'Mới thêm') statusClass = 'status-new';

      card.innerHTML = `
        <div class="game-header">
          <h3 class="game-name">${game.name || 'Tên game'}</h3>
          <span class="game-platform">${game.platform || 'Unknown'}</span>
        </div>
        <div class="game-version">Version: ${game.version || 'N/A'}</div>
        <p class="game-description">${game.description || ''}</p>
        ${
          Array.isArray(game.tags) && game.tags.length
            ? `<div class="game-tags">
                ${game.tags
                  .map((tag) => `<span class="game-tag">${tag}</span>`)
                  .join('')}
              </div>`
            : ''
        }
        <div class="game-footer">
          <span class="status-pill ${statusClass}">${game.status || 'N/A'}</span>
          <button type="button" class="btn-primary btn-download" data-url="${game.downloadUrl || TELEGRAM_LINK}">
            Mở link tải
          </button>
        </div>
        ${
          game.note
            ? `<p class="game-note">${game.note}</p>`
            : ''
        }
      `;

      listEl.appendChild(card);
    });
  }

  // Phân trang
  pageInfoEl.textContent = `Trang ${state.page} / ${totalPages}`;
  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;

  // Gắn event click cho nút download
  const downloadButtons = listEl.querySelectorAll('.btn-download');
  downloadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url') || TELEGRAM_LINK;
      window.open(url, '_blank');
    });
  });
}

// Khởi tạo event UI
function initUI() {
  const searchInput = document.getElementById('search-input');
  const platformSelect = document.getElementById('filter-platform');
  const statusSelect = document.getElementById('filter-status');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const yearSpan = document.getElementById('year');

  const navToggle = document.getElementById('nav-toggle');
  const header = document.querySelector('.header');

  const btnTelegram = document.getElementById('btn-telegram');
  const heroGoGames = document.getElementById('hero-go-games');
  const heroGoTelegram = document.getElementById('hero-go-telegram');
  const contactTelegram = document.getElementById('contact-open-telegram');

  // Năm footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Tìm kiếm
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value || '';
      state.page = 1;
      renderGames();
    });
  }

  // Lọc platform
  if (platformSelect) {
    platformSelect.addEventListener('change', (e) => {
      state.platform = e.target.value || 'all';
      state.page = 1;
      renderGames();
    });
  }

  // Lọc status
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      state.status = e.target.value || 'all';
      state.page = 1;
      renderGames();
    });
  }

  // Nút phân trang
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      state.page -= 1;
      renderGames();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      state.page += 1;
      renderGames();
    });
  }

  // Menu mobile
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });
  }

  // Smooth scroll cho nav
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (header) header.classList.remove('nav-open');
    });
  });

  // Nút hero "Xem danh sách scripts"
  if (heroGoGames) {
    heroGoGames.addEventListener('click', () => {
      const target = document.getElementById('games');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Mở Telegram (các nút chung)
  const openTelegram = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  if (btnTelegram) btnTelegram.addEventListener('click', openTelegram);
  if (heroGoTelegram) heroGoTelegram.addEventListener('click', openTelegram);
  if (contactTelegram) contactTelegram.addEventListener('click', openTelegram);
}

// DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  initUI();
  renderGames();
});
