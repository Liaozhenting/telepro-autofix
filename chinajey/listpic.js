$(function() {
	$("#move li").mouseover(function() {
		var i = $(this).index();
		$("#move li p").removeClass("sel");
		$(this).children("p").addClass("sel");
		$(".list_area div").hide();
		$(".list_area div").eq(i).show();
	});
	/*$("#move li").click(function() {
		$("#move li p").removeClass("sel");
		$(this).children("p").addClass("sel");
	});	*/
});