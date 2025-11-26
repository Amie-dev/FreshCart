
---

## 🔑 Authentication & User Management

- **200 OK** → Successful login, fetch user profile, or general success.
- **201 Created** → New user registered successfully.
- **400 Bad Request** → Invalid input (e.g., missing fields, password too short).
- **401 Unauthorized** → Login failed (wrong password, invalid token).
- **403 Forbidden** → User authenticated but not allowed (e.g., normal user trying admin-only action).
- **404 Not Found** → User not found (e.g., login with non-existent email).
- **409 Conflict** → Duplicate resource (e.g., email already registered).

---

## 📦 CRUD Operations (General API)

- **200 OK** → Successful GET, PUT, DELETE.
- **201 Created** → Resource created (new order, product, etc.).
- **204 No Content** → Successful DELETE or update with no response body.
- **400 Bad Request** → Invalid request payload or query.
- **404 Not Found** → Resource doesn’t exist.
- **409 Conflict** → Resource conflict (duplicate entry, version mismatch).

---

## ⚠️ Server & System Errors

- **500 Internal Server Error** → Unexpected server crash or bug.
- **502 Bad Gateway** → Upstream service error (e.g., external API failed).
- **503 Service Unavailable** → Server temporarily down or overloaded.
- **504 Gateway Timeout** → External service took too long to respond.

---
