import React from 'react';

/**
 * ============================================================================
 * PATRÓN DE COMPOSICIÓN: children (Propiedad Especial de React)
 * ============================================================================
 * 
 * ¿Qué es y cómo funciona?
 * En React, la prop 'children' es una propiedad reservada que contiene cualquier
 * elemento, texto o componente que se coloque entre las etiquetas de apertura y
 * cierre de este componente (<Card>...contenido aquí...</Card>).
 * 
 * Ventajas arquitectónicas:
 * 1. Desacoplamiento total: Card no necesita conocer la estructura interna del
 *    contenido que va a envolver (pueden ser formularios, botones, imágenes o texto).
 * 2. Reutilización: Sirve como plantilla visual consistente (bordes, fondos, sombras)
 *    para múltiples vistas de la aplicación.
 * 
 * @param {Object} props
 * @param {string} props.titulo - Encabezado visible de la tarjeta.
 * @param {string} [props.subtitulo] - Descripción secundaria opcional.
 * @param {string} [props.variante='default'] - Variante de estilo ('default', 'destacada', 'info').
 * @param {React.ReactNode} props.children - Elementos hijos inyectados dinámicamente.
 */
function Card({ titulo, subtitulo, variante = 'default', children }) {
  return (
    <article className={`acm-card acm-card--${variante}`}>
      <header className="acm-card__header">
        <h3 className="acm-card__title">{titulo}</h3>
        {subtitulo && <p className="acm-card__subtitle">{subtitulo}</p>}
      </header>
      
      {/* 
        Aquí se renderiza el contenido inyectado a través del patrón children.
        Cualquier elemento colocado dentro de <Card>...</Card> se posicionará aquí.
      */}
      <div className="acm-card__body">
        {children}
      </div>
    </article>
  );
}

export default Card;
