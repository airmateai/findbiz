// ===== DATA =====
const LISTINGS = [
  {
    id:1, title:'Bar-cafetería en el centro de Santa Cruz', category:'Hostelería', zone:'Santa Cruz',
    price:45000, rent:1200, metros:90, revenue:180000,
    desc:'Bar-cafetería en pleno centro de Santa Cruz con más de 15 años de actividad. Clientela fija y consolidada, terraza con 8 mesas, cocina totalmente equipada. Motivo del traspaso: jubilación del propietario. Se incluye todo el personal y equipamiento.',
    featured:true, verified:true, owner:'José Manuel García', phone:'600 123 456', date:'2025-06-01',
    lat:28.4636, lng:-16.2518, views:187, contacts:14,
    photos:[
      'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    ]
  },
  {
    id:2, title:'Peluquería mixta en Playa de las Américas', category:'Belleza y Estética', zone:'Playa de las Américas',
    price:28000, rent:850, metros:55, revenue:95000,
    desc:'Peluquería mixta con 8 años de trayectoria en zona turística de alta demanda. 4 sillas de trabajo, lavacabezas y mobiliario completo. Zona de uñas incluida. Equipo de dos trabajadoras con contrato en vigor.',
    featured:false, verified:true, owner:'María Fernández', phone:'622 456 789', date:'2025-05-28',
    lat:28.0553, lng:-16.7145, views:94, contacts:6,
    photos:[
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
    ]
  },
  {
    id:3, title:'Restaurante italiano en Puerto de la Cruz', category:'Hostelería', zone:'Puerto de la Cruz',
    price:85000, rent:2100, metros:160, revenue:320000,
    desc:'Restaurante italiano de referencia en Puerto de la Cruz con capacidad para 70 comensales. Horno de leña profesional y cocina equipada de alta gama. Situado en zona peatonal con alta afluencia turística todo el año.',
    featured:true, verified:true, owner:'Roberto Lanzaro', phone:'634 789 012', date:'2025-05-25',
    lat:28.4145, lng:-16.5497, views:312, contacts:27,
    photos:[
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    ]
  },
  {
    id:4, title:'Gimnasio boutique en La Laguna', category:'Deportes', zone:'La Laguna',
    price:55000, rent:1500, metros:200, revenue:140000,
    desc:'Gimnasio boutique especializado en CrossFit y entrenamiento funcional. 150 socios activos, equipamiento de último modelo y vestuarios completos. Excelente reputación en redes sociales con más de 2.000 seguidores.',
    featured:false, verified:true, owner:'Carlos Medina', phone:'618 234 567', date:'2025-05-20',
    lat:28.4850, lng:-16.3159, views:76, contacts:5,
    photos:[
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
    ]
  },
  {
    id:5, title:'Farmacia en Adeje', category:'Salud', zone:'Adeje',
    price:220000, rent:2800, metros:120, revenue:580000,
    desc:'Farmacia en zona de alta densidad de población con crecimiento sostenido. Licencia en plena vigencia. Stock incluido. Facturación en constante aumento los últimos tres años. Oportunidad única en área de expansión urbanística.',
    featured:true, verified:false, owner:'Dra. Ana Suárez', phone:'650 345 678', date:'2025-05-18',
    lat:28.1227, lng:-16.7259, views:241, contacts:19,
    photos:[
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    ]
  },
  {
    id:6, title:'Tienda de souvenirs en Los Cristianos', category:'Comercio', zone:'Los Cristianos',
    price:18000, rent:950, metros:40, revenue:72000,
    desc:'Tienda de souvenirs en primera línea del paseo marítimo de Los Cristianos. Excelente ubicación con flujo turístico constante. Incluye todo el stock y mobiliario. Ideal para emprendedor con experiencia en atención al cliente.',
    featured:false, verified:false, owner:'Pedro Acosta', phone:'666 012 345', date:'2025-05-15',
    lat:28.0516, lng:-16.7151, views:58, contacts:4,
    photos:[
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    ]
  },
];

const ALL_VIEWS = ['home','listings','create','detail','dashboard','favorites','alerts','admin','calculator','blog','blogpost'];
let currentListings = [...LISTINGS];
let lastCreated = null;
let map = null, mapMarkers = [], mapVisible = true;

// ===== VIEW =====
function showView(name) {
  ALL_VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.style.display = v === name ? '' : 'none';
  });
  const bm = document.getElementById('bizmatePanel');
  if (bm) bm.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'home') renderFeatured();
  if (name === 'listings') { renderListings(currentListings); setTimeout(() => { initMap(); renderMapMarkers(currentListings); }, 120); }
  if (name === 'dashboard') renderDashboard();
  if (name === 'favorites') renderFavoritesView();
  if (name === 'alerts') renderAlertsView();
  if (name === 'admin') renderAdmin();
  if (name === 'calculator') { lucide.createIcons(); }
  lucide.createIcons();
}

