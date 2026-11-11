# Tarea 1: Patrones Avanzados de Props en ReactJS

> **Curso:** ACM UD WebDev Frontend ReactJS  
> **Rama Estudiantil:** ACM — Universidad Distrital Francisco José de Caldas  
> **Instructor:** Juan Díaz Peña  
> **Estudiante:** Julián Sánchez (`julsanchezc@unal.edu.co`)  
> **Clase de Referencia:** Clase 03 — *Patrones de props en React* ([Ver en YouTube a partir del minuto 53:28](https://www.youtube.com/watch?v=0JcaUVc7ZTQ&t=3208s))

---

## 🎯 Objetivo de la Asignación

Desarrollar una aplicación interactiva en React que implemente de forma simultánea, modular y desacoplada los tres patrones arquitectónicos de manejo de `props` explicados por el profesor Juan Díaz Peña:

1. **Patrón de Callbacks (Comunicación Hijo $\rightarrow$ Padre)**.
2. **Patrón de Composición con `children`**.
3. **Patrón Spread Operator (`{...props}`) para delegación de atributos**.

---

## 🧩 Explicación Técnica de los Patrones Implementados

### 1. Patrón de Callbacks (Comunicación Ascendente)
- **Problema que resuelve**: En React el flujo de datos es estrictamente unidireccional descendente (padre hacia hijo). Un componente hijo nunca debe mutar directamente las propiedades del padre ni sus estados.
- **Implementación en el proyecto**: En [`src/components/SelectorOpcion.jsx`](./src/components/SelectorOpcion.jsx), el componente hijo recibe la función `onSeleccionar` desde `App.jsx`. Al hacer clic en un producto (café, té, postre), el hijo ejecuta `onSeleccionar(item)`, transfiriendo el objeto de datos hacia el componente padre para actualizar el estado reactivo `productoSeleccionado`.

```jsx
// En el Componente Hijo:
<div onClick={() => onSeleccionar(item)}>
  <h4>{item.nombre}</h4>
</div>

// En el Componente Padre:
const manejarSeleccionProducto = (producto) => {
  setProductoSeleccionado(producto);
};

<SelectorOpcion item={item} onSeleccionar={manejarSeleccionProducto} />
```

---

### 2. Patrón de Composición con `children`
- **Problema que resuelve**: Evita crear múltiples componentes rígidos cuando solo varía el contenido interno, permitiendo crear envolturas reutilizables (tarjetas, modales, paneles).
- **Implementación en el proyecto**: En [`src/components/Card.jsx`](./src/components/Card.jsx), la tarjeta no define qué elementos van en su cuerpo; en su lugar, reserva el espacio con `{children}`. Esto permite usar `<Card>` para envolver la lista de productos, el formulario de pedido y el panel de resumen sin duplicar código de diseño.

```jsx
// Componente Envoltorio:
function Card({ titulo, children }) {
  return (
    <article className="acm-card">
      <header><h3>{titulo}</h3></header>
      <div className="acm-card__body">{children}</div>
    </article>
  );
}

// Uso en la Vista:
<Card titulo="Catálogo">
  <ListaDeProductos />
</Card>
```

---

### 3. Patrón Spread Operator (`{...props}`)
- **Problema que resuelve**: Evita tener que declarar y sincronizar manualmente en las funciones de componentes cada uno de los atributos nativos de HTML (`placeholder`, `type`, `value`, `onChange`, `disabled`, `required`, `autoFocus`, etc.).
- **Implementación en el proyecto**: En [`src/components/CustomInput.jsx`](./src/components/CustomInput.jsx) y [`src/components/CustomButton.jsx`](./src/components/CustomButton.jsx), se desestructuran las propiedades específicas de diseño (`etiqueta`, `error`, `variante`) y el resto se captura con `...restoProps`, propagándose masivamente sobre el `<input {...restoProps} />` o `<button {...restoProps} />`.

```jsx
function CustomInput({ etiqueta, error, ...restoProps }) {
  return (
    <div className="input-group">
      <label>{etiqueta}</label>
      <input className="input-field" {...restoProps} />
    </div>
  );
}
```

---

## 📂 Arquitectura de Archivos del Proyecto

```text
acmud-react-patrones-props/
├── README.md                      # Documentación completa y guía de entrega
├── index.html                     # Entrada HTML de la SPA
├── package.json                   # Dependencias (React 18 + Vite)
├── vite.config.js                 # Configuración de compilación Vite
└── src/
    ├── main.jsx                   # Montaje en el Virtual DOM
    ├── App.jsx                    # Orquestador principal de los 3 patrones
    ├── index.css                  # Sistema de diseño, tokens y maquetación responsiva
    └── components/
        ├── Card.jsx               # Patrón children (Envoltorio modular)
        ├── SelectorOpcion.jsx     # Patrón callback (Comunicación hijo -> padre)
        ├── CustomInput.jsx        # Patrón spread {...props} en inputs
        └── CustomButton.jsx       # Patrón combinado spread + children en botones
```

---

## 🛠️ Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js versión 18+ o superior.
- Gestor de paquetes `npm`.

### Comandos de Ejecución Local
```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd acmud-react-patrones-props

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev

# 4. Compilar para producción (validación de build)
npm run build
```

---

## 📜 Historial de Commits Atómicos (Convención Git)

Este proyecto fue construido siguiendo la directriz estricta de **commits atómicos y significativos**:

1. `chore: inicializar proyecto React con Vite y configuracion base`
2. `feat(components): implementar componente contenedor Card usando patron children`
3. `feat(components): implementar CustomInput y CustomButton usando patron spread`
4. `feat(components): implementar SelectorOpcion con patron de funciones callback`
5. `feat(app): integrar patrones en vista interactiva con estado reactivo`
6. `style: agregar diseno responsivo moderno y tokens visuales`
7. `docs: documentar patrones de props, arquitectura y guia de ejecucion en README`
