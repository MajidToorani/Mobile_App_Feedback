/**
 * File Name: MTfacade.js
 *
 * Revision History:
 *       Majid Tooranisama, 2019-04-11 : Created
 */

function MTcalculateRatingAdd(){
    var quality = parseInt($("#MTFoodRating").val());
    var service = parseInt($("#MTServiceRating").val());
    var value = parseInt($("#MTValueRating").val());

    var averageRating = GetOverallRating(quality,service,value) +"%";
    $("#MTOverallRating").val(averageRating);
}

function MTcalculateRatingEdit(){
    var quality = parseInt($("#MTModifyFoodRating").val());
    var service = parseInt($("#MTModifyServiceRating").val());
    var value = parseInt($("#MTModifyValueRating").val());

    var averageRating = GetOverallRating(quality,service,value) +"%";
    $("#MTModifyOverallRating").val(averageRating);
}

function MTSaveDefaultEmail(){
    var DefaultEmail = $("#MTDefaultEmail").val();

    MTInitStorage();
    MTAddtoStorage();

    function MTInitStorage(){
        localStorage.setItem("DefaultEmail", DefaultEmail);
    }
    function MTAddtoStorage(){
        if (localStorage.getItem("DefaultEmail")){
            window.alert("Default reviewer email saved:"+ localStorage.getItem("DefaultEmail"));
        }
        else{
            window.alert("Saving default reviewer email failed")
        }
    }
}

function MTclearDatabase(){
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.MTdropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}
function MTshowAddFeedback(){
    var defaultReviewer = localStorage.getItem("DefaultEmail");
    $("#MTEmail").val(defaultReviewer);

    MTupdateTypesDropdown();
}

function MTupdateTypesDropdown(){
    $("#MTType").html("");
    function callback(tx,results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['name']=="Others") {
                $("#MTType").append("<option value='" +row['id']+"' selected>" + row['name'] +"</option>");
            }
            else{
                $("#MTType").append("<option value='" +row['id']+"'>" + row['name'] +"</option>");
            }

        }
        $("#MTType").selectmenu("refresh");

    }
    Type.MTselectAll(callback);
}

function MTAddFeedback(){
    if(DoValidate_MTAddForm())
    {
        console.info("Add Feedback Form Validation is successful.");
        var bName = $("#MTName").val();
        var typeId = $("#MTType").val();
        var revEmail = $("#MTEmail").val();
        var revComments = $("#MTComment").val();
        var revDate = $("#MTReviewDate").val();
        var hasRating = $("#MTAddRating").prop("checked");
        var r1 = $("#MTFoodRating").val();
        var r2 = $("#MTServiceRating").val();
        var r3 = $("#MTValueRating").val();

        if (hasRating) {
            var options =[bName,typeId,revEmail,revComments,revDate,hasRating,r1,r2,r3];
        }
        else{
            options=[bName,typeId,revEmail,revComments,revDate,hasRating,null, null, null];
        }
        Review.MTinsert(options);
    }
    else{
        console.error("Add Feedback Form Validation failed.");
    }
}

function MTgetReview(){
    function callback(tx, results){
        var htmlCode ="";

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows[i];
            if (row['hasRating'] === 'true') {
                console.info("rating1:" + row['rating1']);
                console.info("rating2:" + row['rating2']);
                console.info("rating3:" + row['rating3']);
                var calculateRating = GetOverallRating(row['rating1'],row['rating2'],row['rating3']);
                console.info("calculateRating", calculateRating);
                htmlCode += "<li>" + "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>Business Name: " + row['businessName'] + "</h1>" +
                    "<p>Reviewer Email: " + row['reviewerEmail'] + "</p>" +
                    "<p>Reviewer Comments: " + row['reviewerComments'] + "</p>" +
                    "<p>Overall Rating: " + calculateRating + "</p>" +
                    "</a>" +
                    "</li>";
            }
            else{
                htmlCode += "<li>" + "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>Business Name: " + row['businessName'] + "</h1>" +
                    "<p>Reviewer Email: " + row['reviewerEmail'] + "</p>" +
                    "<p>Reviewer Comments: " + row['reviewerComments'] + "</p>" +
                    "<p>Overall Rating: " + "0" + "</p>" +
                    "</a>" +
                    "</li>";
            }
        }

        var lv=$("#MTFeedbackList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler(){
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href','#MTEditFeedbackPage');
        }
        $("#MTFeedbackList a").on("click", clickHandler);


    }
    Review.MTselectAll(callback);
}

function MTupdateTypesDropdownEdit(typeId){
    var options =[];
    $("#MTModifyType").html("");
    function callback(tx,results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['id']==typeId) {
                $("#MTModifyType").append("<option value='" +row['id']+"' selected>" + row['name'] +"</option>");
            }
            else{
                $("#MTModifyType").append("<option value='" +row['id']+"'>" + row['name'] +"</option>");
            }

        }
        $("#MTModifyType").selectmenu("refresh");

    }
    Type.MTselectAll(callback);
}
function MTshowCurrentReview(){
    var id = localStorage.getItem("id");
    var options =[id];

    function callback(tx, results){
        var row = results.rows[0];

        MTupdateTypesDropdownEdit(row['typeId']);

        console.info("Business Name:" + row['businessName']);
        console.info("Type Id:" + row['typeId']);
        console.info("Reviewer Email:" + row['reviewerEmail']);
        console.info("Reviewer Comments:" + row['reviewerComments']);
        console.info("Review Date:" + row['reviewDate']);

        $("#MTModifyName").val(row['businessName']);
        $("#MTModifyType").val(row['typeId']);
        $("#MTModifyEmail").val(row['reviewerEmail']);
        $("#MTModifyComment").val(row['reviewerComments']);
        $("#MTModifyReviewDate").val(row['reviewDate']);

        if (row['hasRating'] === 'true') {
            $("#MTEditRating").show();
            $("#MTModifyRating").prop("checked", true).checkboxradio("refresh");
            $("#MTModifyFoodRating").val(row['rating1']);
            $("#MTModifyServiceRating").val(row['rating2']);
            $("#MTModifyValueRating").val(row['rating3']);

        }
        else{
            $("#MTEditRating").hide();
            $("#MTModifyRating").prop("checked", false).checkboxradio("refresh");
        }
    }
    Review.MTselect(callback, options);
}
function MTupdateFeedback() {
    if (DoValidate_MTModifyForm()) {
        console.info("Update Validation is successful");
        var id = localStorage.getItem("id");
        var bName = $("#MTModifyName").val();
        var typeId = $("#MTModifyType").val();
        var revEmail = $("#MTModifyEmail").val();
        var revComments = $("#MTModifyComment").val();
        var revDate = $("#MTModifyReviewDate").val();
        var hasRating = $("#MTModifyRating").prop("checked");
        var r1 = $("#MTModifyFoodRating").val();
        var r2 = $("#MTModifyServiceRating").val();
        var r3 = $("#MTModifyValueRating").val();

        var options = [bName,typeId,revEmail,revComments,revDate,hasRating,r1,r2,r3, id];
        Review.MTupdate(options);
        $(location).prop("href", "#MTViewFeedbackPage");
    }
}
function MTdeleteFeedback(){
    var id=localStorage.getItem("id");
    var options=[id];
    Review.MTdelete(options);
    $(location).prop("href", "#MTViewFeedbackPage");
}

function MTcancel(){
    MTshowCurrentReview();
}