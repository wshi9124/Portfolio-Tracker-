# Portfolio Tracker

# Technologies
 React, Javascript, HTML, CSS, Semantic UI, Finnhub Stock API  
 

####Features for Home Page:
######
Donut Chart to display your current stock holdings
######
Line chart to track total balance history 
######
Can buy or sell stocks on the stock table like any usual trading platforms
######
Can sort holdings by Ticker and price


####Features for Watchlist Page:
######
Can add stocks to the watchlist 
######
When a stock from the watchlist is clicked it will display the top ten most recent news on the stock 
######
Shows the top 100 stocks in alphabetical order
######
Can search for stocks by Ticker and Name if the API server is turned on

####Features for Transfer Page:
######
Mocks cash transfers to the account and records it in real time

####Features for Settings Page:
######
Can change profile settings that will persist
######
Has a toggle dark mode  

### Setup
Run npm install in your terminal.
##
Run npm run server
Run npm run server-market (our test database)
##
This will run your backend on port 6001 and port 6002.
##
In a new terminal, run npm start.
##
Make a copy of .env.example
Change the file name to .env
Update REACT_APP_STOCK_API_KEY_SANDBOX, REACT_APP_STOCK_API_KEY_PROD with the actual key 
##
Inside StockAPI.js, you can switch from using the testing database in db-market.json to Finnhub API by switching use fake data to true and false
