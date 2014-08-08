
formsCallbackMap = {
		loginForm:{
			onSuccess:function(response){
				$(".error").removeClass("error");
				if(typeof response.error !== "undefined"){
					for(key in response.error){
						$("#"+key).addClass("error");
					}
					if(response.error == "invalid username / password"){
						$("#error-msg").text(response.error);
					}
					return;
				}
				window.location = window.location.href;
			},
			onError:function(respose){
                console.log(respose);
			}
		},

        addForm:{
            onSuccess:function(response){
                if(response.token){
                    $('input.token').val(response.token);
                }
                $(".error").removeClass("error");
                if(typeof response.error !== "undefined"){
                    for(key in response.error){
                        $("#"+key).addClass("error");
                        $("#"+key+"+.chosen-container-single").addClass("error");
                    }
                    return;
                }

                $("html, body").animate(
                    { scrollTop: "0px" },
                    500,
                    function(){
                        $("#success-msg").fadeIn();
                        setTimeout(function(){
                            $("#success-msg").fadeOut();
                        },2500);

                        $(':input','form')
                            .not(':button, :submit, :reset, :hidden')
                            .val('')
                            .removeAttr('checked')
                            .removeAttr('selected');
                    });
            },

            onError:function(respose){
                console.log(respose);
            }
        },

    updateForm:{
        onSuccess:function(response){
            if(response.token){
                $('input.token').val(response.token);
            }

            $(".error").removeClass("error");
            if(typeof response.error !== "undefined"){
                for(key in response.error){
                    $("#"+key).addClass("error");
                    $("#"+key+"+.chosen-container-single").addClass("error");
                }
            }
        },

        onError:function(respose){
            console.log(respose);
        }
    },

    deleteForm:{
        onSuccess:function(response){
            if(response.token){
                $('input.token').val(response.token);
            }

            if(response.success){
                $("tr[data-id="+delete_lesson_id+"]").remove();
            }
        },

        onError:function(respose){
            console.log(respose);
        }
    },

    loginForm:{
        onSuccess:function(response){
            if(response.token){
                $('input.token').val(response.token);
            }

            $(".error").removeClass("error");
            if(typeof response.error !== "undefined"){
                for(key in response.error){
                    $("#"+key).addClass("error");
                }
                if(response.error == "invalid username / password"){
                    $("#error-msg").text(response.error);
                }
                return;
            }
            window.location = window.location.href;
        },

        onError:function(respose){
            console.log(respose);
        }
    }
};