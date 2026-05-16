// SmartKos App — Shared UI utilities

// ======= SIDEBAR =======
function initSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('visible');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }
}

// ======= TOAST =======
function showToast(msg, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  const colors = { success: '#059669', error: '#EF4444', warning: '#F59E0B', info: '#2563EB' };
  const icons = {
    success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    error:   '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>',
    warning: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    info:    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  };
  const t = document.createElement('div');
  t.style.cssText = `display:flex;align-items:center;gap:10px;padding:12px 16px;background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.15);border-left:3px solid ${colors[type]||colors.info};min-width:260px;animation:slideInLeft .3s ease;font-family:'Plus Jakarta Sans',sans-serif`;
  t.innerHTML = `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" style="color:${colors[type]||colors.info};flex-shrink:0">${icons[type]||icons.info}</svg><span style="flex:1;font-size:13px;font-weight:500;color:#1E293B">${msg}</span><span onclick="this.parentElement.remove()" style="cursor:pointer;color:#94A3B8;font-size:16px;line-height:1">×</span>`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .3s'; setTimeout(() => t.remove(), 300); }, duration);
}

// ======= MODAL =======
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
}
// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
});
// Close on Esc
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => { m.style.display = 'none'; });
    document.body.style.overflow = '';
  }
});

// ======= DROPDOWN =======
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
  }
});
function toggleDropdown(id) {
  const m = document.getElementById(id);
  if (m) m.classList.toggle('hidden');
}

// ======= FORMAT HELPERS =======
function formatRp(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}
function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
function statusLabel(s) {
  const m = { terisi: 'Terisi', kosong: 'Kosong', booking: 'Booking', terlambat: 'Telat Bayar', lunas: 'Lunas', pending: 'Pending', menunggu: 'Verifikasi', diproses: 'Diproses', selesai: 'Selesai' };
  return m[s] || s;
}
function statusBadgeClass(s) {
  const m = { terisi: 'badge-green', kosong: 'badge-gray', booking: 'badge-amber', terlambat: 'badge-red', lunas: 'badge-green', pending: 'badge-amber', menunggu: 'badge-blue', diproses: 'badge-blue', selesai: 'badge-green' };
  return 'badge ' + (m[s] || 'badge-gray');
}

// ======= REVEAL ON SCROLL =======
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ======= COUNTER ANIMATION =======
function animateCount(el, target, duration = 1500, prefix = '', suffix = '') {
  const start = Date.now();
  const startVal = 0;
  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(startVal + (target - startVal) * ease).toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  update();
}

// ======= SEARCH FILTER =======
function initSearch(inputId, tableId, colIndex = 0) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row => {
      const text = Array.from(row.cells).map(c => c.textContent.toLowerCase()).join(' ');
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ======= ACTIVE NAV =======
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initReveal();
  setActiveNav();
});

// Add CSS animation for toast
const style = document.createElement('style');
style.textContent = '@keyframes slideInLeft{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}';
document.head.appendChild(style);
