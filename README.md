# URL Shortener Backend

This is the backend implementation of a URL shortener application built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. The backend handles the creation of short URLs and redirects users to the original URL when accessing a short URL.



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

2. Install dependencies:
 ```npm install

3. Set up environment variables: Create a .env file in the root directory and add the following
    ```DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
        BASE_URL=http://localhost:5000

4. Initialize the database
    ```npx prisma migrate dev --name init

5.Start the server
    ```npm start


