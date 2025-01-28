# URL Shortener Backend

This is the backend implementation of a URL shortener application built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. The backend handles the creation of short URLs and redirects users to the original URL when accessing a short URL.

---

## Features

- **Create Short URL**: Generate a short, unique URL for any given original URL.
- **Redirect**: Redirect users to the original URL when a valid short URL is accessed.
- **Database Integration**: Stores and retrieves URLs from a PostgreSQL database using Prisma ORM.
- **Environment Variables**: Securely manages sensitive data using `.env`.

---

## Tech Stack

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for building APIs.
- **Prisma**: ORM for database operations.
- **PostgreSQL**: Relational database.
- **nanoid**: For generating unique short IDs.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or above)
- **PostgreSQL** (v12 or above)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener-backend.git
   cd url-shortener-backend


