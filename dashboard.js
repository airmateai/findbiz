function renderDashboard() {
  const user = Auth.getUser();
  if (!user) { openAuthModal('login'); return; }
  const myListings = LISTINGS.filter(l => l.ownerEmail === user.email);
  const favs = getFavorites();
  document.getElementById('dashboardContent').innerHTML = `
    <div class="dash-header">
      <div class="dash-avatar">${user.avatar}</div>
      <div><h2>${user.name}</h2><p class="dash-email">${user.email}</p></div>
    </div>
    <div class="dash-stats">
      <div class="dash-stat-card"><div class="dash-stat-num">${myListings.length}</div><div class="dash-stat-label">Mis anuncios</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${myListings.reduce((a,l)=>a+(l.views||0),0)}</div><div class="dash-stat-label">Visitas totales</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${myListings.reduce((a,l)=>a+(l.contacts||0),0)}</div><div class="dash-stat-label">Contactos recibidos</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${favs.length}</div><div class="dash-stat-label">Negocios guardados</div></div>
    </div>
    <div class="dash-section">
      <div class="dash-section-header">
        <h3>Mis anuncios publicados</h3>
        <button class="btn-primary" onclick="showView('create')">Publicar nuevo anuncio</button>
      </div>
      ${!myListings.length ? `<div class="dash-empty"><h4>No tienes anuncios publicados</h4><p>Publica tu primer negocio de forma gratuita en minutos</p><button class="btn-primary" style="margin-top:16px" onclick="showView('create')">Publicar negocio</button></div>` : myListings.map(dashCard).join('')}
    </div>
    <div class="dash-section">
      <div class="dash-section-header">
        <h3>Negocios guardados</h3>
        <a href="#" onclick="showView('favorites')" class="link-arrow" style="font-size:13px">Ver todos</a>
      </div>
      ${!favs.length ? '<p class="dash-empty-sm">No tienes negocios guardados todavía.</p>' : (() => { const g = document.createElement('div'); g.className = 'listings-grid'; favs.slice(0,3).map(id=>LISTINGS.find(l=>l.id===id)).filter(Boolean).forEach(l=>g.appendChild(renderCard(l))); return g.outerHTML; })()}
    </div>`;
  lucide.createIcons();
}

function dashCard(l) {
  return `
    <div class="dash-listing-card">
      <div class="dash-listing-icon"><i data-lucide="${categoryIcon(l.category)}"></i></div>
      <div class="dash-listing-info">
        <div class="dash-listing-title">${l.title}</div>
        <div class="dash-listing-meta">
          <span class="dash-badge ${l.featured?'badge-gold':'badge-gray'}">${l.featured?'Destacado':'Básico'}</span>
          <span class="dash-badge ${l.verified?'badge-green':'badge-gray'}">${l.verified?'Verificado':'Pendiente verificación'}</span>
        </div>
        <div class="dash-listing-stats">
          <span>${l.views||0} visitas</span>
          <span>${l.contacts||0} contactos</span>
          <span>${formatPrice(l.price)}</span>
        </div>
      </div>
      <div class="dash-listing-actions">
        <button class="btn-outline" onclick="showDetail(${l.id})">Ver</button>
        ${!l.featured?`<button class="btn-primary" onclick="openFeaturedModal(${l.id})">Destacar</button>`:''}
      </div>
    </div>`;
}

