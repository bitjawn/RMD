# Restaurant Menu Demo
<h3>A Node/Express web application, using Foundation front end. Browsing a restaurant's menu.</h3>
<ul>
    <li>Express: 4.14.0</li>
    <li>Foundation: 6.3.1</li>
    <li>View Engine: Dust</li>
    <li><b>Menu DB: <a href="http://couchdb.apache.org/"><i>Apache CouchDB</i></a></b></li>
    <li><b>Admin DB: <a href="https://www.mongodb.com/download-center?jmp=docs&_ga=1.202993809.1491474904.1492296757#community"><i>MongoDB</i></a></b></li>
</ul>
<h3>Instructions</h3>

```bash
# Installation
 - clone https://github.com/bitjawn/RestaurantMenu.git or download the zip
 
 npm install

# External Dependencies
 CouchDB
    ## Menu Model
    {
      "_id": String,
      "_rev": String,
      "title": String,
      "category": String,
      "duration": String
      "ingredients": String,
      "description": String,
      "source": String
    }

 MongoDB
    ## Admin User Model
    {
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        admin: Boolean
    }

 npm install --global nodemon
 
# Run App
 npm start
```
