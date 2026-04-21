/* ─────────────────────────────────────────────────────────────
   Auth guard — include AFTER storage.js on every protected page.
   Redirects to login.html immediately if no valid session.
   ───────────────────────────────────────────────────────────── */
(function () {
  if (!Auth.check()) {
    window.location.replace('login.html');
  }
})();

/* Toast system — available globally after this file loads */
const Toast = (function () {
  let container;
  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
  function show(message, type = 'info', duration = 3200) {
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    el.innerHTML = `<span class="toast__icon">${icons[type] || icons.info}</span><span class="toast__msg">${message}</span>`;
    getContainer().appendChild(el);
    requestAnimationFrame(() => el.classList.add('toast--in'));
    setTimeout(() => {
      el.classList.remove('toast--in');
      el.addEventListener('transitionend', () => el.remove(), { once: true });
    }, duration);
  }
  return { success: m => show(m,'success'), error: m => show(m,'error'), info: m => show(m,'info'), warning: m => show(m,'warning') };
})();

/* Confirm modal — call Modal.confirm('Are you sure?').then(ok => ...) */
const Modal = (function () {
  function confirm(message, dangerLabel = 'Supprimer') {
    return new Promise(resolve => {
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal-box" role="dialog" aria-modal="true">
          <div class="modal-icon">🗑️</div>
          <p class="modal-message">${message}</p>
          <div class="modal-actions">
            <button class="btn btn--ghost" id="mdlCancel">Annuler</button>
            <button class="btn btn--danger" id="mdlConfirm">${dangerLabel}</button>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
      requestAnimationFrame(() => backdrop.classList.add('modal-backdrop--in'));
      function close(val) {
        backdrop.classList.remove('modal-backdrop--in');
        backdrop.addEventListener('transitionend', () => backdrop.remove(), { once: true });
        resolve(val);
      }
      backdrop.querySelector('#mdlCancel').onclick  = () => close(false);
      backdrop.querySelector('#mdlConfirm').onclick = () => close(true);
      backdrop.addEventListener('click', e => { if (e.target === backdrop) close(false); });
    });
  }
  return { confirm };
})();

/* Sidebar active state — call with current page filename */
function setSidebarActive(page) {
  document.querySelectorAll('.sidebar__nav-item').forEach(el => {
    el.classList.toggle('sidebar__nav-item--active', el.dataset.page === page);
  });
}

/* Logout button wire-up — call once DOM is ready */
function wireLogout() {
  const btn = document.getElementById('logoutBtn');
  if (btn) btn.addEventListener('click', () => {
    Auth.logout();
    window.location.href = 'login.html';
  });
}
