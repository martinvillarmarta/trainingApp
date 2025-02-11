# === Proyecto Training App === #
```bash
# PRE-REQUISITOS
- Instalar Node.js
- Instalar MySQL
- Instalar yarn
# 1.- Clonar el repositorio
git clone https://github.com/martinvillarmarta/trainingApp.git
# 2.- Acceder al proyecto
cd [ruta]/trainingApp
# 3.- Configurar la conexión a la base de datos y editar el siguiente archivo de configuración con un editor de texto:
# Nota: No modificar parámetro 'DB' y 'dialect'
[ruta]/trainingApp/backend/config/db.config.js
# 4.- Ejecutar el script TrainingScript.sql en el entorno de conexión especificado anteriormente
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
