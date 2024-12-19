
# Proyecto: App de Asistentes

Este proyecto es una aplicación que permite visualizar eventos, inscribirse y desinscribirse de ellos, y generar códigos QR con la información del usuario logueado actualmente.

## Estado del Proyecto

1. **Renderización:**
   - Actualmente, el proyecto no funciona correctamente con Render.
   - Se recomienda iniciar el servidor JSON local utilizando el archivo `almacen.json` ubicado en la carpeta `data` dentro del repositorio.

2. **Estado del Render:**
   - El entorno de Render quedó configurado funcionalmente, cargando correctamente los datos desde el repositorio clonado.
   - **Ruta de la API en Render:** [https://apitestdata-usuarios.onrender.com](https://apitestdata-usuarios.onrender.com).

3. **Características de la Aplicación:**
   - Permite **visualizar eventos** disponibles.
   - Los usuarios pueden **inscribirse** y **desinscribirse** en eventos.
   - Genera un **código QR** con la información del usuario logueado actualmente.

## Pasos para Iniciar la Aplicación

Sigue estos pasos para ejecutar correctamente el proyecto en tu entorno local:

1. **Instalar dependencias necesarias:**
   Ejecuta el siguiente comando en la terminal para instalar la biblioteca requerida para generar QR:
   ```bash
   npm install angularx-qrcode@18.0.2 --save
   ```

2. **Iniciar el servidor JSON local:**
   - Navega a la ruta donde está el archivo `almacen.json` dentro del repositorio. Por ejemplo:
     ```bash
     cd C:\Users\"usuario"\MyApp\Data
     ```
   - Inicia el servidor JSON con el siguiente comando:
     ```bash
     json-server --watch almacen.json --host 0.0.0.0 --port 3000
     ```

3. **Iniciar el servidor de Ionic:**
   - Regresa a la carpeta principal del proyecto y ejecuta:
     ```bash
     ionic serve
     ```

---

### **Uso de la API en Render**

Si deseas usar la API alojada en Render en lugar del servidor JSON local, sigue estos pasos:

1. **Verifica que la API esté funcionando:**
   - Puedes acceder a la API desde el navegador o con herramientas como Postman en la siguiente URL:
     [https://apitestdata-usuarios.onrender.com](https://apitestdata-usuarios.onrender.com).

2. **Actualizar la configuración de la aplicación:**
   - Cambia la URL base de la API en el archivo de configuración de tu proyecto (por ejemplo, `environment.ts` o similar):
     ```javascript
     apiUrl: 'https://apitestdata-usuarios.onrender.com'
     ```

3. **Ejecuta la aplicación con `ionic serve`:**
   - La app debería conectarse automáticamente a la API en Render.

---

### **Notas Importantes:**

- Asegúrate de tener instalado [Node.js](https://nodejs.org) en tu sistema.
- Si encuentras problemas al iniciar el servidor JSON o Ionic, verifica que las dependencias estén correctamente instaladas ejecutando `npm install` en la raíz del proyecto.
- Para usar Render de manera óptima, asegúrate de que la API esté en línea y cargue correctamente los datos.

--- 

### **Uso de Apk**

- La aplicacion ya quedo funcional simplemente se carga al android studio o puede descargar e instalar desde su dispositivo movil
- usuario de ejemplo: luciano
- contraseña: duoc1234
- usuario1@mail.cl usar este correo para la recuperacion de contraseña
- saldra la info en pantalla para recuperar
