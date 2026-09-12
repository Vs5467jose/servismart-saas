/**
 * THEMO ServiSmart SaaS — Motor Automatizado de Garantías de 3 Meses
 * 
 * Regla de negocio crítica:
 * Al culminar un servicio técnico particular, se activa una garantía legal de 90 días
 * y se programan automáticamente 3 alarmas en fechas exactas:
 * 1. Alarma 1 (+24 horas / Día 1): Control de calidad administrativo.
 * 2. Alarma 2 (+60 días): Checkup preventivo del rendimiento del equipo.
 * 3. Alarma 3 (+85 días): Aviso de expiración y oferta de mantenimiento preventivo.
 */

window.WarrantyEngine = {
  
  /**
   * Calcula la fecha exacta de expiración a 90 días calendario.
   * @param {string} dateStr Fecha de culminación en formato YYYY-MM-DD
   * @returns {string} Fecha formateada para Colombia (DD/MM/AAAA)
   */
  calcExpirationDate: function(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 90);
    return d.toLocaleDateString("es-CO");
  },

  /**
   * Genera las 3 fechas programadas para los disparadores de alarma.
   * @param {string} completedDateStr Fecha de finalización del servicio
   * @returns {object} Objeto con las 3 fechas calculadas
   */
  generateAlarmSchedule: function(completedDateStr) {
    if (!completedDateStr) return null;
    
    // Alarma 1: Día 1 (+24h)
    const d1 = new Date(completedDateStr);
    d1.setDate(d1.getDate() + 1);

    // Alarma 2: Día 60 (+2 meses)
    const d2 = new Date(completedDateStr);
    d2.setDate(d2.getDate() + 60);

    // Alarma 3: Día 85 (+85 días / 5 días antes de expirar)
    const d3 = new Date(completedDateStr);
    d3.setDate(d3.getDate() + 85);

    return {
      qualityControlDate: d1.toLocaleDateString("es-CO"),
      checkupDate: d2.toLocaleDateString("es-CO"),
      renewalNoticeDate: d3.toLocaleDateString("es-CO")
    };
  }
};
