# Finanzas Pro - Registro de Gastos Personal

Una aplicación web móvil para registrar y visualizar gastos personales, construida con Google Apps Script usando Google Sheets como base de datos.

![Plataforma](https://img.shields.io/badge/Plataforma-Google%20Sheets-34A853?logo=googlesheets&logoColor=white)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

🌐 **[Read in English](README.md)**

## Características

- **Registro rápido** de gastos e ingresos desde el móvil
- **Categorías y métodos de pago** personalizables (agregar/eliminar en configuración)
- **Historial** con filtros por fecha, categoría y descripción
- **Editar y eliminar** registros directamente desde el historial
- **Estadísticas** con gráfico de gastos por categoría
- **Modo oscuro/claro** con persistencia
- **Multi-idioma** (Inglés/Español)
- **Sugerencias inteligentes** basadas en descripciones frecuentes
- **Selectores flexibles** - carrusel o desplegable con búsqueda
- **Actualizaciones automáticas** - arquitectura basada en librería
- **100% gratis** - usa tu propia cuenta de Google

---

## Guía de Usuario

### Paso 1: Copiar la Plantilla

1. Abre la plantilla original:
   **[Abrir Plantilla](https://docs.google.com/spreadsheets/d/1KNayGWB7jz5z_GGd9TvdqYkzPfHTZlnCwBebvFPI22w/copy)**

2. Aparecerá un diálogo pidiendo hacer una copia. Haz clic en **"Hacer una copia"**

3. La copia se guardará en tu Google Drive

> **Nota:** El enlace con `/copy` te pedirá automáticamente crear tu propia copia.

### Paso 2: Implementar la Web App

1. En tu copia de la hoja, ve a **Extensiones → Apps Script**

2. En el editor de Apps Script, haz clic en **Implementar → Nueva implementación**

3. Configura la implementación:
   - **Tipo:** Selecciona "Aplicación web"
   - **Descripción:** (opcional) ej: "Mi app de gastos"
   - **Ejecutar como:** "Yo mismo"
   - **Quién tiene acceso:** "Cualquier persona" (para acceder desde el móvil)

4. Haz clic en **Implementar**

5. **Autoriza los permisos:**
   - Haz clic en "Autorizar acceso"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" → "Ir a Finanzas Pro (no seguro)"
   - Haz clic en "Permitir"

6. **¡Copia tu URL!** Esta es la dirección de tu aplicación personal

### Paso 3: Acceder desde el Móvil

1. Copia la URL de tu Web App
2. En tu móvil, pega la URL en el navegador
3. **Recomendado:** Añade a la pantalla de inicio:
   - **iPhone:** Safari → Compartir → "Añadir a pantalla de inicio"
   - **Android:** Chrome → Menú (⋮) → "Añadir a pantalla de inicio"

---

## Estructura de la Hoja de Cálculo

### Hoja "Registros"
Donde se guardan todas las transacciones:

| Columna | Contenido |
|---------|-----------|
| A | Fecha/Hora |
| B | Monto |
| C | Descripción |
| D | Tipo (Compra/Ingreso) |
| E | Categoría |
| F | Método de pago |

### Hoja "Configuracion"
Almacena categorías, métodos de pago y configuración:

| Columna A | Columna B | Columna D | Columna E |
|-----------|-----------|-----------|-----------|
| Categorías | Métodos de pago | Configuración | Valor |
| Comida | Efectivo | lang | es |
| Transporte | Tarjeta débito | theme | light |
| Hogar | Tarjeta crédito | selectorStyle | carousel |
| ... | ... | showSuggestions | true |

> **Nota:** Puedes gestionar categorías y métodos de pago directamente desde el menú de configuración de la app.

---

## Uso de la Aplicación

### Registrar un Gasto/Ingreso
1. Ingresa el monto
2. Selecciona **Gasto** o **Ingreso**
3. Escribe una descripción (o selecciona una sugerencia)
4. Elige categoría y método de pago
5. Toca **Registrar**

### Ver Historial
1. Toca **HISTORIAL** en la barra inferior
2. Ajusta las fechas de inicio y fin
3. Usa los filtros de categoría y descripción para búsquedas refinadas
4. Toca el botón de recargar (↻)

### Editar o Eliminar un Registro
1. En Historial, toca cualquier registro
2. Modifica los campos según necesites
3. Toca **Guardar** para actualizar o **Eliminar** para borrar

### Ver Estadísticas
1. Toca **STATS** en la barra inferior
2. Ajusta el rango de fechas
3. Visualiza el resumen de ingresos/gastos y el gráfico por categoría

### Configuración de la App
Accede a configuración tocando el ícono de engranaje en el encabezado:
- **Idioma:** Cambia entre Inglés y Español
- **Estilo de Selector:** Elige carrusel o desplegable con búsqueda
- **Mostrar Sugerencias:** Activa/desactiva sugerencias de descripción
- **Categorías:** Agrega o elimina categorías de gastos
- **Métodos de Pago:** Agrega o elimina opciones de pago

### Cambiar Modo Oscuro
- Toca el ícono de sol/luna en el encabezado

---

## Solución de Problemas

### "No se cargaron las categorías"
- Verifica que la hoja "Configuracion" exista y tenga datos desde la fila 2

### "Error de conexión con Google Sheets"
- Verifica tu conexión a internet
- Intenta recargar la página

### Los cambios no aparecen en la app
- Limpia la caché del navegador y recarga
- La app se actualiza automáticamente desde GitHub, no necesitas reimplementar para cambios de UI

---

## Para Desarrolladores

### Arquitectura

Este proyecto usa una arquitectura de **Librería + Plantilla**:

```
┌─────────────────────────────────────────────────────────┐
│                   Repositorio GitHub                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Código.js  │  │ index.html  │  │   Template.js   │  │
│  │ (Librería)  │  │ (Frontend)  │  │   (Plantilla)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────┐    ┌─────────────────────────────────┐
│ Librería Apps   │    │   Contenido Raw de GitHub       │
│ Script          │◄───│  (Obtenido en tiempo de ejec.)  │
│ (Publicada)     │    │                                 │
└─────────────────┘    └─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│           Copia de Google Sheets del Usuario            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Template.js │  │  Registros  │  │  Configuracion  │  │
│  │  (Wrapper)  │  │   (Datos)   │  │  (Ajustes)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Beneficios:**
- Los usuarios reciben actualizaciones automáticamente sin reimplementar
- Las actualizaciones de HTML/CSS/JS son instantáneas (obtenidas de GitHub)
- Las actualizaciones del backend solo requieren actualizar versión de librería
- Los datos del usuario permanecen en su propia hoja de cálculo

### Estructura del Proyecto

```
gastos-appscript/
├── Código.js       # Librería backend (publicar como Librería Apps Script)
├── index.html      # Frontend (alojado en GitHub, obtenido en tiempo de ejecución)
├── Template.js     # Wrapper delgado para el proyecto Apps Script del usuario
├── appsscript.json
├── README.md       # Documentación en inglés
└── README.es.md    # Documentación en español
```

### Configurando la Librería

1. **Crear el Proyecto de Librería:**
   - Crea un nuevo proyecto de Apps Script
   - Copia el contenido de `Código.js`
   - Actualiza `HTML_URL` con tu URL raw de GitHub
   - Ve a Configuración del Proyecto → Copia el ID del Script

2. **Publicar como Librería:**
   - Implementar → Nueva implementación → Librería
   - Anota el ID de implementación

3. **Crear la Plantilla:**
   - Crea una Google Sheet con hojas "Registros" y "Configuracion"
   - Ve a Extensiones → Apps Script
   - Agrega Librería: pega tu Script ID, identificador: `FinanzasProLib`
   - Copia el contenido de `Template.js`
   - Implementa como Web App

### Funciones del Backend (Código.js)

| Función | Descripción |
|---------|-------------|
| `doGet()` | Punto de entrada de la Web App |
| `getConfig()` | Obtiene toda la configuración |
| `saveConfig(config)` | Guarda la configuración |
| `addCategory(category)` | Agrega una nueva categoría |
| `removeCategory(category)` | Elimina una categoría |
| `addPaymentMethod(method)` | Agrega un método de pago |
| `removePaymentMethod(method)` | Elimina un método de pago |
| `recordExpense(formData)` | Registra una nueva transacción |
| `updateRecord(id, formData)` | Actualiza un registro existente |
| `deleteRecord(id)` | Elimina un registro |
| `getAppData()` | Obtiene todos los registros |
| `getCategories()` | Obtiene categorías ordenadas por uso |
| `getPaymentMethods()` | Obtiene métodos de pago ordenados por uso |
| `getCommonDescriptions()` | Obtiene las 10 descripciones más usadas |
| `getFilterOptions()` | Obtiene opciones de filtro disponibles |

### Desarrollo Local con clasp

1. **Instalar clasp globalmente:**
```bash
npm install -g @google/clasp
```

2. **Iniciar sesión:**
```bash
clasp login
```

3. **Clonar el proyecto:**
```bash
clasp clone <SCRIPT_ID>
```
> El Script ID está en Apps Script → Configuración del proyecto

4. **Subir cambios:**
```bash
clasp push
```

5. **Abrir en el navegador:**
```bash
clasp open
```

### Contribuir

1. **Fork** este repositorio

2. **Clona** tu fork:
```bash
git clone https://github.com/TU_USUARIO/gastos-appscript.git
cd gastos-appscript
```

3. **Crea una rama** para tu feature:
```bash
git checkout -b feature/nueva-funcionalidad
```

4. **Desarrolla y prueba** tus cambios:
   - Para cambios de HTML/JS: push a GitHub y prueba (auto-obtenido)
   - Para cambios de backend: usa `clasp push` al proyecto de librería
   - Prueba en móvil y escritorio

5. **Commit** con mensajes descriptivos:
```bash
git add .
git commit -m "feat: añadir exportación a CSV"
```

6. **Push** a tu fork:
```bash
git push origin feature/nueva-funcionalidad
```

7. **Abre un Pull Request** describiendo:
   - Qué problema resuelve
   - Cómo probarlo
   - Screenshots si hay cambios visuales

### Estilo de Código

- **Sin comentarios innecesarios** - el código debe ser autoexplicativo
- **Nombres descriptivos** para funciones y variables
- **Funciones pequeñas** con una sola responsabilidad
- **ES6+** - usa `const`, `let`, arrow functions, template literals
- **Consistencia** - sigue el estilo existente del código

---

## Licencia

Licencia MIT - Úsalo, modifícalo y compártelo libremente.

---

## Créditos

Desarrollado con ❤️ usando:
- [Google Apps Script](https://developers.google.com/apps-script)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [Inter Font](https://rsms.me/inter)
