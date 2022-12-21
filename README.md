# bestfootballsite - Back-End
This is my Back-End server with MongoDb and express for my SoftUni project

# How to start the Server
npm i - to intall the libraries
npm start - starts the server at `http://localhost:3000`

# How to create a product with POST request 
to create a product use Postman 
send a POST request to - `http://localhost:3000/shirts`

use JSON and send a body with this information for example : 

{
    "title": "Manchester United 2021/2022 Home Kit",
    "image": `"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSre8mBc2d5HR2IokfTqOkp5dBB14-Jk5k9uw&usqp=CAU"`,
    "description": "This is the new season Manchester United Home Kit",
    "price": 80,
    "team": "Manchester United",
    "inStock" : 100
}

to view the product go to the navigation bar - products - english league - Manchester United 

# POST request requirements

title(string) - this is the product title 

image(string) - this is the product image you can copy any image with copy image address and paste it 

description(string) - this is the product description

price(number) - this is the price of the product

team(string)- this is the team name of the product and it MUST be named right, for example - (Manchester City , Manchester United , Liverpool) 
if you type a wrong team name , for example -  (Man City, Man Utd ,Barca) the product won't show
valid team names = (Manchester City,Manchester United,Arsenal,Chelsea,Liverpool)

inStock (number) - this is how much products will be in stock 




