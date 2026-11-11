import React, { useState } from 'react';
import Card from './components/Card.jsx';
import CustomInput from './components/CustomInput.jsx';
import CustomButton from './components/CustomButton.jsx';
import SelectorOpcion from './components/SelectorOpcion.jsx';

/**
 * Catálogo de productos disponibles en la Cafetería Tecnológica ACM UD
 */
const CATALOGO_PRODUCTOS = [
  { id: 'prod-1', nombre: 'Café Espresso Doble', icono: '☕', precio: 3500, categoria: 'Bebidas' },
  { id: 'prod-2', nombre: 'Capuchino Vainilla', icono: '🥛', precio: 4800, categoria: 'Bebidas' },
  { id: 'prod-3', nombre: 'Muffin de Arándanos', icono: '🧁', precio: 4000, categoria: 'Pastelería' },
  { id: 'prod-4', nombre: 'Sándwich Artesanal', icono: '🥪', precio: 6500, categoria: 'Comidas' },
  { id: 'prod-5', nombre: 'Té Verde Matcha', icono: '🍵', precio: 4200, categoria: 'Bebidas' }
];

/**
 * ============================================================================
 * COMPONENTE PRINCIPAL (App)
 * ============================================================================
 * 
 * En este componente se orquestan y demuestran los 3 patrones de props exigidos:
 * 
 * 1. PATRÓN DE CALLBACKS:
 *    - La función `manejarSeleccionProducto` se transfiere a cada `<SelectorOpcion />`.
 *    - El componente hijo la invoca para notificar qué producto fue seleccionado,
 *      actualizando el estado del padre (`productoSeleccionado`).
 * 
 * 2. PATRÓN CHILDREN:
 *    - Se utiliza `<Card>` como componente contenedor envolvente.
 *    - Renderiza diferentes contenidos internos (catálogo, formulario, resumen)
 *      sin que la tarjeta deba conocer los detalles de dichos elementos.
 * 
 * 3. PATRÓN SPREAD OPERATOR:
 *    - Se emplean `<CustomInput>` y `<CustomButton>` propagando propiedades
 *      nativas ({...restoProps}) como value, onChange, placeholder, disabled y type.
 */
