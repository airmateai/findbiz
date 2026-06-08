const BizMate = {
  listing: null,
  open(listing) {
    this.listing = listing;
    const panel = document.getElementById('bizmatePanel');
    panel.style.display = 'flex';
    document.getElementById('bizmateMessages').innerHTML = '';
    document.getElementById('bizmateListingName') && (document.getElementById('bizmateListingName').textContent = listing.title);
    setTimeout(() => {
      this.addMessage('bot', this.openingMessage(listing));
      setTimeout(() => this.showSuggestions(), 600);
    }, 350);
    lucide.createIcons();
  },
  close() { document.getElementById('bizmatePanel').style.display = 'none'; },
  openingMessage(l) {
    const roi = l.revenue && l.price ? Math.round(((l.revenue * 0.15 - (l.rent || 0) * 12) / l.price) * 100) : null;
    return `He analizado los datos de **${l.title}** y este es mi resumen inicial:\n\n**Ubicación:** ${l.zone} — ${this.zoneLabel(l.zone)}\n**Precio:** ${formatPrice(l.price)} — ${this.priceVerdict(l)}\n${roi !== null ? `**ROI estimado:** ${roi}% anual\n` : ''}${l.rent ? `**Alquiler:** ${formatPrice(l.rent)}/mes\n` : ''}\n¿En qué aspecto quieres profundizar?`;
  },
  zoneLabel(z) {
    const m = { 'Santa Cruz':'capital, mercado local sólido', 'La Laguna':'zona universitaria, alta demanda joven', 'Puerto de la Cruz':'turismo consolidado todo el año', 'Los Cristianos':'zona turística, alta rotación', 'Playa de las Américas':'máxima concentración turística de la isla', 'Adeje':'mayor crecimiento urbanístico de Tenerife', 'Arona':'zona costera con buena relación coste-beneficio', 'Güímar':'mercado local tranquilo, menor competencia', 'Candelaria':'flujo turístico-religioso, mercado local estable' };
    return m[z] || 'zona con potencial';
  },
  priceVerdict(l) {
    if (!l.revenue) return 'pendiente de contrastar con facturación real';
    const m = l.price / l.revenue;
    if (m < 0.3) return 'precio muy competitivo respecto a la facturación';
    if (m < 0.6) return 'precio dentro del rango de mercado';
    if (m < 1.0) return 'precio en el límite superior, con margen de negociación';
    return 'precio elevado respecto a la facturación, negociar antes de decidir';
  },
  showSuggestions() {
    const el = document.getElementById('bizmateMessages');
    const div = document.createElement('div');
    div.className = 'bizmate-suggestions';
    ['¿Es un precio justo?', '¿Cuánto podría ganar?', '¿Qué debo revisar antes de comprar?', '¿Cómo negocia bien?'].forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-btn';
      btn.textContent = s;
      btn.onclick = () => { div.remove(); this.sendMessage(s); };
      div.appendChild(btn);
    });
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  },
  sendMessage(text) {
    if (!text?.trim()) return;
    this.addMessage('user', text);
    document.getElementById('bizmateInput').value = '';
    setTimeout(() => this.addMessage('bot', this.respond(text.toLowerCase())), 700 + Math.random() * 500);
  },
  respond(q) {
    const l = this.listing;
    if (q.includes('precio') || q.includes('caro') || q.includes('barato') || q.includes('justo')) {
      const m = l.revenue ? (l.price / l.revenue).toFixed(2) : null;
      return `**Análisis de precio:**\n\nPrecio de traspaso: **${formatPrice(l.price)}**\n${l.revenue ? `Facturación anual: **${formatPrice(l.revenue)}**\nMúltiplo sobre ventas: **${m}x**\n\nEn negocios de ${l.category} en Tenerife, el rango habitual es entre **0.3x y 0.8x** sobre facturación.\n\n` : ''}**Veredicto:** ${this.priceVerdict(l)}\n\nTe recomiendo pedir la contabilidad de los últimos tres años antes de cualquier oferta.`;
    }
    if (q.includes('ganar') || q.includes('rentabilidad') || q.includes('roi') || q.includes('beneficio')) {
      if (!l.revenue) return 'Para calcular la rentabilidad necesito conocer la facturación anual del negocio. Te recomiendo solicitarla al vendedor antes de avanzar.';
      const gross = Math.round(l.revenue * 0.15);
      const rentYear = (l.rent || 0) * 12;
      const net = gross - rentYear;
      const roi = Math.round((net / l.price) * 100);
      return `**Simulación de rentabilidad:**\n\nFacturación anual: ${formatPrice(l.revenue)}\nMargen estimado (15%): ${formatPrice(gross)}\nAlquiler anual: -${formatPrice(rentYear)}\n**Beneficio neto estimado: ${formatPrice(net)}/año**\n\nROI estimado: **${roi}% anual**\nRecuperación de inversión: **~${Math.round(100/roi)} años**\n\nEsta es una estimación orientativa. Valida siempre los datos con la contabilidad real del negocio.`;
    }
    if (q.includes('revisar') || q.includes('comprobar') || q.includes('documentos') || q.includes('antes de')) {
      return `**Lista de verificación para este traspaso:**\n\n**Documentación obligatoria:**\n— Contabilidad de los últimos 3 años\n— Declaraciones de IVA (Modelo 303)\n— Contrato de arrendamiento vigente\n— Licencia de actividad en vigor\n— Certificado de estar al corriente con Hacienda y Seguridad Social\n\n**Visitas recomendadas:**\n— Al menos 3 visitas en diferentes días y horarios\n— Una visita en hora punta para observar la actividad real\n— Conversar con los empleados si los hubiera\n\n**Señales de alerta:**\n— Negativa a mostrar la contabilidad\n— Motivo del traspaso poco claro\n— Deudas con proveedores no declaradas\n— Problemas con la licencia de actividad\n\n¿Quieres que profundice en alguno de estos puntos?`;
    }
    if (q.includes('negociar') || q.includes('oferta') || q.includes('descuento')) {
      return `**Estrategia de negociación:**\n\nPrecio publicado: **${formatPrice(l.price)}**\nOferta de apertura recomendada: **${formatPrice(Math.round(l.price * 0.85))}**\n\n**Argumentos sólidos:**\n— Solicita justificación documental del precio\n— Equipamiento antiguo es un punto de negociación\n— Propón un período de acompañamiento del vendedor\n— Valora un pago aplazado si el vendedor tiene urgencia\n\n**Evita:**\n— Ofertas demasiado bajas sin argumento (cierra puertas)\n— Comprometerte antes de revisar la contabilidad\n\n¿Tienes algún argumento específico que quieras valorar?`;
    }
    if (q.includes('zona') || q.includes('ubicaci') || q.includes('barrio')) {
      return `**Análisis de ${l.zone}:**\n\n${l.zone} es una zona con ${this.zoneLabel(l.zone)}.\n\n**Para un negocio de ${l.category}** en esta ubicación, los factores más relevantes son la densidad de clientela potencial, la competencia directa en el entorno y la accesibilidad del local.\n\nTe recomiendo hacer una visita a la zona en diferentes horarios antes de tomar cualquier decisión.`;
    }
    if (q.includes('financi') || q.includes('banco') || q.includes('préstamo')) {
      return `**Opciones de financiación:**\n\nPrecio del traspaso: **${formatPrice(l.price)}**\n\n**Préstamo bancario:** Las entidades suelen financiar hasta el 60-70% del precio. Necesitarás la contabilidad del negocio y un plan de viabilidad.\n\n**Líneas ICO:** El Instituto de Crédito Oficial tiene líneas específicas para adquisición de negocios con condiciones favorables.\n\n**Pago aplazado:** Algunos vendedores aceptan cobrar en dos o tres plazos, especialmente si tienen cierta urgencia.\n\n**Para la solicitud al banco necesitarás:**\n— Contabilidad de los últimos 3 años del negocio\n— Tu declaración de la renta\n— Plan de negocio con proyecciones\n\n¿Quieres ayuda para estimar cuánto necesitarías financiar?`;
    }
    if (q.includes('proceso') || q.includes('pasos') || q.includes('cómo funciona') || q.includes('traspaso')) {
      return `**Proceso de un traspaso paso a paso:**\n\n1. **Visita inicial** — Conocer el negocio y al vendedor\n2. **Due diligence** — Revisar contabilidad, contratos y licencias\n3. **Oferta formal** — Carta de intenciones con precio y condiciones\n4. **Contrato de arras** — Señal del 10-15% para reservar\n5. **Notaría** — Firma del contrato de traspaso\n6. **Subrogación** — Cambio de titularidad del contrato de alquiler\n7. **Licencia** — Cambio de titular de la licencia de actividad\n\nDuración media del proceso: entre 4 y 8 semanas.\n\n¿Te explico alguna fase en detalle?`;
    }
    return `Entiendo tu consulta sobre **${l.title}**. Para darte la respuesta más precisa, ¿puedes indicarme en qué aspecto concreto quieres centrarte?\n\nPuedo analizar el precio, la rentabilidad, el proceso de traspaso, la financiación o la negociación con el vendedor.`;
  },
  addMessage(role, text) {
    const el = document.getElementById('bizmateMessages');
    const div = document.createElement('div');
    div.className = `bm-message bm-${role}`;
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    if (role === 'bot') {
      div.innerHTML = `<div class="bm-icon">BM</div><div class="bm-bubble">${formatted}</div>`;
    } else {
      div.innerHTML = `<div class="bm-bubble">${formatted}</div>`;
    }
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }
};

function handleBizmateKey(e) {
  if (e.key === 'Enter') BizMate.sendMessage(document.getElementById('bizmateInput').value);
}
