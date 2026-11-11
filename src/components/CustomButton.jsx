import React from 'react';

/**
 * ============================================================================
 * PATRÓN COMBINADO: SPREAD {...restoProps} + CHILDREN
 * ============================================================================
 * 
 * Componente botón encapsulado que combina la propagación de eventos y estados
 * nativos (onClick, type, disabled) con el contenido flexible de children (texto, iconos).
 * 
 * @param {Object} props
 * @param {'primario' | 'secundario' | 'peligro' | 'exito'} [props.variante='primario'] - Estilo visual.
 * @param {React.ReactNode} props.children - Texto o icono interno del botón.
 * @param {Object} props.restoProps - Atributos HTML propagados (disabled, onClick, etc.).
 */
function CustomButton({ variante = 'primario', children, className = '', ...restoProps }) {
  return (
    <button
      className={`acm-btn acm-btn--${variante} ${className}`}
      {...restoProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
