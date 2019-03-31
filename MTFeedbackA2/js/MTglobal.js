/**
 * File Name: MTglobal.js
 *
 * Revision History:
 *       Majid Tooranisama, 2019-03-10 : Created
 */

function MTAddRating_click() {
	if(this.checked){
		$("#MTRating").show();
	}
	else{
		$("#MTRating").hide();
	}
}

function MTFoodRating_click() {
    MTcalculateRatingAdd();
}

function MTServiceRating_click() {
    MTcalculateRatingAdd();
}

function MTValueRating_click() {
	MTcalculateRatingAdd();
}

function MTSave_click() {
    MTSave();
}

function MTModifyRating_click() {
	if(this.checked){
		$("#MTEditRating").show();
	}
	else{
		$("#MTEditRating").hide();
	}
}

function MTModifyFoodRating_click() {
    MTcalculateRatingEdit();
}

function MTModifyServiceRating_click() {
    MTcalculateRatingEdit();
}

function MTModifyValueRating_click() {
	MTcalculateRatingEdit();
}

function MTUpdate_click() {
	MTUpdate();
}

function MTSaveDefault_click() {
	MTSaveDefaultEmail();
}

function init() {
	console.info("DOM is ready");

	$("#MTAddRating").on("click", MTAddRating_click);

	$("#MTFoodRating").on("click", MTFoodRating_click);
	$("#MTServiceRating").on("click", MTServiceRating_click);
	$("#MTValueRating").on("click", MTValueRating_click);

	$("#MTModifyRating").on("click", MTModifyRating_click);

	$("#MTModifyFoodRating").on("click", MTModifyFoodRating_click);
	$("#MTModifyServiceRating").on("click", MTModifyServiceRating_click);
	$("#MTModifyValueRating").on("click", MTModifyValueRating_click);

	$("#MTSave").on("click", MTSave_click);

	$("#MTUpdate").on("click", MTUpdate_click);

	$("#MTSaveDefault").on("click", MTSaveDefault_click);
}

$(document).ready(function () {
    init();
});


