ProductsGallery = {
		pos_init: [],
		image_width: 432,
		width_wrap:"",
		margin:30,
		length_images_on_gallery:[],
		galleries: [],
		loadding:false,
		setGalleryCurrent: function(name){
			$(".wrap_gallery_prodacts").removeClass("current");
			$(".wrap_gallery_prodacts."+name).addClass("current");
		},
		setImageWidth: function(){
			var wrapper =$("#wrap_gallery_prodacts").width();
			if(wrapper <= 500){
				return wrapper - 30;
			}
			return (wrapper-60)/2;
		},
		init: function(){
				this.image_width = this.setImageWidth();
				$(".product_image").css("width",this.image_width);
				var galleries_length = $(".wrap_inner_images").length;
				for(i=0; i<galleries_length; i++){
					this.galleries.push($($(".wrap_gallery_prodacts")[i]));	
					this.length_images_on_gallery.push($($(".wrap_inner_images")[i]).find(".product_image").length);
					$($(".wrap_inner_images")[i]).css("width",this.length_images_on_gallery[i]*(this.image_width+this.margin));
					this.width_wrap = this.length_images_on_gallery[i]*(this.image_width+this.margin);
					this.pos_init.push(0);
				}
				setTimeout(function(){
					$("#wrap_gallery_prodacts").css("height",$("#wrap_inner_images").height());
				},10);
		},
		right: function(gallery_index){
			if(!this.galleries[gallery_index].hasClass("current")){
				return;
			}
			if(this.loadding){
				return;
			}
			this.loadding = true;
			$(".current .arrows").removeClass("disable");
			this.pos_init[gallery_index] = this.pos_init[gallery_index] + 1;
			$(".current .wrap_inner_images").animate({
				right:(this.image_width+this.margin)*-1
			},500,function(){
				$(".current .wrap_inner_images").append($(".current .wrap_inner_images .product_image").first());
				$(".current .wrap_inner_images").css("right",0);
				ProductsGallery.loadding= false;
			});
			if(this.pos_init[gallery_index] == this.length_images_on_gallery[gallery_index]-1){
				$(".current .right_arrow").addClass("disable");
			}
		},

		left: function(gallery_index){
			if(!this.galleries[gallery_index].hasClass("current")){
				return;
			}
			if(this.loadding){
				return;
			}
			this.loadding= true;
			$(".current .arrows").removeClass("disable");
			this.pos_init[gallery_index] = this.pos_init[gallery_index] - 1;
			$(".current .wrap_inner_images").prepend($(".current .wrap_inner_images .product_image").last());
			$(".current .wrap_inner_images").css("right",-(this.image_width+this.margin));
			
			$(".current .wrap_inner_images").animate({
				right:0
			},500,function(){
				ProductsGallery.loadding= false;
			});
			if(this.pos_init[gallery_index] == this.length_images_on_gallery[gallery_index]-1){
				$(".current .right_arrow").addClass("disable");
			}
		}
};