// ===== CATEGORY ICON =====
function categoryIcon(cat) {
  const icons = { 'Hostelería':'utensils', 'Comercio':'shopping-bag', 'Belleza y Estética':'scissors', 'Salud':'heart-pulse', 'Deportes':'dumbbell', 'Formação':'book-open', 'Formación':'book-open', 'Servicios':'wrench', 'Outros':'briefcase', 'Otros':'briefcase' };
  return icons[cat] || 'briefcase';
}

// ===== CARDS =====
function renderCard(listing) {
  const card = document.createElement('div');
  card.className = 'listing-card' + (listing.featured ? ' featured' : '');
  card.dataset.id = listing.id;
  card.onclick = () => showDetail(listing.id);
  card.onmouseenter = () => highlightMapMarker(listing.id, true);
  card.onmouseleave = () => highlightMapMarker(listing.id, false);
  const fav = isFavorite(listing.id);
  const photo = listing.photos && listing.photos[0];
  card.innerHTML = `
    <div class="card-image" style="${photo ? `background-image:url('${photo}');background-size:cover;background-position:center` : ''}">
      ${listing.featured ? '<div class="card-featured-badge">Destacado</div>' : ''}
      ${listing.verified ? '<div class="card-verified-badge">Verificado</div>' : ''}
      <button class="card-fav-btn ${fav ? 'active' : ''}" data-fav="${listing.id}" onclick="event.stopPropagation();toggleFavorite(${listing.id})">
        <i data-lucide="heart"></i>
      </button>
      ${!photo ? `<div class="card-category-icon"><i data-lucide="${categoryIcon(listing.category)}"></i></div>` : ''}
      <div class="card-cat-label">${listing.category}</div>
    </div>
    <div class="card-body">
      <div class="card-title">${listing.title}</div>
      <div class="card-location"><i data-lucide="map-pin"></i>${listing.zone}, Tenerife</div>
      <div class="card-price">${formatPrice(listing.price)}<span class="card-price-label"> traspaso</span></div>
      <div class="card-meta">
        ${listing.metros ? `<div class="card-meta-item"><strong>${listing.metros} m²</strong></div>` : ''}
        ${listing.rent ? `<div class="card-meta-item">Alquiler <strong>${formatPrice(listing.rent)}/mes</strong></div>` : ''}
        ${listing.revenue ? `<div class="card-meta-item">Facturación <strong>${formatPrice(listing.revenue)}/año</strong></div>` : ''}
      </div>
    </div>`;
  return card;
}

function renderFeatured() {
  const c = document.getElementById('featuredListings');
  if (!c) return;
  c.innerHTML = '';
  LISTINGS.filter(l => l.featured).slice(0, 3).forEach(l => { c.appendChild(renderCard(l)); });
  lucide.createIcons();
}

function renderListings(list) {
  const c = document.getElementById('allListings');
  if (!c) return;
  c.innerHTML = '';
  const count = document.getElementById('listingsCount');
  if (count) count.textContent = `${list.length} negocio${list.length !== 1 ? 's' : ''}`;
  if (!list.length) {
    c.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 24px;color:var(--gray)"><p style="font-size:16px;font-weight:600;color:var(--dark);margin-bottom:8px">No se encontraron negocios</p><p style="font-size:14px">Prueba con otros filtros</p></div>';
    return;
  }
  list.forEach(l => c.appendChild(renderCard(l)));
  if (map) renderMapMarkers(list);
  lucide.createIcons();
}

