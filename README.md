# The Stand - API Documentation

## Usage

    Storing and retrieving data from a MongoDB database

## Collections

    Produce - Data representing an item to be sold
    Comments - comments from a customer submitted through a form
    Users - Data regarding log in information which allows a user to manipulate and access certain data


## Routes

/produce
/comments
/users

## Models

### User

```json
{
    "username": 'String type - ',
    "password": "String type -   '
}
```


### Produce

```json
{
    "identifier": "String Type - globally unique identifier for produce item ex. tomato, green-bean",
    "name": "String Type - name of a produce item for UI ex. Tomato, Green Beans",
    "price": "Number Type - price in USD",
    "quantity": "Number Type - current count of item in stock",
    "dateLastStocked": "Date Type - data of last pickUp of item, only gets updated if quantity increases",
    "imgSrc": "String Type - file path for image to corresponding item, ends in /identifier"
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

## Functionality


### /users

#### Log In

`POST /users/login`

**Response**

-- `200 Ok` and token on success

-- `404` when user not found or password isn't correct

**Arguments**

-`"email`
-`"password"`




### /produce

#### List all produce in collection

`GET /produce`

**Response**

-- `200 OK` on success

```json
{
    {
        "name": "Corn",
        "price": "0.50",
        "quantity": 50,
        "dateLastStocked": " ex. 2020-06-10T22:06:54.900Z",
        "imgSrc": "../img/corn.jpg"
    },
    {
        "name": "green_beans",
        "price": "1.50",
        "quantity": 10,
        "dateLastStocked": " ex. 2020-06-10T22:06:54.900Z",
        "imgSrc": "../img/green-beans.jpg"
    }
}
```

#### Add new produce item

**Required Authentication**

`POST /produce`

**Arguments**

- `"identifier": "String Type - globally unique identifier for produce item ex. tomato, green-bean"`
- `"name": "String Type - name of a produce item for UI ex. Tomato, Green Beans"`
- `"price": "Number Type - price in USD"`
- `"quantity": "Number Type - current count of item in stock"`
- `"dateLastStocked": "Date Type - data of last pickUp of item, only gets updated if quantity increases"`
- `"imgSrc": "String Type - path of image for corresponding item, ends in /idenfifier"`


**Response**

-- `201 Created` on success


#### Updating a produce items quantity

`PATCH /produce/<identifier>`

**Arguments**

- `"identifier: "String Type - globally unique identifier for produce item ex. tomato, green-bean"`
- `"quantity": ""Number Type - current count of item in stock"" `
- `"dateLastStocked": "Date Type - data of last pickUp of item, only gets updated if quantity increases"`

**Response**

--`200 OK`on success

--`401 Unauthorized` for unaurothrized user making request
--`404 Not Found` for an identifier that does not exist 


### /comments

#### Submit new comment

`POST /comments`


**Arguments**

-`"name": "String Type - name of person submitting comment"`
-`"email": "String Type - email of person submitting comment"`
-`"message": "String Type - message of person submitting comment"`


**Response** 

-- `201 Created` on success


#### List all comments from collection

`GET /comments`

**Response**

- `200 OK` on success

```json

{
    "name":"The Knight",
    "email": "dadWhyYouTrapMeInACave@HollowNest.edu",
    "comment": "I guess having no emotions helps with having an absentee father"
}

```