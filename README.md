# Authentication and Authorization API

A REST API built with Express that uses Supabase as its authentication provider. Instead of managing passwords and tokens itself, the API delegates signup, login, token refresh, and logout to Supabase, which issues and manages all JWTs.

Every request to a protected endpoint must include a valid token. Some endpoints go a step further and require an admin role. Login attempts are rate-limited to prevent brute-force attacks, and the full API is documented with an interactive Swagger UI.

## The Trust Triangle

![Authentication Flow Diagram](visuals/diagram.png)

## API Reference

All requests and responses use `application/json` format.

| Endpoint               | Method |     Auth Required     |        Status Codes        | Description                                                  |
| :--------------------- | :----: | :-------------------: | :------------------------: | :----------------------------------------------------------- |
| `/public/info`         | `GET`  |         None          |           `200`            | Returns a public welcome message. No login needed.           |
| `/auth/signup`         | `POST` |         None          |        `201`, `400`        | Creates a new user account with an email and password.       |
| `/auth/login`          | `POST` |         None          | `200`, `400`, `401`, `429` | Logs in and returns access and refresh tokens. Rate-limited. |
| `/auth/refresh`        | `POST` |         None          |    `200`, `400`, `401`     | Exchanges a refresh token for a new access token.            |
| `/auth/logout`         | `POST` |     Bearer Token      |        `204`, `401`        | Logs out the current user.                                   |
| `/protected/profile`   | `GET`  |     Bearer Token      |        `200`, `401`        | Returns the logged-in user's profile information.            |
| `/protected/dashboard` | `GET`  |     Bearer Token      |        `200`, `401`        | Returns dashboard data for the logged-in user.               |
| `/protected/admin`     | `GET`  | Bearer Token and Role |    `200`, `401`, `403`     | Admin-only route. Requires the user to have an admin role.   |

## Token Lifecycles

- **Access Tokens (JWT)**:

  Short-lived credentials, typically valid for one hour, are sent with each authenticated request. Their limited lifespan reduces the period of exposure if a token is intercepted.

- **Refresh Tokens**:

  Long-lived, single-use credentials securely stored by the client. When an access token expires, the client calls `POST /auth/refresh` with the refresh token to obtain a new access token without requiring the user to re-enter their password.

### Brute-Force Rate Limiting

The `POST /auth/login` endpoint is guarded by rate-limiting middleware. It restricts each IP address to **5 attempts per 15 minutes**, returning HTTP `429 Too Many Requests` when exceeded. This defends against automated dictionary attacks and password guessing.

## Running the Server

**Install dependencies:**

```bash
npm install
```

**Configure environment variables:**

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

**Start the server:**

```bash
npm run dev
```

Upon successful launch, the console displays:

```text
Server running on port 3000 and connected to Supabase
```

## Swagger Documentation

```
http://localhost:3000/docs
```
