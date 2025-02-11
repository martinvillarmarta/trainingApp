# === Proyecto Training App === #
```bash
# 1.- Clonar el repositorio
git clone https://github.com/martinvillarmarta/trainingApp.git
# 2.- Acceder al proyecto
cd [ruta]/trainingApp
# 3.- Configurar la conexión a la base de datos. Editar el siguiente archivo de configuración:
vi [ruta]/trainingApp/backend/config/db.config.js
# 4.- Ejecutar el script TrainingScript.sql.
# Ejecutar el script de la base de datos en el entorno de conexión especificado anteriormente
# 5.- Arrancar el frontend
cd frontend
yarn install   # Instalar dependencias
yarn run dev   # Iniciar el frontend
# 6.- Arrancar el backend
cd backend
npm install    # Instalar dependencias
npm start      # Iniciar el backend
# 7.- Visualizar el login
http://localhost:5173
