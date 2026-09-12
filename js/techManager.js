/**
 * THEMO ServiSmart SaaS — Gestor de Técnicos y Asignación de Despacho
 * 
 * Regla de negocio:
 * Filtra en tiempo real a los técnicos disponibles (🟢) e impide que la secretaria
 * asigne citas cruzadas a técnicos que ya se encuentran en cita (🔵) o no disponibles (🔴).
 */

window.TechManager = {

  /**
   * Obtiene la lista de técnicos libres para asignación inmediata.
   */
  getAvailableTechnicians: function() {
    return window.technicians.filter(t => t.status === "disponible");
  },

  /**
   * Alterna el estado operativo de un técnico.
   */
  toggleStatus: function(techId) {
    const tech = window.technicians.find(t => t.id === techId);
    if (!tech) return null;

    if (tech.status === "disponible") {
      tech.status = "en_cita";
    } else if (tech.status === "en_cita") {
      tech.status = "no_disponible";
    } else {
      tech.status = "disponible";
    }

    return tech;
  },

  /**
   * Asigna el primer técnico disponible a una orden entrante.
   */
  autoAssignFreeTech: function(order) {
    const freeTech = this.getAvailableTechnicians()[0];
    if (freeTech) {
      order.techId = freeTech.id;
      freeTech.status = "en_cita";
      return freeTech;
    }
    return null;
  },

  /**
   * Libera al técnico asignado cuando la orden se completa.
   */
  releaseTech: function(techId) {
    const tech = window.technicians.find(t => t.id === techId);
    if (tech) {
      tech.status = "disponible";
    }
  }
};
