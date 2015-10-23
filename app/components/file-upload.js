import Ember from 'ember';

export default Ember.Component.extend ({

	type: null,

  isValidFileType: true,

  isEnoughSpace: true,

  click: function(e) {
  	if($(e.target).hasClass("upload-file-btn")) {
  		e.stopPropagation();
    	$(e.target).parent().find(".input-upload-file").click();
    	return false;
  	}
  },

  change: function(e) {
  	var self = this;
    var fileInput = e.target;
    var file = fileInput.files[0]; 
    $(fileInput).val(null);
    this.validateFileType(file);
    this.isEnoughSpaceForFile(file);
    this.uploadImage(file);
  },

  validateFileType : function (file) {
		var imageType = /^image\//;
    this.set('isValidFileType', imageType.test(file.type));
  },

  isEnoughSpaceForFile: function(file) {
  	this.get('targetObject')
  },

  uploadImage: function(file) {
  	if(!this.get('isValidFileType')) {
  		return;
  	}
  	var self = this;
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var imageURL = reader.result;
        if(self.type == 'sticker') {
        	self.storeStickers(imageURL);
        }else{
        	self.storePhoto(imageURL);
        }
      }
      reader.readAsDataURL(file);
    }
  },

  storeStickers: function(imageURL) {
  	try {
  		var stickers = store.get('stickers') || [];
    	stickers.push({"url" : imageURL, "id" : stickers.length+1});
    	store.set("stickers", stickers);
    	this.set('stickers', stickers);
  	}catch(e) {
  		console.error(e);
  	}
  	
  },

  storePhoto: function(imageURL) {
  	try{
  		store.set("photoURL", imageURL);	
    	this.set("photoURL", imageURL);
    }catch(e) {
  		console.error(e);
  	}
  }
});