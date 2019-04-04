/**
 * File Name: MTdatabase.js
 *
 * Revision History:
 *       Majid Tooranisama, 2019-04-11 : Created
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ")--" + error.message);
}

var DB = {
    MTcreateDatabase: function () {
        var shortName = "MTFeedbackDB";
        var version = "1.0";
        var displayName = "DB for MTFeedbackA3 App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");
        //or window.openDatabase()
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },

    MTcreateTables: function () {

        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successCreate() {
            console.info("Success: Create Table successful. ");
        }

        function successInsert() {
            console.info("Success: Data insert successful");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            //repeat for other tables
            //=======================

            //don't want to drop any table now. only if necessary.
            //=====================================================
            console.info("Dropping Table type if exists...");
            var sqlDropType = "DROP TABLE IF EXISTS type;";


            tx.executeSql(sqlDropType, options, successDrop, errorHandler);
            //=====================================================
            //uncomment if necessary

            console.info("Creating Table: type...");
            var sqlCreateType = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            tx.executeSql(sqlCreateType, options, successCreate, errorHandler);

            console.info("Inserting data to Table type...");
            //'' or "" both works.
            var sqlInsertType = ["INSERT INTO type(name) VALUES('Others');",
                " INSERT INTO type(name) VALUES('Asian');",
                " INSERT INTO type(name) VALUES('Canadian');"];

            for (var i = 0; i < sqlInsertType.length; i++) {
                tx.executeSql(sqlInsertType[i], options, successInsert, errorHandler);

            }
            //===================================================================

            console.info("Creating Other Tables:");
            //table with foreign key snippet
            var sqlCreateReview = "CREATE TABLE IF NOT EXISTS review(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            tx.executeSql(sqlCreateReview, options, successCreate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    MTdropTables: function () {
        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            //repeat for other tables
            //=======================
            console.info("Dropping Table: type");
            var sqlType = "DROP TABLE IF EXISTS type;";

            tx.executeSql(sqlType, options, successDrop, errorHandler);
            //=====================================================
            console.info("Dropping Table: review");
            var sqlReview = "DROP TABLE IF EXISTS review;";

            tx.executeSql(sqlReview, options, successDrop, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};



 