// ===== DETAIL =====
function showDetail(id) {
  const l = LISTINGS.find(x => x.id === id);
  if (!l) return;
  l.views = (l.views || 0) + 1;
  ALL_VIEWS.forEach(v => { const el = document.getElementById('view-' + v); if (el) el.style.display = v === 'detail' ? '' : 'none'; });
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const gallery = document.getElementById('detailGallery');
  if (l.photos && l.photos.length) {
    gallery.innerHTML = `
      <div class="gallery-main" id="galleryMain" style="background-image:url('${l.photos[0]}')"></div>
      ${l.photos.length > 1 ? `<div class="gallery-thumbs">${l.photos.map((p,i) => `<div class="gallery-thumb ${i===0?'active':''}" style="background-image:url('${p}')" onclick="setGalleryPhoto('${p}',this)"></div>`).join('')}</div>` : ''}
    `;
  } else {
    gallery.innerHTML = `<i data-lucide="${categoryIcon(l.category)}"></i>`;
  }

  const fav = isFavorite(l.id);
  document.getElementById('detailInfo').innerHTML = `
    <div class="detail-title-row">
      <h1>${l.title}</h1>
      <button class="fav-btn-lg ${fav ? 'active' : ''}" data-fav="${l.id}" onclick="toggleFavorite(${l.id})">
        <i data-lucide="heart"></i> ${fav ? 'Guardado' : 'Guardar'}
      </button>
    </div>
    <div class="detail-location">
      <i data-lucide="map-pin"></i> ${l.zone}, Tenerife
      ${l.verified ? '<span class="verified-badge"><i data-lucide="shield-check"></i> Verificado</span>' : ''}
    </div>
    <div class="detail-price-block">
      <div class="detail-price">${formatPrice(l.price)}</div>
      <div class="detail-price-label">Precio de traspaso</div>
    </div>
    <div class="detail-tags">
      <span class="detail-tag">${l.category}</span>
      ${l.metros ? `<span class="detail-tag">${l.metros} m²</span>` : ''}
      ${l.rent ? `<span class="detail-tag">Alquiler ${formatPrice(l.rent)}/mes</span>` : ''}
      ${l.revenue ? `<span class="detail-tag">Facturación ${formatPrice(l.revenue)}/año</span>` : ''}
      <span class="detail-tag">${l.views} visitas</span>
    </div>
    <div class="detail-desc">${l.desc}</div>`;

  document.getElementById('detailContact').innerHTML = `
    <div class="contact-card">
      <h4>Contactar con el vendedor</h4>
      <div class="contact-name">${l.owner}</div>
      <div class="contact-phone">${l.phone}</div>
      <button class="btn-contact btn-contact-call" onclick="window.open('tel:${l.phone.replace(/\s/g,'')}')">Llamar ahora</button>
      <button class="btn-contact btn-contact-wa" onclick="shareWhatsApp('${l.title.replace(/'/g,"\\'")}',${l.price})">Enviar WhatsApp</button>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <button class="bizmate-launch-btn" onclick="BizMate.open(LISTINGS.find(x=>x.id===${l.id}))">
          <div class="bm-icon"><i data-lucide="bot"></i></div>
          <div class="bm-label">Consultar con BizMate<span class="bm-sub">Asesor IA especializado</span></div>
        </button>
      </div>
    </div>`;

  renderRatings(l);
  renderShareButtons('shareButtons', l.title, l.price);
  lucide.createIcons();
}

