# BookAPI

##### By: Jarno Sundtröm, Lauri Järvisalo, Mikael Elgström (aka. Ryhmä 4)
___
## Getting started
1. Install MongoDB
2. Open Command Prompt and type `cd C:/` (or the drive letter from which you're planning on running the project)
3. Type `md \data\db` and close command prompt
4. Go to MongoDB's installation location, specifically the `\bin-folder` (e.g. `C:\Program Files\MongoDB\Server\4.2\bin`)
5. Launch mongo.exe and close with CTRL+C
6. Set up MongoDB as a PATH environment variable ([Instructions](https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/) / [archive link](http://archive.is/XGUCa))
7. Open a new command prompt and test by typing `mongod`
8. If it's recognized as a valid command just terminate it by pressing CTRL+C
9. Launch your preferred IDE (e.g. PhpStorm, VS Code, etc.) and open up the project
10. Type `npm install` in the terminal and check if successful
11. Open up 3 terminals/command prompt instances
12. Type `mongod` in one of the instances and check if successfully started
13. Type `npm start` in a second one and check that the app has started listening to the port
14. Go to `http://localhost:8000/` and you should reach the index.hbs site
___
### Rest examples

* GET:
    * All books: `localhost:8000/api/v1/books`
    * One book with a specific ID (`5e6aa2f855928a03e8ab9499` in this case): `localhost:8000/api/v1/books/5e6aa2f855928a03e8ab9499`
    * All books authored by Victor Hugo: `http://localhost:8000/api/v1/books/?author=Victor%20Hugo`
    * All books authored by Franz Kafka and published in the year 1915: `http://localhost:8000/api/v1/books/?author=Franz%20Kafka&?year=1915`
* POST
    * Location: `localhost:8000/api/v1/books`
    * Example Body: `{
                        "year": 2020,
                        "_id": "5e7202f85889312f985b7983",
                        "title": "PostTest",
                        "genre": "Testing",
                        "author": "Post Author"
                    }`
    * Title is required
* PUT
    * Same body as POST, but should be pointing to a valid Id
* PATCH
    * Same as PUT, but updates only fields that are specified
* DELETE
    * Same as GET for one specific book
___
### Useful commands & tips
* Run all tests: `npm test`
* Empty the "bookAPI-dev"-database: `mongo bookAPI-dev --eval "db.dropDatabase();"`
* Check the `\test_resources` directory for some quick testing
___
#### Known bugs
* Sometimes when searching the Google Books API, the year on the frontend listing will appear as '0000',  
which means it's detected as 'undefined', but if added to the database, the real year of publishing will  
appear correctly.
___
