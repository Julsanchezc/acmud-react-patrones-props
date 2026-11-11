import React from 'react';

/**
 * ============================================================================
 * PATRÓN DE CALLBACKS: COMUNICACIÓN HIJO -> PADRE
 * ============================================================================
 * 
 * ¿Qué es y cómo funciona?
 * En React, el flujo de datos es estrictamente unidireccional (de padres a hijos).
 * Los componentes hijos no pueden mutar directamente el estado de su componente padre.
 * 
 * Para resolver esto, el componente padre le transfiere al hijo una "función callback"
 * a través de una prop (ejemplo: onSeleccionar). Cuando ocurre una acción en el hijo
 * (como un click o una selección), el hijo invoca esa función pasando argumentos.
 * De este modo, la información viaja en sentido ascendente (Hijo -> Padre) de forma
 * segura, predecible y sin romper la inmutabilidad de React.
 * 
 * @param {Object} props
 * @param {Object} props.item - Objeto con datos de la opción (id, nombre, icono, precio, categoria).
 * @param {boolean} props.estaSeleccionado - Indica si este elemento se encuentra activo actualmente.
 * @param {Function} props.onSeleccionar - Función callback suministrada por el componente padre.
 */
function SelectorOpcion({ item, estaSeleccionado, onSeleccionar }) {
  /**
   * Manejador de evento local que ejecuta el callback del padre
   * enviando el objeto completo del elemento seleccionado.
   */
  const manejarClick = () => {
    if (typeof onSeleccionar === 'function') {
      onSeleccionar(item);
    }
  };

  return (
    <div
      className={`acm-selector-item ${estaSeleccionado ? 'acm-selector-item--activo' : ''}`}
      onClick={manejarClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          manejarClick();
        }
      }}
    >
      <div className="acm-selector-item__icon">{item.icono}</div>
      <div className="acm-selector-item__info">
        <h4 className="acm-selector-item__name">{item.nombre}</h4>
        <span className="acm-selector-item__category">{item.categoria}</span>
      </div>
      <div className="acm-selector-item__price">${item.precio.toLocaleString('es-CO')}</div>
    </div>
  );
}

export default SelectorOpcion;
