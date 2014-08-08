//function getParameterByName(name) {
//    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//        results = regex.exec(location.search);
//    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//}
/*
 * a set of functions, each validates a very specific data type;
 * for convenience, the name of the function attribute is the same 
 * as the CSS class that represent it on the DOM; 
 */

/**
 * The form validator class;
 * Public:
 *    .validate(Form)
 */
////var FormValidator = function() {  };
////FormValidator.prototype =
GT.FormValidator  = GT.createClass({

	PREFIX_PROJECT: "gt-",
	
	init: function() {
		this._setProjectPrefix(this.validationFunctions);
	},

	/**
	 * set prefix to objects when constractor call
	 */
	_setProjectPrefix : function(objects){
		if(objects && this.PREFIX_PROJECT){
			for(prop in objects){
				objects[this.PREFIX_PROJECT + prop] = objects[prop];
				delete objects[prop];
			};
		};
	},

    //return an array of all the inputs and their errors
    // e.g. item in the array:  {element: theDomInput, error: "theErrorCodeOrMessage"}
    // if the array is empty it means that no errors occured

    
    /*============================================================
     *
     * PUBLIC FUNCTIONS
     *
    ============================================================*/
	/**
	 * A public validation form;
	 * To be used by other objects for validating forms on demand;
	 */
    validate: function(formToValidate) {
	    /*
	     * If the form passed to the function is null then
	     * the return value should also be null, to indicate
	     * inappropriate value;
	     */
        if (!formToValidate)
            return null;

	    return this._validate(formToValidate); 
    },
    
   isValid: function(formToValidate) {
	    /*
	     * If the form passed to the function is null then
	     * the return value should also be null, to indicate
	     * inapropriate value;
	     */
        if (!formToValidate){
        	return null;
        }

	    return this._isValid(formToValidate); 
   },
   
   getArrErrors:function(formToValidate){
	   return this._validate(formToValidate, false);
   },
   
   bindForms: function() {
	   $(document).on(
			   "submit", //the event to capture 
			   ".gt-validate",  //the child elements to capture on
			   $.proxy(this._validateOnFormSubmit, this));
	   
	   $(document).on(
			   "reset", //the event to capture 
			   ".gt-validate",  //the child elements to capture on
			   function(){$(".error").removeClass("error");});
   },
   
    /*============================================================
     *
     * FUNCTIONS FOR INTERNAL USAGE
     *
    ============================================================*/
   
   /**
    * return true if tagname of elem is FORM
    * @param formToValidate
    * @returns {Boolean}
    */
   _isValidFormElem: function(formToValidate){
	   return formToValidate.tagName.toLowerCase() == "form";
   },
   
   /**
    * return true if no error found
    * @param formToValidate
    * @returns {Boolean}
    */
   	_isValid: function(formToValidate) {
	    return this._validate(formToValidate, true).length === 0;
    },
    
    _validate: function(formToValidate, failOnFirstError) {
    	if(!this._isValidFormElem(formToValidate)){
    		return null;
    	}
    	
        var errors = [], //create an array to contain all found errors
        	$form = $(formToValidate),  //wrap the form with a JQuery object, for convenience
        	//get all the fields that require validation
        	filedsToValidate =  this._getFieldsToValidate($form),
        	fieldsLength = filedsToValidate.length,
        	field,
        	i,v, 
        	singleValidationName,
        	validationList,
        	validationError,validationFunction,validationListLength;
       /*
        * Iterate through all the fields that require
        * validation, and validate them.
        */ 	
    	for(i = 0; i < fieldsLength; i++) {
			field = filedsToValidate[i];
			validationList = this._getFieldValidationList(field);
			validationListLength = validationList.length;
			
			/*
			 * Iterate through all validations of each field
			 * and invoke the relevant validation function;
			 */
			 
			for(v = 0; v < validationListLength; v++){
				singleValidationName = validationList[v];
				validationFunction = this.validationFunctions[singleValidationName];
				if(typeof validationFunction === "function"){
					//if (validationError = validationFunction(field,this)){
					if (validationError = validationFunction.call(this,field)){
						errors.push({
							field: field,
							errorCode: validationError
						});

						if(failOnFirstError){
							return errors;
						}
					}
				}
			};
			
    	};
    	return errors;
    },
    
    /**
     * @param filed
     * @returns
     */
	_getFieldValidationList: function(filed){
		return filed.className.split(" ");
	},

    /**
     * Create a CSS selector that should match
     * all the fields that require validation; 
     */
    _getFieldsToValidate: function($form) {
		return $form.find(this._getFieldsToValidateSelector());
    },

    /**
     * Create a CSS selector that should match
     * all the fields that require validation; 
     */
	_getFieldsToValidateSelector: function() {

        var selector = "",
        	first = true,
        	key;
    
        for (key in this.validationFunctions) {
            if (!first)
                selector += ",";

            first = false;
            selector += " .";
            selector += key;
        }
        
        return selector;
	},
	
	_setErrorsMessage: function(ArrErrors,event,failOnFirstError){
		this._resetErrorMessages();
		//_getErrorMsgFieldAndDomElem נכונה לשאול את יובל אם הפונקציה 
		
		ArrErrors[0].field.focus();
		if($("#"+ArrErrors[0]['field'].id+"_chosen").length!=0){
			$("#"+ArrErrors[0]['field'].id+"_chosen span").trigger("mousedown.chosen");
		}
		
		if(!failOnFirstError){
			for(obj in ArrErrors){
				if(ArrErrors[obj]['field'] && this.errorsMap[ArrErrors[obj]['errorCode']]){
					
					var domElem = document.getElementById(ArrErrors[obj]['field'].id+"-error-msg"),
						msg = this.errorsMap[ArrErrors[obj]['errorCode']];
					
					$(ArrErrors[obj]['field']).addClass("error").on("focus",function(){
						$(this).removeClass("error");
					});
					
					if(domElem){
						console.log("dom2");
						(domElem.innerText = msg) || (domElem.textContent = msg);
					}
				}
			}
		}else{
			var domElem = document.getElementById(event.target.id+"-error-msg"),
				msg = this.errorsMap[ArrErrors[0]['errorCode']];
			
			if(domElem){
				(domElem.innerText = msg) || (domElem.textContent = msg);
			}			
			
		}
		
	},
	
	/**
	 * @param id
	 * @param index
	 * @returns {field:DOMelem,msg:errorMsg}
	 */
	_getErrorMsgFieldAndDomElem : function (id,msgIndex){
		if(!id && !msgIndex){
			return null;
		}
		
		var domElem = document.getElementById(id),
			msg = this.errorsMap[msgIndex];
		
		if(!domElem || !msg){
			return null;
		}
		
		return {
			field:domElem,
			msg: msg
		};
	},
	
	_toShowPersonalMessage: function(form){
		return $(form).hasClass("presonal-msg");
	},

    _sendAjax: function(form){
       var inputs = $(form).find("input,textarea,select"),
           dataToServer = {},
           url = form.action,
           method = form.method;
        for(i=0; i<inputs.length; i++){
            val = inputs[i].value;
            name = inputs[i].name;
            if(name!=""){
                dataToServer[name] = val;
            }
        }
        if(TaskHelper){
            dataToServer.token = TaskHelper.token;
        }

        this.callbackOnSuccess = function(response){console.log(response,"callbackOnSuccess");};
        this.callbackOnError = function(response){console.log(arguments,"callbackOnError");};
        
        var formId = form.getAttribute("id");
        if(formsCallbackMap[formId] && typeof formsCallbackMap[formId].onSuccess === "function"){
        	this.callbackOnSuccess = formsCallbackMap[formId].onSuccess;
        }
        
        if(formsCallbackMap[formId] && typeof formsCallbackMap[formId].onError === "function"){
        	this.callbackOnError = formsCallbackMap[formId].onError;
        }
        
        $.ajax({
            url:url,
            data:dataToServer,
            method:method,
            success:this.callbackOnSuccess,
            error: this.callbackOnError
        });

    },

	/**
	 * Invoked when a form that requires validation
	 * is submitted; (on form.submit event)
	 */
    _validateOnFormSubmit: function(e) {
    	var event = e || window.event,
    		form =  event.target || event.srcElement,
    		failOnFirstError = this._toShowPersonalMessage(form),
    		errors;
    		try{
    			errors = this._validate(form,false);
    		}catch(e){
    			console.log("Error: "+e.message);
    			return false;
    		}
    		
    	$(".error").removeClass("error");
    	if(errors && errors.length){
    		this._setErrorsMessage(errors,event,false);
    	}

        if(errors.length ==0){
            this._sendAjax(form);
        }

    	return false;
    	return (!errors || !errors.length);
	},
	
	_resetErrorMessages: function(){
		$(".error-msg").text("");
	}
	
});

GT.StandardFormValidator = GT.FormValidator.extend(GT.ValidationFunctions);


