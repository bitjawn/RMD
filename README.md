# Restaurant Menu Demo
<h3>A Node/Express web application, using Foundation front end. Browse a restaurant's menu</h3>
<ul>
    <li>Express: 4.14.0</li>
    <li>Foundation: 6.3.1</li>
    <li>View Engine: Dust</li>
    <li>Menu DB: <a href="http://couchdb.apache.org/">Apache CouchDB</a></li>
    <li>Admin DB: <a href="https://www.mongodb.com/download-center?jmp=docs&_ga=1.202993809.1491474904.1492296757#community">MongoDB</a></li>
</ul>
<h3>Instructions</h3>

```bash
# Installation
 clone https://github.com/bitjawn/RestaurantMenu.git or download the zip
 
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
      "description":  String,
      "source": String
    }
 MongoDB
    ## Admin User Model
    {
        username: String,
        password: String,
        admin: Boolean
    }
 npm install --global nodemon
 
# Run App
 npm start
```