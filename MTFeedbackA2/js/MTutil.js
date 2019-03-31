/**
 * File Name: MTutil.js
 *
 * Revision History:
 *       Majid Tooranisama, 2019-03-10 : Created
 */

function GetOverallRating(quality, service, value) {
    var averageRating = (quality + service + value) * 100/15;
    return averageRating.toFixed(2);
}

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

function MTSave() {
    if(DoValidate_MTAddForm())
    {
        console.info("Add Feedback's Form Validation is successful.");
    }
    else
    {
        console.error("Add Feedback's Form Validation is failed.");
    }
}

function MTUpdate() {
    if(DoValidate_MTModifyForm())
    {
        console.info("Modify Feedback's Form Validation is successful.");
    }
    else
    {
        console.error("Modify Feedback's Form Validation is failed.")
    }
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

function DoValidate_MTAddForm(){
    var form = $("#MTAddForm");
    form.validate({
        rules:{
            MTName:{
                required: true,
                rangelength:[2,20]
            },
            MTEmail:{
                required: true,
                AddEmailCheck:true
            },
            MTReviewDate:{
                required:true
            },
            MTFoodRating:{
                AddNumberCheck:true
            },
            MTServiceRating:{
                AddNumberCheck:true
            },
            MTValueRating:{
                AddNumberCheck:true
            }
        },
        messages:{
            MTName:{
                required: "Name is required",
                rangelength:"Length must be 2-20 characters long"
            },
            MTEmail:{
                required: "Email is required",
                AddEmailCheck:"Please enter a valid email address"
            },
            MTReviewDate:{
                required:"Review date is required"
            },
            MTFoodRating:{
                AddNumberCheck:"Value must be 0-5"
            },
            MTServiceRating:{
                AddNumberCheck:"Value must be 0-5"
            },
            MTValueRating:{
                AddNumberCheck:"Value must be 0-5"
            }
        }
    });
    return form.valid();
}

function DoValidate_MTModifyForm(){
    var form = $("#MTModifyForm");
    form.validate({
        rules:{
            MTModifyName:{
                required: true,
                rangelength:[2,20]
            },
            MTModifyEmail:{
                required: true,
                ModifyEmailCheck:true
            },
            MTModifyReviewDate:{
                required:true
            },
            MTModifyFoodRating:{
                ModifyNumberCheck:true
            },
            MTModifyServiceRating:{
                ModifyNumberCheck:true
            },
            MTModifyValueRating:{
                ModifyNumberCheck:true
            }
        },
        messages:{
            MTModifyName:{
                required: "Name is required",
                rangelength:"Length must be 2-20 characters long"
            },
            MTModifyEmail:{
                required: "Email is required",
                ModifyEmailCheck:"Please enter a valid email address"
            },
            MTModifyReviewDate:{
                required:"Review date is required"
            },
            MTModifyFoodRating:{
                ModifyNumberCheck:"Value must be 0-5"
            },
            MTModifyServiceRating:{
                ModifyNumberCheck:"Value must be 0-5"
            },
            MTModifyValueRating:{
                ModifyNumberCheck:"Value must be 0-5"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("AddEmailCheck",
    function(value, element)
    {
        var regex = /^[^@]+@[^@]+\.[^@]+$/;
        return this.optional(element) || regex.test(value);
    },
    "Add Email Checker");

jQuery.validator.addMethod("AddNumberCheck",
    function(value, element)
    {
        return !(this.optional(element) || value < 0 || value > 5);
    },
    "Add Number Checker");

jQuery.validator.addMethod("ModifyEmailCheck",
    function(value, element)
    {
        var regex = /^[^@]+@[^@]+\.[^@]+$/;
        return this.optional(element) || regex.test(value);
    },
    " Modify Email Checker");

jQuery.validator.addMethod("ModifyNumberCheck",
    function(value, element)
    {
        return !(this.optional(element) || value < 0 || value > 5);
    },
    "Modify Number Checker");