function setGalleryPhoto(url, thumb) {
  document.getElementById('galleryMain').style.backgroundImage = `url('${url}')`;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// ===== RATINGS =====
function renderRatings(listing) {
  const reviews = JSON.parse(localStorage.getItem('fb_rev_' + listing.id) || '[]');
  const el = document.getElementById('detailRatings');
  if (!el) return;
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1) : null;
  el.innerHTML = `
    <div class="ratings-section">
      <div class="ratings-header">
        <h3>${avg ? `${avg} / 5 — ${reviews.length} valoracion${reviews.length !== 1 ? 'es' : ''}` : 'Sin valoraciones'}</h3>
        <button class="btn-outline" onclick="openReviewForm(${listing.id})">Añadir valoración</button>
      </div>
      ${reviews.slice(0, 3).map(r => `<div class="review-card"><div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div><div class="review-text">${r.text}</div><div class="review-author">${r.author} · ${r.date}</div></div>`).join('')}
      <div class="review-form" id="reviewForm_${listing.id}" style="display:none">
        <h4>Tu valoración</h4>
        <div class="star-selector" id="stars_${listing.id}">
          ${[1,2,3,4,5].map(n => `<span class="star" onclick="selectStar(${listing.id},${n})" data-val="${n}">☆</span>`).join('')}
        </div>
        <textarea id="reviewText_${listing.id}" rows="3" placeholder="Describe tu experiencia..." style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:8px;font-family:var(--font);font-size:14px;margin:8px 0;outline:none;resize:vertical"></textarea>
        <button class="btn-primary" onclick="submitReview(${listing.id})">Publicar valoración</button>
      </div>
    </div>`;
}

const selectedStars = {};
function selectStar(listingId, n) {
  selectedStars[listingId] = n;
  document.querySelectorAll(`#stars_${listingId} .star`).forEach((s, i) => s.textContent = i < n ? '★' : '☆');
}
function openReviewForm(id) {
  const f = document.getElementById('reviewForm_' + id);
  if (f) f.style.display = f.style.display === 'none' ? '' : 'none';
}
function submitReview(listingId) {
  const stars = selectedStars[listingId] || 5;
  const text = document.getElementById('reviewText_' + listingId).value;
  if (!text.trim()) { showToast('Escribe una valoración antes de publicar'); return; }
  const user = Auth.getUser();
  const reviews = JSON.parse(localStorage.getItem('fb_rev_' + listingId) || '[]');
  reviews.unshift({ stars, text, author: user ? user.name : 'Anónimo', date: new Date().toLocaleDateString('es-ES') });
  localStorage.setItem('fb_rev_' + listingId, JSON.stringify(reviews));
  renderRatings(LISTINGS.find(l => l.id === listingId));
  showToast('Valoración publicada');
}

// ===== MAP =====
function initMap() {
  if (map) { setTimeout(() => map.invalidateSize(), 100); return; }
  map = L.map('map', { zoomControl: true }).setView([28.2916, -16.6291], 10);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CARTO', maxZoom: 19 }).addTo(map);
}

function renderMapMarkers(list) {
  if (!map) return;
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];
  list.forEach(l => {
    if (!l.lat || !l.lng) return;
    const icon = L.divIcon({ className: '', html: `<div class="map-price-tag${l.featured ? ' featured' : ''}" data-mid="${l.id}">${formatPriceShort(l.price)}</div>`, iconAnchor: [40, 15] });
    const marker = L.marker([l.lat, l.lng], { icon }).addTo(map);
    marker._listing_id = l.id;
    const popup = L.popup({ closeButton: false, maxWidth: 250 }).setContent(`
      <div class="map-popup">
        <div class="map-popup-cat">${l.category}</div>
        <div class="map-popup-title">${l.title}</div>
        <div class="map-popup-zone">${l.zone}, Tenerife</div>
        <div class="map-popup-price">${formatPrice(l.price)}</div>
        <button class="map-popup-btn" onclick="showDetail(${l.id})">Ver anuncio completo</button>
      </div>`);
    marker.bindPopup(popup);
    marker.on('mouseover', () => { marker.openPopup(); highlightCard(l.id, true); });
    marker.on('mouseout', () => highlightCard(l.id, false));
    marker.on('click', () => showDetail(l.id));
    mapMarkers.push(marker);
  });
  if (mapMarkers.length) { const g = L.featureGroup(mapMarkers); map.fitBounds(g.getBounds().pad(0.15)); }
}

