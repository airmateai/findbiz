const Auth = {
  ADMIN_EMAIL: 'admin@findbiz.es',
  getUser() { const u = localStorage.getItem('fb_user'); return u ? JSON.parse(u) : null; },
  getUsers() { const u = localStorage.getItem('fb_users'); return u ? JSON.parse(u) : []; },
  saveUsers(u) { localStorage.setItem('fb_users', JSON.stringify(u)); },
  register(name, email, phone, password) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Este correo ya está registrado' };
    const user = { id: Date.now(), name, email, phone, password, role: email === this.ADMIN_EMAIL ? 'admin' : 'user', createdAt: new Date().toISOString(), avatar: name.charAt(0).toUpperCase() };
    users.push(user);
    this.saveUsers(users);
    localStorage.setItem('fb_user', JSON.stringify(user));
    return { ok: true, user };
  },
  login(email, password) {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, msg: 'Correo o contraseña incorrectos' };
    localStorage.setItem('fb_user', JSON.stringify(user));
    return { ok: true, user };
  },
  logout() { localStorage.removeItem('fb_user'); updateNavAuth(); showView('home'); },
  isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },
  isLoggedIn() { return !!this.getUser(); }
};

function updateNavAuth() {
  const user = Auth.getUser();
  const el = document.getElementById('navActions');
  const mob = document.getElementById('mobileMenuAuth');
  if (!el) return;
  if (user) {
    const html = `
      <div class="nav-user-menu" onclick="toggleUserMenu()">
        <div class="nav-avatar">${user.avatar}</div>
        <span class="nav-username">${user.name.split(' ')[0]}</span>
        <span class="nav-caret">▾</span>
        <div class="user-dropdown" id="userDropdown">
          <a onclick="showView('dashboard');closeMobileMenu()">Mi panel</a>
          <a onclick="showView('favorites');closeMobileMenu()">Guardados</a>
          <a onclick="showView('alerts');closeMobileMenu()">Alertas de búsqueda</a>
          ${Auth.isAdmin() ? '<a onclick="showView(\'admin\');closeMobileMenu()">Administración</a>' : ''}
          <div class="dropdown-divider"></div>
          <a onclick="Auth.logout()" class="logout-link">Cerrar sesión</a>
        </div>
      </div>
      <button class="btn-primary" onclick="showView('create');closeMobileMenu()">Publicar negocio</button>`;
    el.innerHTML = html;
    if (mob) mob.innerHTML = `<button class="btn-ghost" onclick="showView('dashboard');closeMobileMenu()">Mi panel</button><button class="btn-primary" onclick="showView('create');closeMobileMenu()">Publicar negocio</button>`;
  } else {
    el.innerHTML = `
      <button class="btn-ghost" onclick="openAuthModal('login')">Iniciar sesión</button>
      <button class="btn-primary" onclick="openAuthModal('register')">Registrarse gratis</button>`;
    if (mob) mob.innerHTML = `<button class="btn-ghost" onclick="openAuthModal('login');closeMobileMenu()">Iniciar sesión</button><button class="btn-primary" onclick="openAuthModal('register');closeMobileMenu()">Registrarse gratis</button>`;
  }
  lucide.createIcons();
}

function toggleUserMenu() {
  document.getElementById('userDropdown')?.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-user-menu')) document.getElementById('userDropdown')?.classList.remove('open');
});

function openAuthModal(tab = 'login') {
  document.getElementById('authModal').style.display = 'flex';
  switchAuthTab(tab);
}
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }
function switchAuthTab(tab) {
  document.getElementById('loginTab').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('registerTab').style.display = tab === 'register' ? '' : 'none';
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
}
function doLogin(e) {
  e.preventDefault();
  const r = Auth.login(document.getElementById('loginEmail').value, document.getElementById('loginPass').value);
  if (!r.ok) { showAuthError('loginError', r.msg); return; }
  closeAuthModal();
  updateNavAuth();
  showToast('Bienvenido, ' + r.user.name.split(' ')[0]);
}
function doRegister(e) {
  e.preventDefault();
  const r = Auth.register(document.getElementById('regName').value, document.getElementById('regEmail').value, document.getElementById('regPhone').value, document.getElementById('regPass').value);
  if (!r.ok) { showAuthError('registerError', r.msg); return; }
  closeAuthModal();
  updateNavAuth();
  showToast('Cuenta creada. Bienvenido a FindBiz');
}
function showAuthError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}
