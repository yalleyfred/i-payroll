
# iPayroll

## Overview:
  iPayroll is a Monolithic application for processing and managing an organization's payroll. The system is built purposely for use by in-house account administrators to carry-out payroll management tasks through the following:

### Features:
  * Manage Tax Deductions
  * Manage Employee Details, Salaries and Allowances
  * Send Automatic Email with PaySlip to Staff
  * Generate Excel Report
  * Manage Fillings for SNNIT, GRA, TIER 1 & TIER 1

### Viewports
  * Min-width: 1024px

### Screenshots
![Login](https://github.com/AmaliTech-Training-Academy/ipayroll-fyalley/blob/main/client/UI%20Design/loginLogin.png)

![Dashboard](https://github.com/AmaliTech-Training-Academy/ipayroll-fyalley/blob/main/client/UI%20Design/Home.png)

![Employee Details](https://github.com/AmaliTech-Training-Academy/ipayroll-fyalley/blob/main/client/UI%20Design/Employees_newipayroll-employees.png)

## CodeBase

  ### Folder Structure
  
  ### Technologies
    #### Front-end:
      1. HTML/SCSS/CSS/FIGMA
      2. JavaScript/React js 
      3. Typescript
  
    #### Back-end:
      4. Node/Express
      5. Postgres Database
  
    #### Source Control & Deployment
      6. Github & Herokup App
  
  ### Dependencies
      - react, react-dom, react-router-dom, react-bootstrap, react-chartjs
      - webpack
      - node
      - Axios
      - bootstrap
      - charts.js
      - moment
      - jquery
      - toastify 
      - bcrypt
      - body-parser
      - cors
      - jsonwebtoken
      - nodemailer
      - pg
      - sequelize
      - xlsx
      - nodemon
      - node
      - mpn
 
 ## How To Install 
 1. Clones the repository to your local machine use: `git clone https://github.com/AmaliTech-Training-Academy/ipayroll-fyalley.git`
 2. Open codebase in your preferred code editor (VS Code recommended)
 3. Start the backend server use the command `npm run dev` ** NOTE **: make sure you are starting the server in the directory `** ipayroll-fyalley **`
 4. To start front-end server, change directory to `client` use the command `cd client`
 5. Use `npm start` to initiate front-end server
  
 ## Architecture
 
[![](https://mermaid.ink/img/pako:eNolzLEKwjAQgOFXCTcptINrEBc7dtLRcziTaxtILpJeECl9dwNu3_Dzb-CyZ7AwxfxxCxU14w0F5RoDi5pz31_MmOfg_gz-9DgMpPSilY9PFOggcUkUfJtsKMYg6MKJEWyj54lqVASUvaVUNd-_4sBqqdxBfXtSHgLNhRLYieLK-w8NTTFd)](https://mermaid.live/edit#pako:eNolzLEKwjAQgOFXCTcptINrEBc7dtLRcziTaxtILpJeECl9dwNu3_Dzb-CyZ7AwxfxxCxU14w0F5RoDi5pz31_MmOfg_gz-9DgMpPSilY9PFOggcUkUfJtsKMYg6MKJEWyj54lqVASUvaVUNd-_4sBqqdxBfXtSHgLNhRLYieLK-w8NTTFd)
 
  - The iPayroll application is a tier 1 systems which consists of a single user interface that is the source of input and user interactions
  - User's queries and inputs are captured and validated by the front-end technology (React js) and sent to the backend
  - The backend consists of a database(postgres) for storing all user inputs and results of users' inputs, 
  - The backend also consists of scripts(nodejs/expres js) for performing validations, routing, calculations and insertion of new entries into database collectively known as the "Application Logic or Logic"
  - Results of requests processed by the backend is then fetched and displayed to the users, using visualization tools such tables, charts and cards by the front-end technology.

[![](https://mermaid.ink/img/pako:eNptkMFuwjAMhl8l8olJ8AI9IG3rkQMCbssOJnHbiNapEkfThHj3pYtgHZDTn__7ndg-g_GWoIKm91-mwyDqUGtW-bwaQzGq1WqttsFP2nFb0Ma3jp-SvWs5jU_R3_0X1yh4xEiaC47p2AYcO_WG5kRsi3tNfSyu6uVTFXTL3NVPzZni_f92VnZX8t47YnmYYDbnbBk7iiTx9hgsYaAwoLN5i-fJ1iAdDaShytJSg6kXDZovOYpJ_P6bDVQSEi0hjRaFaoe5kQGqBvtIlx8oR4GP)](https://mermaid.live/edit#pako:eNptkMFuwjAMhl8l8olJ8AI9IG3rkQMCbssOJnHbiNapEkfThHj3pYtgHZDTn__7ndg-g_GWoIKm91-mwyDqUGtW-bwaQzGq1WqttsFP2nFb0Ma3jp-SvWs5jU_R3_0X1yh4xEiaC47p2AYcO_WG5kRsi3tNfSyu6uVTFXTL3NVPzZni_f92VnZX8t47YnmYYDbnbBk7iiTx9hgsYaAwoLN5i-fJ1iAdDaShytJSg6kXDZovOYpJ_P6bDVQSEi0hjRaFaoe5kQGqBvtIlx8oR4GP)
 
 
 
 ## Deployment
 
 ##  Team
  1. Front-end: [Enoch Boison](https://github.com/devBoison)
  2. Backend: [Fredrick Yalley](https://github.com/fredrick-yalley)

