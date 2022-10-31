# Portfolio Tracker
Portfolio Tracker is a stock trading platform simulator where users can search, organize, and research their personal stock holdings. 

# Technologies
 React, Javascript, HTML, CSS, Semantic UI, Finnhub Stock API  
 
# Features 

On the top of the home page, there is a donut chart that displays all of the user's current stocks holdings and the total value of those stocks. Since the colors are randomized, they will change everytime you refresh the page. 
######
There is also a line graph that tracks the total balance history. However, since looking at stock history is a premium feature for Finnhub API, we made an algorithm that increases or decreases the total balance each day randomly by 5%. 

<img width="700" alt="Screen Shot 2022-10-31 at 1 15 12 PM" src="https://user-images.githubusercontent.com/104730743/199075182-af3b80b1-470b-4735-8855-91d4d0892dee.png">

On the bottom of the home page, users can see the cash balance remaining to buy stocks. They can also see their current holdings in more detail (name, shares, price, percentage, and total). Users can also sort their holdings by ticker and price. 
######
Finally, users can buy or sell the stocks they currently own. 

<img width="700" alt="Screen Shot 2022-10-31 at 1 15 31 PM" src="https://user-images.githubusercontent.com/104730743/199075212-1b89f548-59d8-4e81-a2d0-8ecded95af58.png">

<img width="700" alt="Screen Shot 2022-10-31 at 1 52 24 PM" src="https://user-images.githubusercontent.com/104730743/199076607-cdd789b8-310a-4bcb-babc-c43e9508e953.png">

<img width="700" alt="Screen Shot 2022-10-31 at 1 55 06 PM" src="https://user-images.githubusercontent.com/104730743/199076626-a29b4ce4-8a01-447b-b13c-a83870de95e2.png">

####Features for Watchlist Page:
######
Can add stocks to the watchlist 
######
When a stock from the watchlist is clicked it will display the top ten most recent news on the stock 
######
Shows the top 100 stocks in alphabetical order
######
Can search for stocks by Ticker and Name if the API server is turned on

<img width="700" alt="Screen Shot 2022-10-31 at 1 15 56 PM" src="https://user-images.githubusercontent.com/104730743/199075288-878c9fae-9c2c-4fbf-9735-f5d7cf2a387a.png">


####Features for Transfer Page:
######
Mocks cash transfers to the account and records it in real time

####Features for Settings Page:
######
Can change profile settings that will persist
######
Has a toggle dark mode  

<img width="700" alt="Screen Shot 2022-10-31 at 1 16 08 PM" src="https://user-images.githubusercontent.com/104730743/199075383-be1aef52-0914-45a5-9375-bdadcd801ec2.png">

<img width="700" alt="Screen Shot 2022-10-31 at 1 16 23 PM" src="https://user-images.githubusercontent.com/104730743/199075403-e23ec71e-8f84-4c9d-bdf8-dfa95006f616.png">

<img width="700" alt="Screen Shot 2022-10-31 at 1 17 00 PM" src="https://user-images.githubusercontent.com/104730743/199075416-21402b0b-0a91-4a81-ab14-75ac214dd142.png">


# Setup
Run npm install in your terminal.
######
Run npm run server
######
Run npm run server-market (our test database)
######
This will run your backend on port 6001 and port 6002.
######
In a new terminal, run npm start.
######
Make a copy of .env.example
######
Change the file name to .env
Update REACT_APP_STOCK_API_KEY_SANDBOX, REACT_APP_STOCK_API_KEY_PROD with the actual key 
######
Inside StockAPI.js, you can switch from using the testing database in db-market.json to Finnhub API by switching use fake data to true and false