function renderAdmin() {
  if (!Auth.isAdmin()) { showView('home'); return; }
  const pending = LISTINGS.filter(l=>!l.verified);
  const verified = LISTINGS.filter(l=>l.verified);
  const users = Auth.getUsers();
  document.getElementById('adminContent').innerHTML = `
    <div class="admin-stats">
      <div class="dash-stat-card"><div class="dash-stat-num">${LISTINGS.length}</div><div class="dash-stat-label">Total anuncios</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${pending.length}</div><div class="dash-stat-label">Pendientes revisión</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${users.length}</div><div class="dash-stat-label">Usuarios registrados</div></div>
      <div class="dash-stat-card"><div class="dash-stat-num">${LISTINGS.filter(l=>l.featured).length}</div><div class="dash-stat-label">Anuncios destacados</div></div>
    </div>
    <div class="dash-section">
      <h3>Pendientes de verificacion (${pending.length})</h3>
      ${!pending.length?'<p class="dash-empty-sm">No hay anuncios pendientes de revision.</p>':pending.map(l=>`<div class="admin-listing-row"><div class="dash-listing-icon" style="flex-shrink:0"><i data-lucide="${categoryIcon(l.category)}"></i></div><div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px">${l.title}</div><div style="font-size:12px;color:var(--gray)">${l.zone} · ${l.category} · ${formatPrice(l.price)}</div></div><button class="btn-primary" style="font-size:13px;padding:8px 14px" onclick="verifyListing(${l.id})">Verificar</button><button class="btn-ghost" style="font-size:13px;padding:8px 14px" onclick="rejectListing(${l.id})">Rechazar</button></div>`).join('')}
    </div>
    <div class="dash-section">
      <h3>Usuarios registrados (${users.length})</h3>
      <div class="admin-users-table">
        <div class="admin-table-header"><span>Nombre</span><span>Correo</span><span>Rol</span><span>Registro</span></div>
        ${users.map(u=>`<div class="admin-table-row"><span style="font-weight:600">${u.name}</span><span style="color:var(--gray)">${u.email}</span><span><span class="dash-badge ${u.role==='admin'?'badge-purple':'badge-gray'}">${u.role}</span></span><span style="color:var(--gray);font-size:12px">${new Date(u.createdAt).toLocaleDateString('es-ES')}</span></div>`).join('')}
      </div>
    </div>
    <div class="dash-section">
      <h3>Anuncios verificados (${verified.length})</h3>
      ${verified.map(l=>`<div class="admin-listing-row"><div class="dash-listing-icon" style="flex-shrink:0"><i data-lucide="${categoryIcon(l.category)}"></i></div><div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px">${l.title}</div><div style="font-size:12px;color:var(--gray)">${l.zone} · ${formatPrice(l.price)}</div></div><span class="dash-badge badge-green">Verificado</span>${!l.featured?`<button class="btn-outline" style="font-size:12px;padding:6px 12px" onclick="adminFeature(${l.id})">Destacar</button>`:'<span class="dash-badge badge-gold">Destacado</span>'}</div>`).join('')}
    </div>`;
  lucide.createIcons();
}

function verifyListing(id) {
  const l = LISTINGS.find(x=>x.id===id);
  if (l) { l.verified = true; showToast('Anuncio verificado'); renderAdmin(); }
}
function rejectListing(id) {
  const idx = LISTINGS.findIndex(x=>x.id===id);
  if (idx > -1) { LISTINGS.splice(idx,1); showToast('Anuncio eliminado'); renderAdmin(); }
}
function adminFeature(id) {
  const l = LISTINGS.find(x=>x.id===id);
  if (l) { l.featured=true; showToast('Anuncio destacado'); renderAdmin(); }
}

function openFeaturedModal(id) {
  document.getElementById('featuredModal').style.display = 'flex';
  document.getElementById('featuredModal').dataset.listingId = id;
}
function closeFeaturedModal() { document.getElementById('featuredModal').style.display = 'none'; }
function processFeaturedPayment() {
  const id = parseInt(document.getElementById('featuredModal').dataset.listingId);
  const l = LISTINGS.find(x=>x.id===id);
  if (l) { l.featured=true; showToast('Anuncio destacado correctamente'); closeFeaturedModal(); renderDashboard(); }
}

function calculateROI() {
  const price = parseFloat(document.getElementById('calcPrice').value)||0;
  const revenue = parseFloat(document.getElementById('calcRevenue').value)||0;
  const rent = parseFloat(document.getElementById('calcRent').value)||0;
  const margin = parseFloat(document.getElementById('calcMargin').value)||15;
  if (!price || !revenue) { document.getElementById('calcResult').innerHTML = '<div class="calc-placeholder"><p>Introduce el precio y la facturación para calcular</p></div>'; return; }
  const gross = revenue*(margin/100);
  const rentYear = rent*12;
  const expenses = revenue*0.05;
  const net = gross-rentYear-expenses;
  const roi = ((net/price)*100).toFixed(1);
  const payback = net > 0 ? (price/net).toFixed(1) : 'N/A';
  const multiple = (price/revenue).toFixed(2);
  const color = roi>15?'var(--success)':roi>8?'var(--warning)':'var(--danger)';
  document.getElementById('calcResult').innerHTML = `
    <div class="calc-result-grid">
      <div class="calc-result-card" style="border-color:${color}"><div class="calc-result-num" style="color:${color}">${roi}%</div><div class="calc-result-label">ROI anual estimado</div></div>
      <div class="calc-result-card"><div class="calc-result-num">${payback} años</div><div class="calc-result-label">Recuperación de inversión</div></div>
      <div class="calc-result-card"><div class="calc-result-num">${multiple}x</div><div class="calc-result-label">Múltiplo sobre facturación</div></div>
      <div class="calc-result-card"><div class="calc-result-num">${formatPrice(Math.round(net))}</div><div class="calc-result-label">Beneficio neto / año</div></div>
    </div>
    <div class="calc-breakdown">
      <h4>Desglose anual</h4>
      <div class="calc-row"><span>Facturación anual</span><span>${formatPrice(revenue)}</span></div>
      <div class="calc-row"><span>Margen bruto (${margin}%)</span><span>${formatPrice(Math.round(gross))}</span></div>
      <div class="calc-row neg"><span>Alquiler anual</span><span>-${formatPrice(rentYear)}</span></div>
      <div class="calc-row neg"><span>Gastos operativos estimados (5%)</span><span>-${formatPrice(Math.round(expenses))}</span></div>
      <div class="calc-row total"><span>Beneficio neto estimado</span><span>${formatPrice(Math.round(net))}</span></div>
    </div>
    <div class="calc-verdict" style="background:${roi>15?'var(--success-light)':roi>8?'var(--warning-light)':'#FEF2F2'};border-color:${color}">
      ${roi>15?'<strong>Muy buena inversión.</strong> Un ROI superior al 15% es excelente en este sector.':roi>8?'<strong>Inversión aceptable.</strong> Está dentro del rango habitual del mercado.':'<strong>ROI bajo.</strong> Considera negociar el precio o revisar la estructura de costes.'}
    </div>`;
}
