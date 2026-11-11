import React from 'react';

/**
 * ============================================================================
 * PATRÓN SPREAD OPERATOR: {...restoProps}
 * ============================================================================
 * 
 * ¿Qué es y cómo funciona?
 * El operador spread (...) permite capturar todas las propiedades no declaradas
 * explícitamente en la desestructuración de los argumentos y propagarlas en bloque
 * hacia un elemento nativo de HTML o hacia otro componente hijo.
 * 
 * Ventajas arquitectónicas:
 * 1. Flexibilidad total: El componente puede aceptar atributos estándar de HTML
 *    (type, placeholder, value, onChange, disabled, required, min, max, autoFocus)
 *    sin que el desarrollador tenga que escribirlos manualmente uno por uno en la firma.
 * 2. Mantenibilidad: Si la especificación de HTML agrega nuevos atributos o eventos,
 *    este componente los soportará automáticamente.
 * 
 * @param {Object} props
 * @param {string} props.etiqueta - Texto de la etiqueta <label> asociada.
 * @param {string} [props.error] - Mensaje de error para validación visual.
 * @param {Object} props.restoProps - Todas las propiedades HTML nativas propagadas.
 */
function CustomInput({ etiqueta, error, ...restoProps }) {
  return (
    <div className="acm-input-group">
      {etiqueta && <label className="acm-input-label">{etiqueta}</label>}
      
      {/* 
        El operador {...restoProps} aplica aquí dinámicamente:
        type, placeholder, value, onChange, disabled, required, id, etc.
      */}
      <input
        className={`acm-input ${error ? 'acm-input--error' : ''}`}
        {...restoProps}
      />

      {error && <span className="acm-input-error-text">{error}</span>}
    </div>
  );
}

export default CustomInput;
