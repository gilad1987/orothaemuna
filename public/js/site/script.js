var onResize;
var downloadAttrHasSupport = (function(){
	var a;
	a = document.createElement('a');
	
	return typeof a.download != "undefined";
})();

function callCbOnImagesLoaded(context,cb){
    var i,len,arr,counter;

    /**
     * @desc Main page gallery
     * @type {Array}
     */
    arr = [
        'public/images/site/gallery/1.jpg','public/images/site/gallery/2.jpg','public/images/site/gallery/3.jpg','public/images/site/gallery/4.jpg','public/images/site/gallery/5.jpg'
    ];

    function decrease(){
        counter--;

        if(counter==0){
            if(typeof cb == 'function'){
                cb.apply(context);
            }
        }
    }

    i=0;
    len = counter = arr.length;
    var img;
    for(; i<len;i++){
        img = new Image();
        img.src =arr[i];
        img.onload = decrease;
    }

}

$(document).ready(function(){
	 myValidator = new GT.StandardFormValidator();
		myValidator.bindForms();

    callCbOnImagesLoaded(ProductsGallery,ProductsGallery.init);

	volumeCtrl  = (function(){
		var updateVolume,
			$audio,
			$body,
			$volume,
			posAudio,
			volumeY,
			pointerY,
			total,
			volInPercent;
		
		$audio = $("#audio-player");
		$volume = $(".volume-live");
		
		updateVolume = function(e){
			posAudio = $audio.offset();
			volumeY = posAudio.top+5;
			pointerY = $("body").scrollTop()+e.clientY;
			total = 51-(pointerY-volumeY);
			
			$volume.css("height",total);
			volInPercent = (total*100)/51;

			if(GT.media.audio5js != null)
				GT.media.audio5js.volume((1*volInPercent)/100);
			
		};
		
		return {
			update: function(e){
				updateVolume(e);
			}
		};
	})();
	
	onResize = (function(){
		var $document,
			$filter,
			$wrap_download_select,
			resize,
			MIN_WIDTH;
		
		MIN_WIDTH = 700;
		$document = $(document);
		$filter = $('#filter');
		$wrap_download_select = $('#wrap-download-select');
		
		
		resize = function(){
			$wrap_download_select.css('height',$filter.height()+28);
		};
		
		return function(){
			($document.width() < MIN_WIDTH) && !LessonCtrl.playerWidget.is_open ? resize() : null;
		};
	})();

	$(window).resize(onResize);
	setTimeout(function(){
		onResize();
		if(GT.IS_MOBILE){
			$('#about').readmore({
				speed: 800,
				maxHeight: 200,
				moreLink: '<a href="#">להמשך קריאה...</a>',
				lessLink: ''
			});
		}
		
	},100);
	$('select').customSelect();
	$("#wrap-volume-mode").on("click",volumeCtrl.update);
	
	$(".filter").on("change",LessonCtrl.onChangeSelect);
});
function filterOnSuccess(response){
	options = {};
	objects = response.objects;
	filter_name = response.filter_name;
	if(filter_name !="number"){
		filter="text";
	}else{
		filter="number";
	}
	for(i in objects){
		options[objects[i][filter_name]] = objects[i][filter];
	}
	$.each(options, function(val, text) {
	    $('#'+filter_name).append( new Option(text,val) );
	});
}
function filterOnError(response){}