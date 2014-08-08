GT.ValidationFunctions = {
	errorsMap: {
        defaultMsg: "אירעה שגיאה אנא נסה מאוחר יותר.",
        positiveInteger: "מספר לא חוקי",
        mail: "כתובת מייל לא  חוקית",
        numeric: "לא מספר",
        string: "לא טקטס",
        min:"חובה מינימום %s תוויים"
	},
	validationFunctions : {
        "min": function(element){
            var min = $(element).data("min");
            if(typeof min === "undefined"){
                throw new Error("Element "+$(element).attr("id")+" have not min data");
            }
            if(element.value >= min){
                return false;
            }
                return "min";
        },

        "positiveInteger": function(element) {
            return "positiveInteger"; //no error
        },

        "numeric": function(element) {
            return this.regEx.numeric.test(element.value) ? false : "numeric"; //error code
        },

        "mail": function(element) {
            return this.regEx.numeric.test(element.value) ? false : "mail"; //error code
        },

        "string": function(element) {
            return this.regEx.string.test(element.value) ? false : "string"; //error code
        },

        "israeliId": function(element,context){
            if(isNaN(value))
                return false;
            var num = value.toString();
            if(num.length>9 || num.length<2)
                return false;
            var sum = 0;
            var pos = 9-num.length;
            for(var i = pos; i<8; i++){
                var value = parseInt(num[i-pos])*((i%2)+1);
                sum+=(value%10 + Math.floor(value/10));
            }

            return parseInt(num[8-pos])==(10-sum%10);

        }
	},
	regEx : {
	        string:/^[א-תA-Za-z0-9 \w\-\s_\/\\.\d]+$/,
			PHONE_PREFIX_PATTERN: "0(5[0,2,3,4,7,8,9,5]|7[2,3,4,6,7,8]|[2,3,4,8,9])",
			url: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/i,
			md5: /^[a-f0-9]{32}$/i,
			color: /^[a-f0-9]{6}$/i,
			dateTime: /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/,
			flot: /^\d*\.?\d+$/,
			numeric: /^\d+$/,
			zipCode: /^[\d]{5}$/,
			fullName: /^\s*[a-zא-ת][a-zא-ת\'\"]*\s+[a-zא-ת][a-zא-ת\'\"]*([\s\-]+[a-zא-ת][a-zא-ת\'\"]*)*\s*$/gi,
			name: /^\s*[a-zא-ת]+([\-\s][a-zא-ת]+)*\s*$/gi,
			phonePrefix: new RegExp("^"+this.PHONE_PREFIX_PATTERN+"$"),
			phone: /^[2-9]\d{6}$/,
			fullPhone: new RegExp('^'+this.PHONE_PREFIX_PATTERN+'[2-9]\\d{6}$'),
			email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
	}	
};
