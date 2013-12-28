$(document).ready(function(){ 
	$("#clear").attr("disabled",true);
	setupPage();
	getPhotoNames($("#date").val(), $("#time").val());
	$("#custom").click(function(){
		getPhotoNames($("#date").val(), $("#time").val())
	});
	
	$("#prev").on('click', function(){
		var prev = parseInt($(".curPhoto").attr("pic-id")) -1;
		advanceInPhoto(prev);
		
	});
	$("#next").on('click', function(){
		var next = parseInt($(".curPhoto").attr("pic-id")) +1;
		advanceInPhoto(next);
	});
	var timer;
	$("#play").on('click', function(){
		$("#play, #next, #prev").attr("disabled",true);
		$("#clear").attr("disabled",false);
		timer = setInterval(function(){
			var next = parseInt($(".curPhoto").attr("pic-id")) +1;
			animatePhoto(next, true);
			if(!$("[pic-id='"+(next)+"']").hasClass("picture")){
				stopAnimation();
			}
		},150);

		
	

	});
	$("#clear").on('click', stopAnimation);
	function stopAnimation(){
		clearTimeout(timer);
		$("#clear").attr("disabled",true);
		$("#play, #next, #prev").attr("disabled",false);
	}
	function advanceInPhoto(pageIndex){
		if(!$("[pic-id='"+(pageIndex)+"']").hasClass("picture")){
			animatePhoto(pageIndex, false);	
		}
	}
});


function animatePhoto(photoIndex, inLoop){
	if(!inLoop){
		$("#play, #next, #prev").attr("disabled",true);
	}
	var $prev = $(".curPhoto");
	$("[pic-id='"+photoIndex+"']").addClass("curPhoto").fadeIn(50,function(){
		$prev.removeClass("curPhoto").fadeOut(50);
		if(!inLoop){
			$("#play, #next, #prev").attr("disabled",false);
		}
	});
		
	
}

function getPhotoNames(varDate, varTime){
	$.ajax({
		url: "/servePhotos.php",
		type: "get",
		data: {"date":varDate, "time":varTime, "limit":3000},
		datatype: "json",
		success: processPhotos

	});

}
function setupPage(){
	$.ajax({
		url: "/servePhotos.php",
		type: "get",
		datatype: "json",
		success: function(data){
			data = JSON.parse(data);
			$.each(data, function(index, val){
				var option = $("<option>").val(val).text(dates[val.substring(4,6)] + " "+ val.	substring(6,8));
				$("#date").append(option);
			});
		}

	});
	dates = {1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"}
}

function processPhotos(data){
	data = JSON.parse(data);
	var date = data.date;
	$(".slides_container").html("");
	$.each(data.pics, function(index, value){
		var picture = $("<li>").append($("<img>").attr('src', '/assets/pictures/'+date+"/"+value)).attr({"pic-id":index, "date":date, "time":value.substring(0,4)}).addClass("picture").hide();
		$('#pictures > .slides_container').append(picture);	
	});

	animatePhoto(0, false);


}
