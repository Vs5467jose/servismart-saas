/**
 * THEMO ServiSmart SaaS — Renderizador de Interfaz Gráfica (DOM)
 * 
 * Se encarga de pintar el Tablero Kanban, la tabla de Clientes, la Ficha de Técnicos,
 * la tabla de Equipos y preparar la vista imprimible en PDF de 1 página.
 */

window.UIRenderer = {

  formatCOP: function(num) {
    return "$" + Number(num).toLocaleString("es-CO") + " COP";
  },

  showToast: function(msg, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    const bg = type === "success" ? "bg-[#1d4ed8]" : "bg-[#1e293b]";
    toast.className = `${bg} text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold transition-all duration-300 transform translate-y-2 opacity-0 flex items-center gap-2 border border-white/10`;
    toast.innerHTML = `<span>🔔</span> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 50);

    setTimeout(() => {
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  renderKanban: function(filteredOrders) {
    const cols = ["new", "scheduled", "in_progress", "completed"];
    
    cols.forEach(status => {
      const colOrders = filteredOrders.filter(o => o.status === status);
      const countEl = document.getElementById(`colCount-${status}`);
      const listEl = document.getElementById(`colList-${status}`);
      
      if (countEl) countEl.innerText = colOrders.length;
      if (!listEl) return;

      if (colOrders.length === 0) {
        listEl.innerHTML = `
          <div class="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/60">
            No hay órdenes en esta fase
          </div>
        `;
        return;
      }

      listEl.innerHTML = colOrders.map(order => {
        const tech = window.technicians.find(t => t.id === order.techId);
        let techBadge = `<span class="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-medium">⚠️ Sin asignar</span>`;
        if (tech) {
          if (tech.status === "disponible") {
            techBadge = `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-semibold">🟢 ${tech.name}</span>`;
          } else if (tech.status === "en_cita") {
            techBadge = `<span class="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] px-2 py-0.5 rounded-full font-semibold">🔵 ${tech.name}</span>`;
          } else {
            techBadge = `<span class="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] px-2 py-0.5 rounded-full font-semibold">🔴 ${tech.name}</span>`;
          }
        }

        const isWarranty = order.status === "completed";

        return `
          <div class="bg-white border ${isWarranty ? 'border-blue-400 shadow-blue-500/10' : 'border-slate-200'} rounded-2xl p-4 shadow-xs flex flex-col gap-2.5 hover:border-[#1d4ed8] hover:shadow-md transition group">
            <div class="flex items-start justify-between gap-2">
              <span class="font-mono text-xs font-bold text-[#1d4ed8] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">${order.id}</span>
              <span class="text-xs font-black text-slate-900">${this.formatCOP(order.cost)}</span>
            </div>

            <div>
              <h4 class="font-bold text-sm text-slate-900 leading-tight">${order.clientName}</h4>
              <p class="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">📍 ${order.clientAddress}</p>
              <p class="text-[11px] text-[#1d4ed8] font-semibold flex items-center gap-1 cursor-pointer hover:underline mt-0.5" onclick="App.simulateWhatsApp('${order.clientPhone}', '${order.clientName}')">
                📱 ${order.clientPhone}
              </p>
            </div>

            <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-[11px] space-y-1">
              <div class="flex items-center justify-between text-slate-700">
                <span class="font-bold text-slate-900">❄️ ${order.equipType}</span>
                <span class="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-medium">${order.equipBrand}</span>
              </div>
              <p class="text-slate-500 text-[10px] line-clamp-1"><strong>Falla:</strong> ${order.equipFault}</p>
            </div>

            ${isWarranty ? `
              <div class="bg-blue-50 border border-blue-200 rounded-xl px-2.5 py-1 text-[10px] text-blue-900 flex items-center justify-between font-bold">
                <span>🛡️ Garantía 3M Activa</span>
                <span>Vence: ${window.WarrantyEngine.calcExpirationDate(order.completedDate)}</span>
              </div>
            ` : ''}

            <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
              ${techBadge}
              <div class="flex items-center gap-1.5">
                <button onclick="App.openPrintModal('${order.id}')" title="Ver Orden / Ficha Técnica en PDF" class="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition text-xs">
                  📄
                </button>
                <button onclick="App.advanceOrderStatus('${order.id}')" title="Avanzar de fase" class="px-2.5 py-1 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 shadow-2xs">
                  <span>Avanzar</span> →
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    });
  },

  renderClientsTable: function(orders) {
    const tbody = document.getElementById("clientsTableBody");
    if (!tbody) return;

    const clientMap = {};
    orders.forEach(o => {
      if (!clientMap[o.clientPhone]) {
        clientMap[o.clientPhone] = {
          name: o.clientName,
          phone: o.clientPhone,
          address: o.clientAddress,
          orderCount: 1,
          hasWarranty: o.status === "completed"
        };
      } else {
        clientMap[o.clientPhone].orderCount++;
        if (o.status === "completed") clientMap[o.clientPhone].hasWarranty = true;
      }
    });

    const clientList = Object.values(clientMap);
    const badgeEl = document.getElementById("badgeClientCount");
    if (badgeEl) badgeEl.innerText = clientList.length;

    tbody.innerHTML = clientList.map(c => `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="p-3 font-bold text-slate-900">${c.name}</td>
        <td class="p-3 text-[#1d4ed8] font-semibold cursor-pointer hover:underline" onclick="App.simulateWhatsApp('${c.phone}', '${c.name}')">${c.phone}</td>
        <td class="p-3 text-slate-600">${c.address}</td>
        <td class="p-3 font-semibold text-slate-800">${c.orderCount} orden(es)</td>
        <td class="p-3">
          ${c.hasWarranty 
            ? '<span class="bg-blue-50 text-[#1d4ed8] border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">🛡️ Activa</span>' 
            : '<span class="text-slate-400 text-[11px]">—</span>'}
        </td>
        <td class="p-3 text-right">
          <button onclick="App.openNewOrderModalForClient('${c.name}', '${c.phone}', '${c.address}')" class="text-xs text-[#1d4ed8] hover:underline font-bold">+ Nueva Cita</button>
        </td>
      </tr>
    `).join("");
  },

  renderTechCards: function(technicians, orders) {
    const container = document.getElementById("techCardsContainer");
    if (!container) return;

    container.innerHTML = technicians.map(t => {
      let statusBadge = "";
      let btnText = "";
      if (t.status === "disponible") {
        statusBadge = `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">🟢 Disponible (Libre)</span>`;
        btnText = "Marcar en Cita";
      } else if (t.status === "en_cita") {
        statusBadge = `<span class="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">🔵 En Cita de Servicio</span>`;
        btnText = "Marcar No Disponible";
      } else {
        statusBadge = `<span class="bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">🔴 No Disponible</span>`;
        btnText = "Marcar Disponible";
      }

      const activeOrder = orders.find(o => o.techId === t.id && (o.status === "scheduled" || o.status === "in_progress"));

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 font-black text-lg flex items-center justify-center border border-slate-200">
                🧑‍🔧
              </div>
              ${statusBadge}
            </div>

            <h4 class="font-bold text-base text-slate-900">${t.name}</h4>
            <p class="text-xs text-[#1d4ed8] font-semibold">${t.specialty}</p>
            <p class="text-xs text-slate-500 mt-1">📱 ${t.phone}</p>

            <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <p class="text-slate-500 font-semibold text-[10px] uppercase">Servicio Actual:</p>
              <p class="font-bold text-slate-800 mt-0.5">${activeOrder ? `${activeOrder.id} - ${activeOrder.clientName}` : 'Sin cita activa en este momento'}</p>
            </div>
          </div>

          <button onclick="App.toggleTechStatus(${t.id})" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition border border-slate-200">
            🔄 ${btnText}
          </button>
        </div>
      `;
    }).join("");
  },

  renderEquipmentTable: function(orders) {
    const tbody = document.getElementById("equipmentTableBody");
    if (!tbody) return;

    tbody.innerHTML = orders.map(o => {
      const isWarranty = o.status === "completed";
      return `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="p-3 font-mono font-bold text-[#1d4ed8]">${o.id}</td>
          <td class="p-3 font-bold text-slate-900">${o.equipType} (${o.equipBrand})</td>
          <td class="p-3 font-mono text-slate-600">${o.equipSerial}</td>
          <td class="p-3 text-slate-700">${o.clientName}</td>
          <td class="p-3">
            ${isWarranty 
              ? `<span class="font-bold text-emerald-700">${window.WarrantyEngine.calcExpirationDate(o.completedDate)} (90 días)</span>` 
              : '<span class="text-slate-400">En proceso de atención</span>'}
          </td>
          <td class="p-3">
            ${isWarranty 
              ? '<span class="bg-blue-50 text-[#1d4ed8] font-bold text-[10px] px-2 py-0.5 rounded-full border border-blue-200">3 Alarmas Activas</span>'
              : '<span class="text-slate-400 text-xs">Sin alarma aún</span>'}
          </td>
        </tr>
      `;
    }).join("");
  },

  renderAlarmsModal: function(orders) {
    const container = document.getElementById("alarmsListContainer");
    const completedOrders = orders.filter(o => o.status === "completed");

    const badgeWarranty = document.getElementById("badgeWarrantyCount");
    if (badgeWarranty) badgeWarranty.innerText = completedOrders.length;

    const totalAlarms = completedOrders.length * 3;
    const badge1 = document.getElementById("alarmsCountBadge");
    const badge2 = document.getElementById("topbarAlarmsBadge");
    const badge3 = document.getElementById("sidebarAlarmsCount");
    if (badge1) badge1.innerText = totalAlarms;
    if (badge2) badge2.innerText = totalAlarms;
    if (badge3) badge3.innerText = totalAlarms;

    if (!container) return;

    if (completedOrders.length === 0) {
      container.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">No hay garantías activas todavía.</p>`;
      return;
    }

    container.innerHTML = completedOrders.map(o => {
      const schedule = window.WarrantyEngine.generateAlarmSchedule(o.completedDate);
      return `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-900">${o.id} — ${o.clientName}</span>
            <span class="text-[#1d4ed8] font-semibold">${o.equipType}</span>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div class="bg-white p-2.5 rounded-xl border border-slate-200">
              <span class="text-[#1d4ed8] font-bold block">1. Calidad (+24h)</span>
              <span class="text-slate-600 font-medium">${schedule.qualityControlDate}</span>
              <button onclick="App.simulateWhatsApp('${o.clientPhone}', '${o.clientName}')" class="mt-1 text-[10px] text-blue-600 underline font-semibold block">Simular WhatsApp</button>
            </div>
            <div class="bg-white p-2.5 rounded-xl border border-slate-200">
              <span class="text-slate-800 font-bold block">2. Checkup (+60d)</span>
              <span class="text-slate-600 font-medium">${schedule.checkupDate}</span>
              <span class="text-[10px] text-slate-500 block mt-1">Encuesta estado</span>
            </div>
            <div class="bg-white p-2.5 rounded-xl border border-slate-200">
              <span class="text-[#1d4ed8] font-bold block">3. Cierre (+85d)</span>
              <span class="text-slate-600 font-medium">${schedule.renewalNoticeDate}</span>
              <span class="text-[10px] text-blue-700 font-semibold block mt-1">Oferta Mantenimiento</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
};
