**API DOCUMENTATION MENU CATALOG**
***

To run the API, I use Thunder client ext on VSCode app/Postman application. here step to execute the endpoint:
- start your web server + database MySQL, like xampp/ laragon. i prefer using laragon to running web server n database.
- execute this command line in your terminal: 
    nodemon index 
***

**BASE URL**
this program uses the following base url:
http://localhost:8000

notes:
this program doesn't use authetntication
***

**ENDPOINTS**
***
**CREATE A MENU (POST)**
this endpoint to create a menu in program

here an example to execute an endpoint:
POST http://localhost:8000/menu

- this is example data can be execute at body on postman:
{
  "name": "Es Kopi Susu",
  "category": "drinks",
  "calories": 180,
  "price": 25000.00,
  "ingredients": ["coffee", "milk", "ice", "sugar"],
  "description": "Classic iced coffee with milk"
}

- result (response) if the endpoint execute successfully menu created(200):
{
    "message": "Menu created successfully",
    "data": {
        "id": 8,
        "name": "Es Kopi Susu",
        "category": "drinks",
        "calories": 180,
        "price": 25000,
        "ingredients": [
            "coffee",
            "milk",
            "ice",
            "sugar"
        ],
        "description": "Classic iced coffee with milk",
        "updated_at": "2025-11-27T08:35:44.997Z",
        "created_at": "2025-11-27T08:35:44.997Z"
    }
}
***

**LIST MENU (BASIC)**
in the program to get all menus data without filter using the endpoint:
GET http://localhost:8000/menu 

- the response if the program execute successfully OK(200):
{
    "data": [
        {
            "id": 6,
            "name": "Kentang Goreng",
            "category": "food",
            "calories": 320,
            "price": "15000",
            "ingredients": {
                "salt": true,
                "potato": true
            },
            "description": null,
            "created_at": "2025-11-26T00:27:40.000Z",
            "updated_at": "2025-11-26T00:27:40.000Z"
        },
        {
            "id": 2,
            "name": "Nasi Goreng",
            "category": "food",
            "calories": 520,
            "price": "25000",
            "ingredients": {
                "egg": true,
                "rice": true,
                "soy_sauce": true
            },
            "description": null,
            "created_at": "2025-11-26T07:20:42.000Z",
            "updated_at": "2025-11-26T07:20:42.000Z"
        },
        {
            "id": 5,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": null,
            "created_at": "2025-11-26T00:26:22.000Z",
            "updated_at": "2025-11-26T00:26:22.000Z"
        },
        {
            "id": 7,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": "Classic iced coffee with milk",
            "created_at": "2025-11-26T02:00:52.000Z",
            "updated_at": "2025-11-26T02:00:52.000Z"
        },
        {
            "id": 3,
            "name": "Sate Ayam",
            "category": "food",
            "calories": 450,
            "price": "30000",
            "ingredients": {
                "chicken": true,
                "peanut_sauce": true
            },
            "description": null,
            "created_at": "2025-11-26T07:20:42.000Z",
            "updated_at": "2025-11-26T07:20:42.000Z"
        }
    ],
    "pagination": {
        "total": 5,
        "page": 1,
        "per_page": 10,
        "total_pages": 1
    }
}
***

**LIST MENU USING FILTERS AND PAGINATION**
 this endpoint to get selected menu with filters n pagination. 
 example to excecute an endpoint:
  GET http://localhost:8000/menu?q=&category=drinks&min_price=8000&max_price=100000&max_cal=300&page={{page}}&per_page={{per_page}}&sort={{sort}}

- the result (response) if the program execute successfully OK(200):
    {
    "data": [
        {
            "id": 5,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": null,
            "created_at": "2025-11-26T00:26:22.000Z",
            "updated_at": "2025-11-26T00:26:22.000Z"
        },
        {
            "id": 7,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": "Classic iced coffee with milk",
            "created_at": "2025-11-26T02:00:52.000Z",
            "updated_at": "2025-11-26T02:00:52.000Z"
        }
    ],
    "pagination": {
        "total": 2,
        "page": 1,
        "per_page": 10,
        "total_pages": 1
    }
    }
***

**GET MENU BY ID**
this endpoint to get selected menu by id 

here example to execute an endpoint:
    GET http://localhost:8000/menu/{{menu_id}}

at postman collection default for value {{menu_id}} = 6 

- the result (response) if the program execute successfully OK(200):
{
    "success": true,
    "data": {
        "id": 6,
        "name": "Kentang Goreng",
        "category": "food",
        "calories": 320,
        "price": "15000",
        "ingredients": {
            "salt": true,
            "potato": true
        },
        "description": null,
        "created_at": "2025-11-26T00:27:40.000Z",
        "updated_at": "2025-11-26T00:27:40.000Z"
    }
}
***

**FULL UPDATE MENU (PUT)**
this endpoint to update a menu by id 

example to execute an endpoint:
PUT http://localhost:8000/menu/{{menu_id}}

- by default at postman collection, {{menu_id}} = 6
- example request data can be execute at body on postman:
{
  "name": "Es Kopi Susu Premium",
  "category": "drinks",
  "calories": 190,
  "price": 30000.00,
  "ingredients": ["coffee", "milk", "ice", "condensed_milk"],
  "description": "Premium recipe"
}

- the result (response) if the endpoint execute successfully ok(200):
{
    "message": "Menu updated successfully",
    "data": {
        "id": 6,
        "name": "Es Kopi Susu Premium",
        "category": "drinks",
        "calories": 190,
        "price": "30000",
        "ingredients": [
            "coffee",
            "milk",
            "ice",
            "condensed_milk"
        ],
        "description": "Premium recipe",
        "created_at": "2025-11-26T00:27:40.000Z",
        "updated_at": "2025-11-27T08:24:51.000Z"
    }
}
***