function highlightCard(id, on) {
  document.querySelector(`[data-id="${id}"]`)?.classList.toggle('highlighted', on);
}
function highlightMapMarker(id, on) {
  document.querySelector(`.map-price-tag[data-mid="${id}"]`)?.classList.toggle('active', on);
}

function toggleMap() {
  mapVisible = !mapVisible;
  const layout = document.getElementById('mapLayout');
  const btn = document.getElementById('mapToggleBtn');
  layout.classList.toggle('map-hidden', !mapVisible);
  btn.classList.toggle('active', mapVisible);
  btn.innerHTML = `<i data-lucide="map"></i> ${mapVisible ? 'Ocultar mapa' : 'Mapa'}`;
  if (mapVisible && map) setTimeout(() => map.invalidateSize(), 300);
  lucide.createIcons();
}

// ===== SEARCH & FILTERS =====
function doSearch() {
  const q = document.getElementById('heroSearch').value.toLowerCase();
  const cat = document.getElementById('heroCategory').value;
  currentListings = LISTINGS.filter(l => {
    const mq = !q || l.title.toLowerCase().includes(q) || l.zone.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
    const mc = !cat || l.category === cat;
    return mq && mc;
  });
  showView('listings');
}

function filterCategory(cat) {
  currentListings = cat ? LISTINGS.filter(l => l.category === cat) : [...LISTINGS];
  if (cat && document.getElementById('filterCategory')) document.getElementById('filterCategory').value = cat;
  showView('listings');
}

function applyFilters() {
  const cat = document.getElementById('filterCategory').value;
  const maxPrice = parseInt(document.getElementById('filterPrice').value);
  const zone = document.getElementById('filterZone').value;
  const sort = document.getElementById('sortBy').value;
  let filtered = LISTINGS.filter(l => (!cat || l.category === cat) && (!zone || l.zone === zone) && l.price <= maxPrice);
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  currentListings = filtered;
  renderListings(filtered);
}

function updatePriceLabel() {
  const v = parseInt(document.getElementById('filterPrice').value);
  document.getElementById('priceLabel').textContent = v >= 500000 ? 'Sin límite de precio' : `Hasta ${formatPrice(v)}`;
}

function resetFilters() {
  document.getElementById('filterCategory').value = '';
  document.getElementById('filterPrice').value = 500000;
  document.getElementById('filterZone').value = '';
  document.getElementById('sortBy').value = 'recent';
  updatePriceLabel();
  currentListings = [...LISTINGS];
  renderListings(currentListings);
}

// ===== CREATE =====
function submitListing(e) {
  e.preventDefault();
  if (!Auth.isLoggedIn()) { openAuthModal('login'); return; }
  const user = Auth.getUser();
  const newL = {
    id: Date.now(),
    title: document.getElementById('fTitle').value,
    category: document.getElementById('fCategory').value,
    zone: document.getElementById('fZone').value,
    price: parseInt(document.getElementById('fPrice').value) || 0,
    metros: parseInt(document.getElementById('fMetros').value) || null,
    rent: parseInt(document.getElementById('fRent').value) || null,
    revenue: parseInt(document.getElementById('fRevenue').value) || null,
    desc: document.getElementById('fDesc').value,
    featured: false, verified: false,
    owner: document.getElementById('fName').value,
    phone: document.getElementById('fPhone').value,
    ownerEmail: user.email,
    date: new Date().toISOString().split('T')[0],
    views: 0, contacts: 0,
  };
  LISTINGS.unshift(newL);
  currentListings = [...LISTINGS];
  lastCreated = newL;
  renderShareButtons('modalShareButtons', newL.title, newL.price);
  document.getElementById('successModal').style.display = 'flex';
  document.getElementById('createForm').reset();
  document.getElementById('photosPreview').innerHTML = '';
  lucide.createIcons();
}

function previewPhotos(e) {
  const preview = document.getElementById('photosPreview');
  preview.innerHTML = '';
  Array.from(e.target.files).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.className = 'photo-thumb';
    preview.appendChild(img);
  });
}

