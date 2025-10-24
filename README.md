# Contact Management App

A modern, full-stack contact management application built with **React**, **Node.js**, **Express**, and **MongoDB**. It allows you to **add, view, search, and delete contacts** with a clean, responsive UI powered by **shadcn/ui** and **Tailwind CSS**.

---

##  Notable Features

* **Add Contacts**: Create new contacts with name and phone number.
* **View Contacts**: Display all contacts in an organized, alphabetically sorted list.
* **Search Functionality**: Real-time search by name or phone number.
* **Delete Contacts**: Remove contacts with confirmation dialog.
* **Expandable Details**: Click on contacts to view/hide phone numbers.
* **Duplicate Prevention**: Client and server-side validation to prevent duplicate entries.
* **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.
* **Dark Mode Support**: Automatic dark mode compatibility as per your website theme prefence.
* **Toast Notifications**: User-friendly success and error messages.
* **Modern UI**: Built with shadcn/ui components and Tailwind CSS for a clean look.

---

## Tech Stack & Libraries

### Frontend

* **React (v18+)** – UI library for building interactive interfaces.
* **Vite** – Fast build tool and dev server.
* **Tailwind CSS** – Utility-first styling for rapid UI design.
* **shadcn/ui** – Prebuilt, accessible UI components.
* **Radix UI** – Accessible primitives for complex UI patterns.
* **Lucide React** – Modern icon library.
* **Axios** – HTTP client for API calls.
* **Sonner** – Toast notifications for feedback.

### Backend

* **Node.js (v16+)** – JavaScript runtime for server-side logic.
* **Express.js** – Lightweight web framework.
* **MongoDB** – NoSQL database for storing contacts.
* **Mongoose** – MongoDB ODM for schema management.
* **CORS** – Cross-origin requests support.

> **Design Choice:** I chose shadcn/ui with Tailwind CSS for a modern, responsive UI without writing custom CSS for every component. Axios is used for simplified API requests, and Sonner gives clean toast notifications.

---

##  Prerequisites

* Node.js v16+ and npm/yarn
* MongoDB (local installation or Atlas)
* Git

---

##  Setup Instructions (Local)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/contact-management-app.git
cd contact-management-app
```

### 2. Install Dependencies

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

```bash
cd ../backend
npm install
```

### 3. Install shadcn/ui Components

```bash
cd ../frontend
npx shadcn@latest add button input dialog dropdown-menu label sonner
```

### 4. Configure Environment Variables

**Backend (`backend/.env`)**

```env
PORT=4002
MONGODB_URI=mongodb://localhost:27017/contacts
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts?retryWrites=true&w=majority
NODE_ENV=development
```

**Frontend (`frontend/.env` - Optional)**

```env
VITE_API_URL=http://localhost:4002/api
```

### 5. Run Application

**Start MongoDB** (if local)

```bash
mongodb
```

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployed Application

Access the live version of the app here: [https://your-deployed-app-link.com](https://your-deployed-app-link.com)

---

## 📁 Project Structure

```
contact-management-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn/ui comp.
│   │   │   ├── AddContacts.jsx
│   │   │   └── ContactList.jsx
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/
    ├── db/
    │   └── index.js
    ├── models/
    │   └── user.model.js
    ├── routes/
    │   └── user.routes.js
    ├── index.js
    ├── package.json
    └── .env
```

---

##  API Endpoints

**Base URL:** `http://localhost:4002/api`

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/users/all`        | Retrieve all contacts  |
| POST   | `/users/add`        | Add a new contact      |
| DELETE | `/users/delete/:id` | Delete a contact by ID |

**Example: Add Contact**

```json
POST /users/add
{
  "name": "xyz",
  "number": "1234567890"
}
```

Success Response (201):

```json
{
  "success": true,
  "message": "Contact added successfully",
  "user": { "_id": "507f1f77bcf86cd799439011", "name": "xyz", "number": "1234567890" }
}
```

---

##  Usage

1. Click **"Add New Contact"** → Fill name & phone → Save.
2. Use search bar to filter contacts by name or number.
3. Click contact name to view/hide phone number.
4. Delete contacts using the three-dot menu.

---

##  Responsive Breakpoints

* Mobile: < 640px
* Tablet: 640px–1024px
* Desktop: > 1024px

---

## 👤 Author & Website

**Your Name** - [@yourhandle](https://twitter.com/yourhandle)
Website: [https://yourwebsite.com](https://yourwebsite.com)
Project: [GitHub Repository](https://github.com/yourusername/contact-management-app)

---

##  Acknowledgments

* [shadcn/ui](https://ui.shadcn.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Radix UI](https://www.radix-ui.com/)
* [Lucide](https://lucide.dev/)

---

Made with **React** and **Node.js**
