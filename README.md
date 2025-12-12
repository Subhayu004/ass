# TinyLink — Lightning-Fast URL Shortener 🚀  
A beautifully simple, serverless URL shortener built on **AWS Lambda**, **API Gateway**, and **DynamoDB**, designed for speed, scalability, and effortless redirection.

> *"Minimal on the surface. Powerful underneath."*  
> — TinyLink Engineering

---

## 🌐 Live Demo  
👉 **Website:** *www.tinylink.sbs*  
  

---

## 🎥 Demo Video
> **Watch how TinyLink works end-to-end**

<video src="assets/demo.mp4" width="600" controls></video>


---

## 🖼 Screenshots
### **Home Page**
![Homepage Screenshot](assets/homepage.png)  
*Add screenshot at: `assets/homepage.jpg`*

### **Short Link Generated**
![Short Link Screenshot](assets/shortlink.png)  
*Add screenshot at: `assets/shortlink.jpg`*

### **Redirect Flow**
![Redirect Screenshot](assets/redirect.png)  
*Add screenshot at: `assets/redirect.jpg`*

---

## ✨ Features

- 🔗 **Instant Short Link Generation**  
- ⚡ **Serverless Architecture (Auto-scaling)**  
- 📁 **Persistent Storage using DynamoDB**  
- 🔄 **302 Redirection for SEO-friendly behavior**  
- 🔐 **CORS-secured frontend integration**  
- 🌍 **Global delivery through CloudFront CDN**  
- 🧩 **Simple REST API with clean endpoints**  
- 🛠 **Zero server maintenance**

---

## 🧠 System Architecture

---



| Layer | Technology |
|-------|------------|
| Compute | AWS Lambda |
| Routing | API Gateway (REST API) |
| Storage | DynamoDB |
| CDN | CloudFront (frontend distribution) |
| Frontend | HTML, CSS, JavaScript |
| Logging | CloudWatch |
| Deployment | Render / Netlify / Custom Domain |

---

## 🚀 How It Works

### **1. Short Link Creation**
1. User enters a long URL on the site  
2. Frontend JS sends POST → `/prod/shorten`  
3. Browser performs CORS check  
4. API Gateway passes full request to Lambda via **proxy integration**  
5. Lambda generates a short code and stores it in DynamoDB  
6. Returns:  
   ```json
   {
     "shortUrl": "https://tinylink.sbs/abc123"
   }

## 📁 Folder Structure
/frontend
   ├── index.html
   ├── app.js
   ├── style.css
   └── 404.html   (captures /{code} and forwards to API)

lambda/
   ├── shortenHandler.py
   └── redirectHandler.py

infrastructure/
   ├── api-gateway-config.json
   └── dynamodb-schema.json

README.md


# TinyLink — Lightning-Fast URL Shortener 🚀  
A beautifully simple, serverless URL shortener built on **AWS Lambda**, **API Gateway**, and **DynamoDB**, designed for speed, scalability, and effortless redirection.

> *"Minimal on the surface. Powerful underneath."*  
> — TinyLink Engineering

---

## 🌐 Live Demo  
👉 **Website:** *www.tinylink.sbs*  
  

---

## 🎥 Demo Video
> **Watch how TinyLink works end-to-end**

<video src="assets/demo.mp4" width="600" controls></video>


---

## 🖼 Screenshots
### **Home Page**
![Homepage Screenshot](assets/homepage.png)  
*Add screenshot at: `assets/homepage.jpg`*

### **Short Link Generated**
![Short Link Screenshot](assets/shortlink.png)  
*Add screenshot at: `assets/shortlink.jpg`*

### **Redirect Flow**
![Redirect Screenshot](assets/redirect.png)  
*Add screenshot at: `assets/redirect.jpg`*

---

## ✨ Features

- 🔗 **Instant Short Link Generation**  
- ⚡ **Serverless Architecture (Auto-scaling)**  
- 📁 **Persistent Storage using DynamoDB**  
- 🔄 **302 Redirection for SEO-friendly behavior**  
- 🔐 **CORS-secured frontend integration**  
- 🌍 **Global delivery through CloudFront CDN**  
- 🧩 **Simple REST API with clean endpoints**  
- 🛠 **Zero server maintenance**

---

## 🧠 System Architecture

---



| Layer | Technology |
|-------|------------|
| Compute | AWS Lambda |
| Routing | API Gateway (REST API) |
| Storage | DynamoDB |
| CDN | CloudFront (frontend distribution) |
| Frontend | HTML, CSS, JavaScript |
| Logging | CloudWatch |
| Deployment | Render / Netlify / Custom Domain |

---

## 🚀 How It Works

### **1. Short Link Creation**
1. User enters a long URL on the site  
2. Frontend JS sends POST → `/prod/shorten`  
3. Browser performs CORS check  
4. API Gateway passes full request to Lambda via **proxy integration**  
5. Lambda generates a short code and stores it in DynamoDB  
6. Returns:  
   ```json
   {
     "shortUrl": "https://tinylink.sbs/abc123"
   }

## 📁 Folder Structure
/frontend
   ├── index.html
   ├── app.js
   ├── style.css
   └── 404.html   (captures /{code} and forwards to API)

lambda/
   ├── shortenHandler.py
   └── redirectHandler.py

infrastructure/
   ├── api-gateway-config.json
   └── dynamodb-schema.json

README.md