// ===== SHARE =====
function renderShareButtons(containerId, title, price) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${title} — ${formatPrice(price)} en FindBiz Tenerife`);
  c.innerHTML = `
    <button class="share-btn whatsapp" onclick="shareWhatsApp('${title.replace(/'/g,"\\'")}',${price})">
      <i data-lucide="message-circle"></i><span class="share-btn-text">WhatsApp<span class="share-btn-sub">Compartir por mensaje</span></span>
    </button>
    <button class="share-btn facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${url}','_blank')">
      <i data-lucide="facebook"></i><span class="share-btn-text">Facebook<span class="share-btn-sub">Compartir en Facebook</span></span>
    </button>
    <button class="share-btn instagram" onclick="copyToClipboard('${title} — ${formatPrice(price)}. FindBiz Tenerife')">
      <i data-lucide="instagram"></i><span class="share-btn-text">Instagram<span class="share-btn-sub">Copiar texto para Story</span></span>
    </button>
    <button class="share-btn tiktok" onclick="copyToClipboard('Traspaso: ${title} por ${formatPrice(price)} en Tenerife')">
      <i data-lucide="video"></i><span class="share-btn-text">TikTok<span class="share-btn-sub">Copiar texto para vídeo</span></span>
    </button>
    <button class="share-btn twitter" onclick="window.open('https://twitter.com/intent/tweet?text=${text}','_blank')">
      <i data-lucide="twitter"></i><span class="share-btn-text">X / Twitter<span class="share-btn-sub">Publicar en X</span></span>
    </button>`;
  lucide.createIcons();
}

function shareWhatsApp(title, price) {
  window.open('https://wa.me/?text=' + encodeURIComponent(`${title}\nPrecio: ${formatPrice(price)}\n\nVisto en FindBiz — traspasos en Tenerife\n${window.location.href}`), '_blank');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Texto copiado al portapapeles'));
}

// ===== FAVORITES =====
function getFavorites() { return JSON.parse(localStorage.getItem('fb_favs') || '[]'); }
function isFavorite(id) { return getFavorites().includes(id); }
function toggleFavorite(id) {
  if (!Auth.isLoggedIn()) { openAuthModal('login'); return; }
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx > -1) { favs.splice(idx, 1); showToast('Eliminado de guardados'); }
  else { favs.push(id); showToast('Guardado correctamente'); }
  localStorage.setItem('fb_favs', JSON.stringify(favs));
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => {
    b.classList.toggle('active', isFavorite(id));
  });
}

function renderFavoritesView() {
  const favs = getFavorites();
  const c = document.getElementById('favoritesContent');
  if (!favs.length) {
    c.innerHTML = '<div class="dash-empty"><h4>No tienes negocios guardados</h4><p>Guarda los negocios que te interesen para revisarlos más tarde</p><button class="btn-primary" style="margin-top:16px" onclick="showView(\'listings\')">Explorar negocios</button></div>';
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'listings-grid';
  favs.map(id => LISTINGS.find(l => l.id === id)).filter(Boolean).forEach(l => grid.appendChild(renderCard(l)));
  c.innerHTML = '';
  c.appendChild(grid);
  lucide.createIcons();
}

// ===== ALERTS =====
function getAlerts() { return JSON.parse(localStorage.getItem('fb_alerts') || '[]'); }
function renderAlertsView() {
  if (!Auth.isLoggedIn()) { openAuthModal('login'); return; }
  const alerts = getAlerts();
  document.getElementById('alertsContent').innerHTML = `
    <div class="alert-form-card">
      <h3>Nueva alerta de búsqueda</h3>
      <p>Te notificaremos cuando aparezca un negocio que cumpla tus criterios</p>
      <div class="form-row">
        <div class="form-group"><label>Categoría</label><select id="alertCat"><option value="">Cualquier categoría</option><option>Hostelería</option><option>Comercio</option><option>Belleza y Estética</option><option>Salud</option><option>Deportes</option><option>Formación</option><option>Servicios</option></select></div>
        <div class="form-group"><label>Zona</label><select id="alertZone"><option value="">Toda Tenerife</option><option>Santa Cruz</option><option>La Laguna</option><option>Puerto de la Cruz</option><option>Los Cristianos</option><option>Playa de las Américas</option><option>Adeje</option></select></div>
        <div class="form-group"><label>Precio máximo (€)</label><input type="number" id="alertPrice" placeholder="Sin límite" /></div>
      </div>
      <button class="btn-primary" onclick="createAlert()">Crear alerta</button>
    </div>
    <h3 style="font-size:16px;font-weight:700;margin-bottom:14px">Alertas activas (${alerts.length})</h3>
    ${!alerts.length ? '<p class="dash-empty-sm">No tienes alertas activas.</p>' :
      alerts.map(a => `<div class="alert-row"><div style="flex:1"><div style="font-weight:600;font-size:14px">${a.category || 'Cualquier categoría'} · ${a.zone || 'Toda Tenerife'}</div><div style="font-size:12px;color:var(--gray)">${a.price ? 'Hasta ' + formatPrice(parseInt(a.price)) : 'Cualquier precio'}</div></div><span class="dash-badge badge-green">Activa</span><button class="btn-ghost" style="font-size:12px;padding:6px 12px" onclick="deleteAlert(${a.id})">Eliminar</button></div>`).join('')}`;
}
function createAlert() {
  if (!Auth.isLoggedIn()) { openAuthModal('login'); return; }
  const alerts = getAlerts();
  alerts.push({ id: Date.now(), category: document.getElementById('alertCat').value, zone: document.getElementById('alertZone').value, price: document.getElementById('alertPrice').value });
  localStorage.setItem('fb_alerts', JSON.stringify(alerts));
  showToast('Alerta creada correctamente');
  renderAlertsView();
}
function deleteAlert(id) {
  localStorage.setItem('fb_alerts', JSON.stringify(getAlerts().filter(a => a.id !== id)));
  renderAlertsView();
  showToast('Alerta eliminada');
}

// ===== BLOG =====
const BLOG_POSTS = {
  1: { title: 'Cómo valorar un negocio antes de comprarlo', content: `<h2>Cómo valorar un negocio antes de comprarlo</h2><span class="blog-meta">15 mayo 2025 · 8 minutos de lectura</span><p>Comprar un negocio es una de las decisiones financieras más importantes de tu vida. Un error en la valoración puede costarte decenas de miles de euros. Aquí te explicamos los cinco métodos más usados por expertos.</p><h3>1. Múltiplo sobre EBITDA</h3><p>El método más extendido en la compraventa de negocios. El precio se calcula como un múltiplo del beneficio antes de intereses, impuestos y amortizaciones. En hostelería el rango habitual es entre 3x y 6x EBITDA.</p><h3>2. Múltiplo sobre facturación</h3><p>Más sencillo pero menos preciso. En bares y restaurantes, el precio suele estar entre 0.3x y 0.8x la facturación anual. Si te piden más de 1x, la justificación debe ser muy sólida.</p><h3>3. Valor de los activos</h3><p>Se suman el valor de todo el equipamiento, mobiliario, stock y reformas. Útil cuando el negocio no tiene historial de beneficios claro.</p><h3>4. Flujo de caja descontado</h3><p>El más sofisticado. Proyectas los flujos de caja futuros y los traes al valor presente. Requiere datos fiables de los últimos tres años.</p><h3>5. Comparables de mercado</h3><p>¿Cuánto se han vendido negocios similares en la misma zona? FindBiz te da acceso a datos reales del mercado en Tenerife.</p><h3>Conclusión</h3><p>Utiliza siempre al menos dos o tres métodos y contrasta los resultados. Si el vendedor se niega a mostrar la contabilidad, es una señal de alarma que no debes ignorar.</p>` },
  2: { title: 'El contrato de traspaso: qué debe incluir', content: `<h2>El contrato de traspaso: qué debe incluir sí o sí</h2><span class="blog-meta">2 mayo 2025 · 6 minutos de lectura</span><p>El contrato de traspaso es el documento más importante de toda la operación. Un contrato mal redactado puede dejarte sin protección legal si surgen problemas posteriores.</p><h3>Elementos obligatorios</h3><p><strong>Identificación de las partes:</strong> DNI o NIE, razón social si aplica y datos de contacto completos del comprador y el vendedor.</p><p><strong>Descripción exacta del negocio:</strong> Qué se traspasa exactamente, incluyendo nombre comercial, licencias, equipamiento, stock y cartera de clientes.</p><p><strong>Precio y forma de pago:</strong> Importe total, señal o arras, plazos y condiciones de financiación si las hubiera.</p><p><strong>Declaración de ausencia de deudas:</strong> El vendedor debe declarar expresamente que no existen deudas con proveedores, Hacienda o Seguridad Social.</p><h3>Cláusulas recomendadas</h3><p><strong>Período de acompañamiento:</strong> El vendedor permanece dos a cuatro semanas para facilitar la transición con clientes y proveedores.</p><p><strong>Pacto de no competencia:</strong> El vendedor no puede abrir un negocio de la misma actividad en un radio definido durante un período determinado.</p><h3>Consejo final</h3><p>Firma siempre ante notario. El coste es mínimo — entre 800 y 1.500 euros — y la protección legal que ofrece es máxima.</p>` },
  3: { title: 'Las mejores zonas de Tenerife para abrir negocio', content: `<h2>Las mejores zonas de Tenerife para abrir negocio en 2025</h2><span class="blog-meta">18 abril 2025 · 10 minutos de lectura</span><h3>Adeje — La zona con mayor crecimiento</h3><p>Mayor PIB per cápita de Tenerife. Costa Adeje concentra el turismo de mayor poder adquisitivo de la isla. Los alquileres son elevados, pero las facturaciones están muy por encima de la media.</p><h3>Santa Cruz — El mercado local más grande</h3><p>Capital y centro económico de la isla. Ideal para negocios de servicios, salud y comercio especializado. Clientela local y fija con alta recurrencia.</p><h3>La Laguna — El factor universitario</h3><p>Más de 20.000 estudiantes. El sector de ocio, hostelería y formación tiene muy buena demanda durante todo el curso académico. Precios de alquiler más contenidos que en el sur.</p><h3>Puerto de la Cruz — Turismo consolidado</h3><p>Turismo de mayor edad y nivel adquisitivo, principalmente alemán y nórdico. Muy estable durante todo el año, con buenos indicadores para hostelería y servicios turísticos.</p><h3>Los Cristianos y Las Américas</h3><p>El epicentro turístico número uno de Canarias. Rotación alta de visitantes internacionales y facturaciones máximas, aunque con competencia intensa y alquileres de los más caros de la isla.</p><h3>Conclusión</h3><p>No existe una zona perfecta para todos los negocios. Define primero el perfil de tu cliente objetivo y elige a continuación la zona donde ese perfil está más representado.</p>` }
};

function showBlogPost(id) {
  const post = BLOG_POSTS[id];
  if (!post) return;
  document.getElementById('blogPostContent').innerHTML = post.content;
  showView('blogpost');
}

// ===== MODALS =====
function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
  if (lastCreated) showDetail(lastCreated.id);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
  }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('hamburgerBtn')?.classList.remove('open');
  document.getElementById('mobileMenu')?.classList.remove('open');
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== UTILS =====
function formatPrice(n) {
  if (!n) return '—';
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}
function formatPriceShort(n) {
  if (!n) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0','') + 'M €';
  if (n >= 1000) return Math.round(n / 1000) + 'K €';
  return n + ' €';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  LISTINGS.forEach((l, i) => { if (i < 3) l.verified = true; });
  const users = Auth.getUsers();
  if (!users.find(u => u.email === 'admin@findbiz.es')) {
    Auth.register('Admin FindBiz', 'admin@findbiz.es', '', 'admin123');
    localStorage.removeItem('fb_user');
  }
  updateNavAuth();
  renderFeatured();
  renderListings(LISTINGS);
  lucide.createIcons();
});
