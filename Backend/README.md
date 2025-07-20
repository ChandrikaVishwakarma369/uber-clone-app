# User API Documentation

## Endpoints:

### 1. `/users/register`

#### Method: `POST`

#### Description:
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, creates the user, and returns a JSON Web Token (JWT) for authentication.

---

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Description                                      |
|---------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname`| String | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname` | String | No       | The last name of the user (minimum 3 characters). |
| `email`             | String | Yes      | The email address of the user (must be valid and unique). |
| `password`          | String | Yes      | The password for the user (minimum 6 characters). |

---

#### Response:

##### Success Response:
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstname": "<FIRSTNAME>",
        "lastname": "<LASTNAME>"
      },
      "email": "<EMAIL>"
    }
  }
  ```

##### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "<ERROR_MESSAGE>",
           "param": "<FIELD_NAME>",
           "location": "body"
         }
       ]
     }
     ```

2. **User Already Exists:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "User already exist"
     }
     ```

3. **Missing Required Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "All fields are required"
     }
     ```

---

#### Example Request:
```bash
POST /users/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Example Success Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64b8f2c5e4b0f5d1a8c3e9a1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### 2. `/users/login`

#### Method: `POST`

#### Description:
This endpoint is used to authenticate an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) for authentication.

---

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                      |
|------------|--------|----------|--------------------------------------------------|
| `email`    | String | Yes      | The email address of the user (must be valid).  |
| `password` | String | Yes      | The password for the user (minimum 6 characters). |

---

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstname": "<FIRSTNAME>",
        "lastname": "<LASTNAME>"
      },
      "email": "<EMAIL>"
    }
  }
  ```

##### Error Responses:
1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "<ERROR_MESSAGE>",
           "param": "<FIELD_NAME>",
           "location": "body"
         }
       ]
     }
     ```

2. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Invalid Email Or Password"
     }
     ```

---

#### Example Request:
```bash
POST /users/login HTTP/1.1
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Example Success Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64b8f2c5e4b0f5d1a8c3e9a1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Notes:
- Ensure the `email` and `password` fields are valid.
- A valid JWT token is returned upon successful login.

---

### Validation Rules:
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

---

### Dependencies:
- **Validation Middleware:** `express-validator`
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Token (JWT)