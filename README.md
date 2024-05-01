VERSIÓN DE MYSQL: 8.0.30
VERSIÓN DE NODE: 20.12.2

Proyecto de Web Scraping
Este es un proyecto de web scraping desarrollado en Node.js para extraer información de sitios web y almacenarla en una base de datos MySQL.

Requisitos previos
Antes de comenzar, asegúrate de tener instalado Node.js en tu sistema. Si no lo tienes instalado, sigue las instrucciones según tu sistema operativo:

Windows
Para instalar Node.js en Windows, sigue estos pasos:

Ve al sitio web oficial de Node.js en nodejs.org.
Descarga el instalador para Windows.
Ejecuta el instalador y sigue las instrucciones en pantalla para completar la instalación.

MacOS
Para instalar Node.js en MacOS, puedes utilizar Homebrew. Abre una terminal y ejecuta el siguiente comando:

brew install node

Linux
La forma más común de instalar Node.js en Linux es mediante el uso de un gestor de paquetes. Por ejemplo, en Ubuntu puedes usar apt. Abre una terminal y ejecuta los siguientes comandos:

sudo apt update
sudo apt install nodejs npm




Instalación
Una vez que tengas Node.js instalado, asegúrate de estar dentro del directorio del proyecto y sigue estos pasos:

Abre una terminal en el directorio del proyecto.
Ejecuta el siguiente comando para instalar los módulos necesarios:
npm install

Configuración del archivo .env
Antes de ejecutar la aplicación, asegúrate de configurar el archivo .env  esté configurado con la información necesaria. Crea un archivo llamado .env en el directorio raíz del proyecto y añade las siguientes variables:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=web-scraping




Gestor de base de datos
Para este proyecto, necesitarás un gestor de base de datos MySQL, como XAMPP o Laragon. Sigue estos pasos para instalar XAMPP:

Descarga XAMPP desde apachefriends.org.
Ejecuta el instalador y sigue las instrucciones en pantalla.
Una vez instalado, abre XAMPP y arranca el servidor Apache y MySQL.
Abre tu navegador web y visita http://localhost/phpmyadmin.
Crea una nueva base de datos llamada web-scraping.




Ejecución de la aplicación
Una vez que hayas configurado todo, puedes ejecutar la aplicación. Para ello, abre una terminal en el directorio del proyecto y ejecuta el siguiente comando:

node app.js

Esto iniciará el proceso de web scraping. Puedes verificar los registros en la base de datos accediendo a tu gestor de base de datos y consultando la tabla contact_info.

¡Y eso es todo! Ahora puedes empezar a utilizar la aplicación para realizar web scraping y almacenar los datos en tu base de datos.




Ejemplos de uso
A continuación se muestran algunos ejemplos de cómo la aplicación maneja los datos y errores posibles:

Manejo de datos
La aplicación extrae información de las páginas web proporcionadas en el array webSites. Por cada sitio web, se busca y extrae el número de teléfono y la dirección de correo electrónico, si están disponibles. Estos datos se almacenan en la base de datos en la tabla contact_info. Aquí hay un ejemplo de cómo se manejan los datos:

        await insertData(connection, url, phoneNumber, email);

        console.log(`${phoneNumberData.message} and ${emailData.message} at ${url}: phone: ${phoneNumberData.phoneNumber} email: ${emailData.email}`);

Manejo de errores
La aplicación maneja diferentes tipos de errores, como errores de conexión a la base de datos, errores al extraer información de las páginas web, etc. Aquí hay un ejemplo de cómo se manejan los errores:

        try {            
            await page.goto(webSite);
    
            const url = webSite;
    
            const phoneNumberData = await extractPhoneNumber(page);
            
            const emailData = await extractEmail(page);
    
            let phoneNumber = phoneNumberData.phoneNumber ? phoneNumberData.phoneNumber : null;

            let email = emailData.email ? emailData.email : null;

            await insertData(connection, url, phoneNumber, email);

            console.log(`${phoneNumberData.message} and ${emailData.message} at ${url}: phone: ${phoneNumberData.phoneNumber} email: ${emailData.email}`);

            console.log(`/********** process finished **********/`);

        } catch (error) {
            console.error(`Error to load ${webSite}: ${error}`);
            console.log(`/********** process finished **********/`);
            continue;
        }