# TinyLink — Lightning-Fast URL Shortener 🚀  
A beautifully simple, serverless URL shortener built on **AWS Lambda**, **API Gateway**, and **DynamoDB**, designed for speed, scalability, and effortless redirection.

> *"Minimal on the surface. Powerful underneath."*  
> — TinyLink Engineering

---

## 🌐 Live Demo  
👉 **Website:** *www.tinylink.sbs*  
  

---

## 🎥 Demo Video
> **Watch how TinyLink works end-to-end**

<video src="assets/demo.mp4" width="600" controls></video>


---

## 🖼 Screenshots
### **Home Page**
![Homepage Screenshot](assests/homepage.png)  
*Add screenshot at: `assets/homepage.jpg`*

### **Short Link Generated**
![Short Link Screenshot](assests/shortlink.png)  
*Add screenshot at: `assets/shortlink.jpg`*

### **Redirect Flow**
![Redirect Screenshot](assests/redirect.png)  
*Add screenshot at: `assets/redirect.jpg`*

---

## ✨ Features

- 🔗 **Instant Short Link Generation**  
- ⚡ **Serverless Architecture (Auto-scaling)**  
- 📁 **Persistent Storage using DynamoDB**  
- 🔄 **302 Redirection for SEO-friendly behavior**  
- 🔐 **CORS-secured frontend integration**  
- 🌍 **Global delivery through CloudFront CDN**  
- 🧩 **Simple REST API with clean endpoints**  
- 🛠 **Zero server maintenance**

---

## 🧠 System Architecture

---



| Layer | Technology |
|-------|------------|
| Compute | AWS Lambda |
| Routing | API Gateway (REST API) |
| Storage | DynamoDB |
| CDN | CloudFront (frontend distribution) |
| Frontend | HTML, CSS, JavaScript |
| Logging | CloudWatch |
| Deployment | Render / Netlify / Custom Domain |

---

## 🚀 How It Works

### **1. Short Link Creation**
1. User enters a long URL on the site  
2. Frontend JS sends POST → `/prod/shorten`  
3. Browser performs CORS check  
4. API Gateway passes full request to Lambda via **proxy integration**  
5. Lambda generates a short code and stores it in DynamoDB  
6. Returns:  
   ```json
   {
     "shortUrl": "https://tinylink.sbs/abc123"
   }

## 📁 Folder Structure
/frontend
   ├── index.html
   ├── app.js
   ├── style.css
   └── 404.html   (captures /{code} and forwards to API)

lambda/
   ├── shortenHandler.py
   └── redirectHandler.py

infrastructure/
   ├── api-gateway-config.json
   └── dynamodb-schema.json

README.md


# TinyLink — Lightning-Fast URL Shortener 🚀  
A beautifully simple, serverless URL shortener built on **AWS Lambda**, **API Gateway**, and **DynamoDB**, designed for speed, scalability, and effortless redirection.

> *"Minimal on the surface. Powerful underneath."*  
> — TinyLink Engineering

---

## 🌐 Live Demo  
👉 **Website:** *www.tinylink.sbs*  
  

---

## 🎥 Demo Video
> **Watch how TinyLink works end-to-end**

<video src="assests/demo.mp4" width="600" controls></video>


---

## 🖼 Screenshots
### **Home Page**
![Homepage Screenshot](assets/homepage.png)  
*Add screenshot at: `assets/homepage.jpg`*

### **Short Link Generated**
![Short Link Screenshot](assets/shortlink.png)  
*Add screenshot at: `assets/shortlink.jpg`*

### **Redirect Flow**
![Redirect Screenshot](assets/redirect.png)  
*Add screenshot at: `assets/redirect.jpg`*

---

## ✨ Features

- 🔗 **Instant Short Link Generation**  
- ⚡ **Serverless Architecture (Auto-scaling)**  
- 📁 **Persistent Storage using DynamoDB**  
- 🔄 **302 Redirection for SEO-friendly behavior**  
- 🔐 **CORS-secured frontend integration**  
- 🌍 **Global delivery through CloudFront CDN**  
- 🧩 **Simple REST API with clean endpoints**  
- 🛠 **Zero server maintenance**

---

## 🧠 System Architecture

---



| Layer | Technology |
|-------|------------|
| Compute | AWS Lambda |
| Routing | API Gateway (REST API) |
| Storage | DynamoDB |
| CDN | CloudFront (frontend distribution) |
| Frontend | HTML, CSS, JavaScript |
| Logging | CloudWatch |
| Deployment | Render / Netlify / Custom Domain |

---

## 🚀 How It Works

### **1. Short Link Creation**
1. User enters a long URL on the site  
2. Frontend JS sends POST → `/prod/shorten`  
3. Browser performs CORS check  
4. API Gateway passes full request to Lambda via **proxy integration**  
5. Lambda generates a short code and stores it in DynamoDB  
6. Returns:  
   ```json
   {
     "shortUrl": "https://tinylink.sbs/abc123"
   }

## 📁 Folder Structure
/frontend
   ├── index.html
   ├── app.js
   ├── style.css
   └── 404.html   (captures /{code} and forwards to API)

lambda/
   ├── shortenHandler.py
   └── redirectHandler.py

infrastructure/
   ├── api-gateway-config.json
   └── dynamodb-schema.json

README.md


## 🔗 Contributor of This Project
**Sreyasi Das**

[![portfolio](https://img.shields.io/badge/Sreyasi_Das_Github-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Sreyasi27/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sreyasi-das-641851365/)