**DELETE MENU (DELETE)**
this endpoint to delete a menu in program 

example to execute an endpoint:
DELETE http://localhost:8000/menu/{{menu_id}}

- by default at postman collection, {{menu_id}} = 6
- the result (response) if the endpoint execute successfully, ok(200):
{
    "message": "Menu deleted successfully"
}
***

**GROUP BY CATEGORY (GET)**
this endpoint to get a count data by category 

example to execute an endpoint:
GET http://localhost:8000/menu/group-by-category?mode=count

- the result (response) if the endpoint execute successfully, ok(200):
{
    "data": {
        "food": 2,
        "drinks": 3
    }
} 
***

**GROUP BY CATEGORY (GET) list**
this endpoint to get a list of data by category 

example to execute an endpoint:
GET http://localhost:8000/menu/group-by-category?mode=list&per_category=5

- the result (response) if the endpoint execute successfully, ok(200):
{
    "data": {
        "drinks": [
            {
                "id": 5,
                "name": "Es Kopi Susu",
                "category": "drinks",
                "calories": 180,
                "price": "25000",
                "ingredients": [
                    "coffee",
                    "milk",
                    "ice",
                    "sugar"
                ],
                "description": null,
                "created_at": "2025-11-26T00:26:22.000Z",
                "updated_at": "2025-11-26T00:26:22.000Z"
            },
            {
                "id": 7,
                "name": "Es Kopi Susu",
                "category": "drinks",
                "calories": 180,
                "price": "25000",
                "ingredients": [
                    "coffee",
                    "milk",
                    "ice",
                    "sugar"
                ],
                "description": "Classic iced coffee with milk",
                "created_at": "2025-11-26T02:00:52.000Z",
                "updated_at": "2025-11-26T02:00:52.000Z"
            },
            {
                "id": 8,
                "name": "Es Kopi Susu",
                "category": "drinks",
                "calories": 180,
                "price": "25000",
                "ingredients": [
                    "coffee",
                    "milk",
                    "ice",
                    "sugar"
                ],
                "description": "Classic iced coffee with milk",
                "created_at": "2025-11-27T08:35:44.000Z",
                "updated_at": "2025-11-27T08:35:44.000Z"
            }
        ],
        "food": [
            {
                "id": 2,
                "name": "Nasi Goreng",
                "category": "food",
                "calories": 520,
                "price": "25000",
                "ingredients": {
                    "egg": true,
                    "rice": true,
                    "soy_sauce": true
                },
                "description": null,
                "created_at": "2025-11-26T07:20:42.000Z",
                "updated_at": "2025-11-26T07:20:42.000Z"
            },
            {
                "id": 3,
                "name": "Sate Ayam",
                "category": "food",
                "calories": 450,
                "price": "30000",
                "ingredients": {
                    "chicken": true,
                    "peanut_sauce": true
                },
                "description": null,
                "created_at": "2025-11-26T07:20:42.000Z",
                "updated_at": "2025-11-26T07:20:42.000Z"
            }
        ]
    }
}

**SEARCH BY FULL TEXT (GET)**
this endpoint to get a data based on full-text search.

example to execute an endpoint:
GET http://localhost:8000/menu/search?q=Es Kopi Susu&page={{page}}&per_page={{per_page}}
- by default at postman collection, {{page}} = 1 and {{per_page}} = 10
- the result (response) if the endpoint execute successfully, ok(200):
{
    "data": [
        {
            "id": 5,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": null,
            "created_at": "2025-11-26T00:26:22.000Z",
            "updated_at": "2025-11-26T00:26:22.000Z"
        },
        {
            "id": 8,
            "name": "Es Kopi Susu",
            "category": "drinks",
            "calories": 180,
            "price": "25000",
            "ingredients": [
                "coffee",
                "milk",
                "ice",
                "sugar"
            ],
            "description": "Classic iced coffee with milk",
            "created_at": "2025-11-27T08:35:44.000Z",
            "updated_at": "2025-11-27T08:35:44.000Z"
        }
    ],
    "pagination": {
        "total": 2,
        "page": 1,
        "per_page": 10
    }
}
***

**NOT FOUND MENU (GET)**
this endpoint to cant get a data by id if an user made a wrong input  

example to execute an endpoint:
GET http://localhost:8000/menu/99999

- the result (response) if the endpoint execute successfully, not found(404):
{
    "success": false,
    "message": "Menu not found"
}

a program cant access data with id = 9999 at database
***

**ASK GEMINI (POST)**
this endpoint to ask with gemini AI

example to execute an endpoint:
POST http://localhost:8000/menu/gemini/ask

- example request data can be execute at body on postman:
{
  "prompt": "tolong cariin ak resep yg enak buat anak kost (maks 100 kata ajh)"
}

- the result (response) if the endpoint execute successfully, OK(200):
{
    "success": true,
    "jawaban": "Hai! Nih 2 resep enak & praktis buat anak kost, anti ribet:\n\n**1. Mie Instan \"Naik Level\":**\nRebus mie. Sesaat sebelum matang, masukkan 1 telur dan sayur (sawi/kol). Tiriskan sedikit air (nyemek) atau seluruhnya. Campur bumbu, aduk. Tambah irisan cabai jika suka pedas. Lezat & kenyang!\n\n**2. Telur Dadar \"Super Cepat\":**\nKocok 2 telur. Masukkan irisan bawang merah, cabai rawit (opsional), daun bawang, garam. Goreng di sedikit minyak sampai matang. Sajikan hangat dengan nasi. Protein cepat, bisa tambah wortel parut!"
}