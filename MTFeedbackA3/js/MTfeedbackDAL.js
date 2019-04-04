/**
 * File Name: MTfeedbackDAL.js
 *
 * Revision History:
 *       Majid Tooranisama, 2019-04-11 : Created
 */

var Review = {
    MTinsert: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successInsert() {
            console.info("Success: Insert successful");
            alert("New Feedback Added");
        }

        function txFunction(tx) {
            var sql = "";
            sql = "INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, " +
                "rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },

    MTselectAll: function (callback) {
        var options = [];

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            console.info("Selecting all records.  ");
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    MTselect: function (callback, options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            console.info("Selecting a Feedback.  ");
            var sql = "SELECT * FROM review WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    MTupdate: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successUpdate() {
            console.info("Success: Update successful");
            alert("Feedback Updated successfully");
        }

        function txFunction(tx) {
            console.info("Updating..  ");
            var sql = "";
            sql = "UPDATE review " +
                "SET businessName=? , typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?,  rating1=?, rating2=?, rating3=?" +
                "WHERE id=?;";
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },

    MTdelete: function (options) {
        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function successDelete() {
            console.info("Success: Delete successful");
            alert("Feedback Deleted successfully");
        }

        function txFunction(tx) {
            console.info("Deleting..  ");
            var sql = "";
            sql = "DELETE FROM review " +
                "WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    MTselectAll: function (callback) {
        var options = [];

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            console.info("Selecting all records.  ");
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};