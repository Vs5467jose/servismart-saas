/**
 * THEMO ServiSmart SaaS — Controlador Principal (App Controller)
 * 
 * Gestiona el ciclo de vida de la aplicación, el cambio de pestañas,
 * la creación de órdenes, los modales y la captura de eventos.
 */

window.App = {

  init: function() {
    this.render();
  },

  render: function() {
    const q = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();

    const filteredOrders = window.orders.filter(o => {
      return o.clientName.toLowerCase().includes(q) ||
             o.clientPhone.includes(q) ||
             o.id.toLowerCase().includes(q) ||
             o.equipBrand.toLowerCase().includes(q) ||
             o.equipType.toLowerCase().includes(q);
    });

    // Actualizar KPIs de cabecera
    const newOrders = filteredOrders.filter(o => o.status === "new");
    const scheduledOrders = filteredOrders.filter(o => o.status === "scheduled");
    const completedOrders = filteredOrders.filter(o => o.status === "completed");
    const freeTechs = window.TechManager.getAvailableTechnicians().length;

    const statNew = document.getElementById("statNewOrders");
    const statSched = document.getElementById("statScheduledToday");
    const statTechs = document.getElementById("statAvailableTechs");
    const statWarr = document.getElementById("statActiveWarranties");

    if (statNew) statNew.innerText = newOrders.length;
    if (statSched) statSched.innerText = scheduledOrders.length;
    if (statTechs) statTechs.innerText = `${freeTechs} / ${window.technicians.length}`;
    if (statWarr) statWarr.innerText = completedOrders.length;

    // Renderizar vistas según módulo
    window.UIRenderer.renderKanban(filteredOrders);
    window.UIRenderer.renderClientsTable(window.orders);
    window.UIRenderer.renderTechCards(window.technicians, window.orders);
    window.UIRenderer.renderEquipmentTable(window.orders);
    window.UIRenderer.renderAlarmsModal(window.orders);
  },

  switchTab: function(tabName) {
    window.currentTab = tabName;
    const tabs = ["dashboard", "clients", "technicians", "equipment"];
    
    tabs.forEach(t => {
      const el = document.getElementById("tab-" + t);
      const btn = document.getElementById("nav-" + t);
      if (el) el.classList.toggle("hidden", t !== tabName);
      if (btn) {
        if (t === tabName) {
          btn.className = "nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition bg-blue-50 text-[#1d4ed8] border border-blue-100";
        } else {
          btn.className = "nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition border border-transparent";
        }
      }
    });

    this.render();
  },

  advanceOrderStatus: function(orderId) {
    const order = window.orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status === "new") {
      if (!order.techId) {
        const assignedTech = window.TechManager.autoAssignFreeTech(order);
        if (assignedTech) {
          window.UIRenderer.showToast(`Técnico ${assignedTech.name} asignado automáticamente.`, "success");
        }
      }
      order.status = "scheduled";
      window.UIRenderer.showToast(`Orden ${order.id} agendada formalmente.`, "info");
    } else if (order.status === "scheduled") {
      order.status = "in_progress";
      window.UIRenderer.showToast(`Orden ${order.id} marcada En Servicio.`, "info");
    } else if (order.status === "in_progress") {
      order.status = "completed";
      order.completedDate = new Date().toISOString().split("T")[0];
      
      // Liberar al técnico asignado
      if (order.techId) {
        window.TechManager.releaseTech(order.techId);
      }

      window.UIRenderer.showToast(`🎉 ¡Servicio completado! Se activó la Garantía de 3 Meses y las 3 Alarmas.`, "success");
    } else {
      window.UIRenderer.showToast(`La orden ya se encuentra Completada con Garantía Activa.`, "info");
    }

    this.render();
  },

  toggleTechStatus: function(techId) {
    const tech = window.TechManager.toggleStatus(techId);
    if (tech) {
      window.UIRenderer.showToast(`Estado de ${tech.name} actualizado.`, "info");
      this.render();
    }
  },

  openNewOrderModal: function() {
    const techSelect = document.getElementById("techSelect");
    if (!techSelect) return;

    let optionsHtml = '<option value="">Seleccione un técnico...</option>';
    window.technicians.forEach(t => {
      if (t.status === "disponible") {
        optionsHtml += `<option value="${t.id}">🟢 ${t.name} - ${t.specialty} (Libre)</option>`;
      } else if (t.status === "en_cita") {
        optionsHtml += `<option value="${t.id}">🔵 ${t.name} - ${t.specialty} (En Cita)</option>`;
      } else {
        optionsHtml += `<option value="${t.id}" disabled>🔴 ${t.name} - ${t.specialty} (No Disponible)</option>`;
      }
    });

    techSelect.innerHTML = optionsHtml;
    document.getElementById("newOrderModal")?.classList.remove("hidden");
  },

  openNewOrderModalForClient: function(name, phone, address) {
    this.openNewOrderModal();
    document.getElementById("clientName").value = name;
    document.getElementById("clientPhone").value = phone;
    document.getElementById("clientAddress").value = address;
  },

  closeNewOrderModal: function() {
    document.getElementById("newOrderModal")?.classList.add("hidden");
  },

  setQuickPrice: function(val) {
    const costInput = document.getElementById("orderCost");
    const label = document.getElementById("displayPriceLabel");
    if (costInput) costInput.value = val;
    if (label) label.innerText = window.UIRenderer.formatCOP(val);

    const buttons = document.querySelectorAll(".price-btn");
    buttons.forEach(btn => {
      if (btn.innerText.includes(val.toLocaleString("es-CO"))) {
        btn.className = "price-btn text-xs font-bold px-3 py-1 rounded-lg border border-blue-600 bg-[#1d4ed8] text-white shadow-xs transition";
      } else {
        btn.className = "price-btn text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8] hover:border-blue-300 transition";
      }
    });
  },

  handleCreateOrder: function(e) {
    e.preventDefault();
    const techIdVal = document.getElementById("techSelect").value;
    const techId = techIdVal ? parseInt(techIdVal) : null;

    const newOrder = {
      id: "OS-2026-00" + (window.orders.length + 41),
      clientName: document.getElementById("clientName").value,
      clientPhone: document.getElementById("clientPhone").value,
      clientAddress: document.getElementById("clientAddress").value,
      equipType: document.getElementById("equipType").value,
      equipBrand: document.getElementById("equipBrand").value,
      equipSerial: document.getElementById("equipSerial").value || "NO_VISIBLE",
      equipFault: document.getElementById("equipFault").value,
      equipRepair: "Pendiente por revisión técnica",
      cost: parseFloat(document.getElementById("orderCost").value) || 90000,
      status: techId ? "scheduled" : "new",
      techId: techId,
      date: new Date().toISOString().split("T")[0],
      completedDate: null
    };

    if (techId) {
      const t = window.technicians.find(tech => tech.id === techId);
      if (t && t.status === "disponible") t.status = "en_cita";
    }

    window.orders.unshift(newOrder);
    this.closeNewOrderModal();
    document.getElementById("newOrderForm")?.reset();

    window.UIRenderer.showToast(`¡Orden ${newOrder.id} creada y ${techId ? 'agendada' : 'en espera de técnico'}!`, "success");
    this.render();
  },

  openPrintModal: function(orderId) {
    const order = window.orders.find(o => o.id === orderId);
    if (!order) return;

    const tech = window.technicians.find(t => t.id === order.techId);

    document.getElementById("printOrderCode").innerText = order.id;
    document.getElementById("printOrderDate").innerText = order.date;
    document.getElementById("printClientName").innerText = order.clientName;
    document.getElementById("printClientPhone").innerText = order.clientPhone;
    document.getElementById("printClientAddress").innerText = order.clientAddress;
    document.getElementById("printTechName").innerText = tech ? tech.name : "Por Asignar";
    document.getElementById("printOrderStatus").innerText = order.status.toUpperCase();
    document.getElementById("printEquipType").innerText = order.equipType;
    document.getElementById("printEquipBrand").innerText = order.equipBrand;
    document.getElementById("printEquipSerial").innerText = order.equipSerial;
    document.getElementById("printEquipFault").innerText = order.equipFault;
    document.getElementById("printEquipRepair").innerText = order.equipRepair;
    document.getElementById("printOrderCost").innerText = window.UIRenderer.formatCOP(order.cost);
    document.getElementById("printWarrantyDate").innerText = window.WarrantyEngine.calcExpirationDate(order.completedDate || order.date);

    document.getElementById("printOrderModal")?.classList.remove("hidden");
  },

  closePrintModal: function() {
    document.getElementById("printOrderModal")?.classList.add("hidden");
  },

  openAlarmsModal: function() {
    document.getElementById("alarmsModal")?.classList.remove("hidden");
  },

  closeAlarmsModal: function() {
    document.getElementById("alarmsModal")?.classList.add("hidden");
  },

  simulateWhatsApp: function(phone, name) {
    alert(`💬 SIMULACIÓN WHATSAPP THEMO:\n\nEnviando mensaje a ${name} (${phone}):\n\n"Hola, de parte de THEMO ServiSmart confirmamos tu cita técnica y te recordamos que cuentas con 3 meses de garantía oficial en tu servicio."`);
  }
};

// Auto-inicialización cuando carga el documento
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
