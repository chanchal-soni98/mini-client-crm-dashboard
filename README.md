# 💼 Client CRM Dashboard

A modern **Client Management Dashboard** built with React, Tailwind CSS, Hero UI, React Hook Form, and React Query v5. This project demonstrates clean architecture, form handling, optimistic updates, and CRUD operations using a REST API.

---

## 🧩 Tech Stack

| Tech                | Usage                          |
|---------------------|---------------------------------|
| **React**           | Frontend UI library             |
| **React Query v5**  | Data fetching and caching       |
| **Axios**           | HTTP requests                   |
| **React Hook Form** | Form management                 |
| **Zod**             | Schema-based form validation    |
| **Hero UI**         | Accessible UI components        |
| **Tailwind CSS**    | Utility-first styling           |
| **MockAPI.io**      | Mock API service                |

---

## ✨ Features

✅ Add New Client  
✅ Edit Existing Clients (via Modal)  
✅ Form Validation using Zod  
✅ Delete Clients (with confirmation modal)  
✅ Search Clients with Debounce  
✅ Tag Clients (as array of strings)  
✅ Nested Address Fields  
✅ Optimistic Updates for All Mutations  
✅ Responsive UI with Tailwind CSS  
✅ Hero UI Modal, Table, Chip Components  

---

## 🔄 Data Structure

Each client entry in the system follows this structure:

```json
{
  "id": 1,
  "name": "Alice Kumar",
  "email": "alice@example.com",
  "phone": "9876543210",
  "tags": ["Lead", "Converted"],
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip": "400001"
  }
}
## 🔧 Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/chanchal-soni98/mini-client-crm-dashboard.git
cd crm-dashboard
npm install

mockapi : https://686571a35b5d8d0339812d46.mockapi.io/api/v1/clients

