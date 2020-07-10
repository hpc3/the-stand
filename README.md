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



# Functionality

## /auth

### Login User

#### `POST /auth/login`

**Arguments**
>username  
password

**Response**

:white_check_mark: Success   
>  `200 OK` and token on success

:x: Failure  
> `422 Unprocessable Enttity` <->  Missing Username or Password  
 `404 Resource Not Found` <-> User was not found  
 `401 Unauthorized` <-> Password did not match  


---

### Create a new user

#### `POST /auth/createUser`

**Arguments**

>username  
password

**Response**

:white_check_mark: Success
>`201 Created` <-> User was created


:x: Failure
>`409 Conflict` <-> A user with that name already exists   
 `422 Unprocessable Entity`<-> Missing username or password

(Note: a token is not returned when a user is created. Creating a user is not a main piece of functionality and only one or two will ever exist.)

---
## /produce

#### List all produce in collection

`GET /produce`

**Response**

:white_check_mark: Success
>`200 OK` on success

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

>token

>id  
name  
price  
quantity  
dateLastStocked  



**Response**

:white_check_mark: Success
>`201 Created`

:x: Failure
>`403 Forbidden` Forbidden <-> Missing Token   
`401 Unauthorized` <-> Token is invalid


#### Updating a produce items quantity

`POST /produce/update`

**Arguments**
>token

>id   
quantity

Created by Express
>dateLastStocked

**Response**

:white_check_mark: Success
>`200 OK`

:x: Failure
>`403 Forbidden`  <-> Missing Token   
`401 Unauthorized` <-> Token is invalid  
`400 Bad Request` <-> Missing id or quantity  
`404 Not Found` <-> Item with id not found 


---
## /comments

#### Submit new comment

`POST /comments`


**Arguments**

>name  
email  
comment


**Response** 

:white_check_mark: Success
>`201 Created`

:x: Failure
>`400 Bad Request` <-> Missing name or comment


#### List all comments from collection

`GET /comments`

**Arguments**

>token

**Response**

:white_check_mark: Success
>`200 OK`

```json
{
    "name":"The Knight",
    "email": "dadWhyYouTrapMeInACave@HollowNest.edu",
    "comment": "I guess having no emotions helps with having an absentee father (Hollow Knight reference not cry for help)"
}

```

:x: Failure
>`403 Forbidden` <-> Missing Token  
`401 Unauthorized` <-> Token is invalid





