# API Spec

To run the API, use the following command:

```bash
npm run start
```

### GET advisor

Retrieve a list of advisors.

```bash
GET /advisor
```

#### Response

```json
{
  "advisors": [
    {
      "id": 1,
      "name": "John Doe",
      "avatar": "https://via.placeholder.com/150",
      "email": "user@zoefin.com",
      "phone": "123-456-7890",
      "address": "123 Main St, San Francisco, CA 94101",
      "income": 12000
    }
  ]
}
```

### GET advisor/:id

Retrieve a single advisor.

```bash
GET /advisor/:id
```

#### Response

```json
{
  "advisor": {
    "id": 1,
    "name": "John Doe",
    "avatar": "https://via.placeholder.com/150",
    "email": "johndoe@zoefin.com",
    "phone": "123-456-7890",
    "address": "123 Main St, San Francisco, CA 94101",
    "income": 12000
  }
}
```

### POST advisor

Create a new advisor.

```bash
POST /advisor
```

#### Request

```json
{
  "name": "John Doe",
  "avatar": "https://via.placeholder.com/150",
  "email": "john.doe@zoefin.com",
  "phone": "123-456-7890",
  "address": "123 Main St, San Francisco, CA 94101",
  "income": 12000
}
```

#### Response

```json
{
  "advisor": {
    "id": 1,
    "name": "John Doe",
    "avatar": "https://via.placeholder.com/150",
    "email": "john.doe@zoefin.com",
    "phone": "123-456-7890",
    "address": "123 Main St, San Francisco, CA 94101",
    "income": 12000
  }
}
```

### PUT advisor/:id

Update an existing advisor.

```bash
PUT /advisor/:id
```

#### Request

```json
{
  "name": "John Doe Smithglerson",
  "avatar": "https://via.placeholder.com/150",
  "email": "john.doe@zoefin.com",
  "phone": "123-456-7890",
  "address": "123 Main St, San Francisco, CA 94101",
  "income": 10000
}
```

#### Response

```json
{
  "name": "John Doe Smithglerson",
  "avatar": "https://via.placeholder.com/150",
  "email": "john.doe@zoefin.com",
  "phone": "123-456-7890",
  "address": "123 Main St, San Francisco, CA 94101",
  "income": 10000
}
```

### DELETE advisor/:id

Delete an existing advisor.

```bash
DELETE /advisor/:id
```

#### Response

```json
{
  "name": "John Doe Smithglerson",
  "avatar": "https://via.placeholder.com/150",
  "email": "john.doe@zoefin.com",
  "phone": "123-456-7890",
  "address": "123 Main St, San Francisco, CA 94101",
  "income": 10000
}
```

### PATCH advisor/:id

Update an existing advisor.

```bash
PATCH /advisor/:id
```

#### Request

```json
{
  "income": 5000
}
```

#### Response

```json
{
  "name": "John Doe Smithglerson",
  "avatar": "https://via.placeholder.com/150",
  "email": "john.doe@zoefin.com",
  "phone": "123-456-7890",
  "address": "123 Main St, San Francisco, CA 94101",
  "income": 5000
}
```