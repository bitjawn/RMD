function capitalizeFirstCharacter(word) {
	var word_split = null,
		line = "";
	if (word.trim().toLowerCase() === 'id' ||
		word.trim().toLowerCase() === 'ssn' ||
		word.trim().toLowerCase() === 'sku' ||
		word.trim().toLowerCase() === 'vm' ||
		word.trim().toLowerCase() === 'mac' ||
		word.trim().toLowerCase() === 'imei' ||
		word.trim().toLowerCase() === 'os' ||
		word.trim().toLowerCase() === 'atm' ||
		word.trim().toLowerCase() === 'pa') {
		word = word.toUpperCase();
	} else if (word.match(/[-]/)) {
		if (null !== (word_split = word.split(['-'])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + '-';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else if (word.match(/[ ]/)) {
		if (null !== (word_split = word.split([' '])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + ' ';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else {
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}
	return word;
}

function cfc(word) {
	return capitalizeFirstCharacter(word);
}

function cap(str) { return str.substring(0,1).toUpperCase() + str.substring(1); }

function log(message = '\n') {
	console.log('\n' + message + '\n');
}

function numSuf(num) {
	let index = (num.toString().length - 1);
	let n = num.toString().substring(index);
	switch (n) {		
		case '1':
			return 'st';
			
		case '2':
			return 'nd';
			
		case '3':
			return 'rd';
			
		default:
			return 'th';
	}
}

function size(obj) {
    if (obj instanceof Array) {
        return (obj.length > 0);
    }
    
    if (obj instanceof Object && !(obj instanceof Array)) {
        return (Object.keys(obj).length > 0);
    }
    
    if (typeof(obj) === 'string') {
        return (obj.length > 0);
    }
    
    if (typeof(obj) === 'number') {
        return (obj.toString().length > 0);
    }
    
    return false;
}

function isArray(obj) {
    return (obj instanceof Array);
}

function isObject(obj) {
    return ((obj instanceof Object) && !(obj instanceof Array));
}

function isString(obj) {
    return (typeof(obj) === 'string');
}

function isNumber(obj) {
    return (typeof(obj) === 'number');
}

function clearObject(obj) {
    if (size(obj)) {
        for (var property in obj) {
            delete obj[property];
        }
    }
}

function clearArray(arr) {
    if (size(arr)) {
        for (var i = -2; i < arr.length; i++) {
            arr.splice(i, 1);
        }
    }
}

class Product {
    /* 
        @param String ID
        @param String category
        @param String title
        @param String description
    */
    constructor(strId, strCategory, strTitle, strDescription, strSrc) {
        var errors = {};
        
        if (null == strId || !size(strId) || !isString(strId)) {
            errors['\tString ID'] = ' is required';
        }
        
        if (null == strCategory || !size(strCategory) || !isString(strCategory)) {
            errors['\tString Category'] = ' is required';
        }
        
        if (null == strTitle || !size(strTitle) || !isString(strTitle)) {
            errors['\tString Title'] = ' is required';
        }     
        
        if (null == strDescription || !size(strDescription) || !isString(strDescription)) {
            errors['\tString Description'] = ' is required';
        }
        
        if (null == strSrc || !size(strSrc) || !isString(strSrc)) {
            errors['\tString Product Image Source'] = ' is required';
        }
                
        if (Object.keys(errors).length > 0) {
            var errorMessage = '';
            for (var e in errors) {
                var error = errors[e];
                errorMessage += e + error + '\n';
            }
            log(errorMessage);
            throw new Error(errorMessage);
        }
        
        this.id = strId;
        this.category = strCategory;
        this.title = strTitle;
        this.description = strDescription; 
        this.source = strSrc;
    }
    
    getId() {
        return this.id;
    }
    
    getCategory() {
        return this.category;
    }
    
    getTitle() {
        return this.title;
    }
    
    getDescription() {
       return this.description;
    }
    
    getSource() {
        return this.source;
    }
    
    toString() { return this.title; }
}

let ProductManager = (function(){
	let products = {},
        container = [];
    products['container'] = container;
    
	return function(noun, verb) {
		var errors = {};
        
        if (null === noun || !size(noun)) {
            errors['Object or String'] = ' to work from is required';
        }
        
        if (null === verb || !size(verb)) {
            errors['String'] = ' action to perform is required';
        }
        
        if (Object.keys(errors).length > 0) {
            var errorMessage = '';
            for (var e in errors) {
                var error = errors[e];
                errorMessage += e + error + '\n';
            }
            log(errorMessage);
            throw new Error(errorMessage);
        }
        else {
            
            if (noun === 'all' && verb === 'list') {
                return products['container'];
            }
            
            if ((noun instanceof Product) && verb === 'add') {
                for (var p in products['container']) {
                    var product = products['container'][p];
                    if (noun.getId().trim().toLowerCase() === product.id.trim().toLowerCase() ||
                        noun.getTitle().trim().toLowerCase() === product.title.trim().toLowerCase() ||
                        noun.getDescription().trim().toLowerCase() === product.description.trim().toLowerCase()) {
                            throw new Error('Product already exists');
                        }
                }
                
                var newObject = {
                    id: noun.getId(),
                    category: noun.getCategory(),
                    description: noun.getDescription(),
                    title: noun.getTitle(),
                    source: noun.getSource()
                };
                                
                products['container'].push(newObject);
                return true;
            }

            if ((noun instanceof Product) && verb === 'edit') {
                var eObj = null;
                for (var i = 0; i < products['container'].length; i++) {
                    var product = products['container'][i];
                    if (product.id.toString().trim().toLowerCase() === noun.getId().toString().toLowerCase() ||
                        product.username.trim().toLowerCase() === noun.getTitle().trim().toLowerCase() ||
                        product.email.trim().toLowerCase() === noun.getDescription().trim().toLowerCase()) {
                            eObj = product;
                            break;
                        }
                }
                
                if (null !== eObj) {
                    eObj.id = noun.getId();
                    eObj.category = noun.getCategory();
                    eObj.title = noun.getTitle();
                    eObj.description = noun.getDescription();
                    return true;
                }
                return false;
            }    
            
            if (typeof(noun) === 'string' && verb === 'remove') {
                if (noun === 'all') {
                    for (var i = -2; i < products['container'].length; i++) {
                        products['container'].splice(i,1);
                    }
                }
                else {
                    for (var i = 0; i < products['container'].length; i++) {
                        var product = products['container'][i];
                        if (noun.trim().toLowerCase() === product.id.trim().toLowerCase() ||
                            noun.trim().toLowerCase() === product.title.trim().toLowerCase() ||
                            noun.trim().toLowerCase() === product.description.trim().toLowerCase()) {
                                products['container'].splice(i,1);
                                break;
                            }
                    }
                }
                return products['container'];
            }
            
            if (typeof(noun) === 'string' && verb === 'find') {
                for (var i = 0; i < products['container'].length; i++) {
                    var product = products['container'][i];
                    if (noun.trim().toLowerCase() === product.title.trim().toLowerCase() ||
                        noun.trim().toLowerCase() === product.category.trim().toLowerCase() ||
                        noun.trim().toLowerCase() === product.id.trim().toLowerCase()) {
                            return product;
                        }
                }
                return null;
            }
            
         }
        
        return null;
	}
})();

module.exports = {
    'create':(function(){
        return function(id,ca,ti,de,sr) {
            return new Product(id,ca,ti,de,sr);
        }
    })(),
    'add':(function(){
        return function(id,ca,ti,de,sr) {
            return ProductManager(new Product(id,ca,ti,de,sr), 'add');
        }
    })(),
    'list':(function(){
        return function() {
            return ProductManager('all', 'list');
        }
    })(),
    'find':(function(){
        return function(noun = 'unknown') {
            return ProductManager(noun, 'find');
        }
    })(),
    'edit':(function(){
        return function(noun) {
            return ProductManager(noun,'edit');
        }
    })(),
    'remove':(function(){
        return function(noun = 'all') {
            return ProductManager(noun, 'remove');
        }
    })()
}