function App() {
  // Estado local para almacenar el producto seleccionado mediante el patrón Callback
  const [productoSeleccionado, setProductoSeleccionado] = useState(CATALOGO_PRODUCTOS[0]);
  
  // Estado local para los campos del formulario
  const [nombreCliente, setNombreCliente] = useState('');
  const [notasPedido, setNotasPedido] = useState('');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  /**
   * FUNCIÓN CALLBACK:
   * Pasa al hijo <SelectorOpcion /> como prop. El hijo la invoca entregando el producto elegido.
   */
  const manejarSeleccionProducto = (producto) => {
    setProductoSeleccionado(producto);
    setPedidoConfirmado(false); // Reiniciar estado de confirmación al cambiar opción
  };

  /**
   * Manejador de confirmación de pedido
   */
  const manejarConfirmarPedido = (e) => {
    e.preventDefault();
    if (!nombreCliente.trim()) {
      alert('Por favor ingresa tu nombre antes de confirmar.');
      return;
    }
    setPedidoConfirmado(true);
  };

  return (
    <div className="acm-app">
      {/* Encabezado Principal */}
      <header className="acm-header">
        <div className="acm-badge">ACM UD — Frontend ReactJS</div>
        <h1>Tarea 1: Patrones Avanzados de Props</h1>
        <p className="acm-description">
          Demostración práctica de los 3 patrones de arquitectura de props en React:
          <strong> Callbacks</strong> (comunicación ascendente),
          <strong> Children</strong> (composición) y
          <strong> Spread Operator</strong> (propagación de atributos).
        </p>
      </header>

      {/* Cuadrícula Principal de 2 Columnas */}
      <main className="acm-grid">
        {/* ===================================================================
            COLUMNA 1: CATÁLOGO USANDO PATRÓN CHILDREN + CALLBACKS
            =================================================================== */}
        <section className="acm-col">
          {/* PATRÓN CHILDREN: <Card> envuelve la lista interactiva de productos */}
          <Card
            titulo="1. Menú de la Cafetería"
            subtitulo="Haz clic en un producto para probar el patrón de Callbacks (Hijo -> Padre)"
            variante="destacada"
          >
            <div className="acm-selector-list">
              {CATALOGO_PRODUCTOS.map((item) => (
                /* PATRÓN CALLBACK: El hijo recibe la función onSeleccionar y la invoca */
                <SelectorOpcion
                  key={item.id}
                  item={item}
                  estaSeleccionado={productoSeleccionado?.id === item.id}
                  onSeleccionar={manejarSeleccionProducto}
                />
              ))}
            </div>
          </Card>
        </section>

        {/* ===================================================================
            COLUMNA 2: FORMULARIO Y RESUMEN USANDO PATRÓN SPREAD + CHILDREN
            =================================================================== */}
        <section className="acm-col">
          {/* PATRÓN CHILDREN: <Card> envuelve el formulario */}
          <Card
            titulo="2. Datos del Pedido"
            subtitulo="Prueba del patrón Spread Operator con inputs y botones personalizados"
          >
            <form onSubmit={manejarConfirmarPedido} className="acm-form">
              {/* 
                PATRÓN SPREAD OPERATOR: 
                type, placeholder, value, onChange y required se propagan con {...restoProps}
              */}
              <CustomInput
                etiqueta="Nombre del estudiante:"
                type="text"
                placeholder="Ej. Julián Sánchez"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
              />

              <CustomInput
                etiqueta="Instrucciones especiales o notas:"
                type="text"
                placeholder="Ej. Sin azúcar, leche deslactosada"
                value={notasPedido}
                onChange={(e) => setNotasPedido(e.target.value)}
              />

              {/* PATRÓN CHILDREN + SPREAD: Botón estilizado */}
              <CustomButton
                type="submit"
                variante="primario"
                disabled={!nombreCliente.trim()}
              >
                Confirmar Selección ({productoSeleccionado?.nombre})
              </CustomButton>
            </form>
          </Card>

          {/* Resumen del Pedido Activo */}
          <Card
            titulo="3. Resumen y Estado en Vivo"
            subtitulo="Reflejo reactivo de los datos comunicados por el callback"
            variante={pedidoConfirmado ? 'exito' : 'info'}
          >
            <div className="acm-summary">
              <div className="acm-summary-row">
                <span>Producto seleccionado:</span>
                <strong>{productoSeleccionado?.icono} {productoSeleccionado?.nombre}</strong>
              </div>
              <div className="acm-summary-row">
                <span>Precio unitario:</span>
                <strong>${productoSeleccionado?.precio.toLocaleString('es-CO')} COP</strong>
              </div>
              <div className="acm-summary-row">
                <span>Cliente:</span>
                <strong>{nombreCliente || 'Pendiente por ingresar'}</strong>
              </div>
              {notasPedido && (
                <div className="acm-summary-row">
                  <span>Notas:</span>
                  <em>"{notasPedido}"</em>
                </div>
              )}

              {pedidoConfirmado && (
                <div className="acm-alert-success">
                  ✅ ¡Pedido recibido con éxito para {nombreCliente}!
                </div>
              )}
            </div>
          </Card>
        </section>
      </main>

      {/* Pie con Explicación Teórica de los 3 Patrones */}
      <footer className="acm-footer">
        <Card titulo="📚 Glosario de Patrones Implementados">
          <ul className="acm-theory-list">
            <li>
              <strong>Patrón Callback:</strong> En <code>&lt;SelectorOpcion /&gt;</code>, el prop <code>onSeleccionar</code> transporta el item seleccionado desde el botón del hijo hacia la función <code>manejarSeleccionProducto</code> en el padre.
            </li>
            <li>
              <strong>Patrón Children:</strong> En <code>&lt;Card /&gt;</code>, la prop reservada <code>children</code> permite anidar listas, formularios o resúmenes sin que el contenedor conozca la lógica interna de sus hijos.
            </li>
            <li>
              <strong>Patrón Spread:</strong> En <code>&lt;CustomInput /&gt;</code> y <code>&lt;CustomButton /&gt;</code>, <code>&#123;...restoProps&#125;</code> delega atributos nativos de HTML de manera limpia y extensible.
            </li>
          </ul>
        </Card>
      </footer>
    </div>
  );
}

export default App;
