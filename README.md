#**The Stand - API Documentation**

# Usage

    Storing and retrieving data from a MongoDB database
    Passing and accepting data from ReactJS frontend (front-end, front end, fr0nt-3nd)

# Collections

    Veggies - Data representing an item to be sold
    Comments - Contact info and message from customers
    Users - Data regarding log in information which allows a user to access and manipulate certain data

# Routes

    /produce
    /comment
    /user
    /sales

# Models

### User

```json
{
  "username": "String type - name that uniquly identifiers a user",
  "password": "String type - hashed string to verify user"
}
```

### Produce

```json
{
  "id": "String Type - globally unique identifier for produce item ex. tomato, green-bean",
  "name": "String Type - name of a produce item for UI ex. Tomato, Green Beans",
  "price": "Number Type - price in USD",
  "quantity": "Number Type - current count of item in stock",
  "dateLastStocked": "Date Type - date of last stocking of items on stand"
}
```

### Comment

```json
{
  "name": "String Type - name of person submitting comment",
  "email": "String Type - email of person submitting comment",
  "message": "String Type - message of person submitting comment"
}
```

### Sale

```json
{
  "date": "ISO String - Date of records",
  "sales": "Number Type- money in USD from selling items",
  "expense": "Number Type - money in USD spent on buying items"
}
```

# Functionality

## /produce

#### List all produce in collection

`GET /produce`

**Response**

:white_check_mark: Success

> `200 OK` on success

```json
{
    {
        "id": "corn",
        "name": "Corn",
        "price": "0.50",
        "quantity": 50,
        "dateLastStocked": "ex. 2020-06-10T22:06:54.900Z"
    },
    {
        "id": "green-beans",
        "name": "Green Beans",
        "price": "1.50",
        "quantity": 10,
        "dateLastStocked": " ex. 2020-06-10T22:06:54.900Z"
    },
    ...
}
```

:x: Failure

> `503 Service Unavailable` Cannot connect to Database

#### Add new produce item

`POST /produce`

**Arguments**

> token

> id  
> name  
> price  
> quantity  
> dateLastStocked  
> inSeason

**Response**

:white_check_mark: Success

> `201 Created`

:x: Failure

> `403 Forbidden` Forbidden <-> Missing Token  
> `401 Unauthorized` <-> Token is invalid

#### Update produce item

`POST /produce/update`

**Arguments**

> token

Required

> id

Optional

> quantity
> inSeason
> name
> price

**Response**

:white_check_mark: Success

> `200 OK`

:x: Failure

> `403 Forbidden` <-> Missing Token  
> `401 Unauthorized` <-> Token is invalid  
> `400 Bad Request` <-> Missing id or quantity  
> `404 Not Found` <-> Item with id not found

---

## /comment

#### Submit new comment

`POST /comment`

**Arguments**

> name  
> email  
> comment

**Response**

:white_check_mark: Success

> `201 Created`

:x: Failure

> `400 Bad Request` <-> Missing name or comment

#### List all comments from collection

`GET /comment`

**Arguments**

> token

**Request**

headers{
'Authorization' : 'Bearer ' + token
}

**Response**

:white_check_mark: Success

> `200 OK`

```json
{
  "name": "The Knight",
  "email": "dadWhyYouTrapMeInACave@HollowNest.edu",
  "comment": "I guess having no emotions helps with having an absentee father (Hollow Knight reference not cry for help)"
}
```

:x: Failure

> `403 Forbidden` <-> Missing Token  
> `401 Unauthorized` <-> Token is invalid

#### Archive a comment

`POST /comment/archive`

**Arguments**

> token

> id

headers{
'Authorization' : 'Bearer ' + token
}

body:{
id
}

## /sales

#### Submit Sales Data

`POST /sales`

**Arguments**

> token

> date
> expense
> sales

#### Get Sales Data

`GET /sales`

**Arguments**

> token
