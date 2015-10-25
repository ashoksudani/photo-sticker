import Ember from 'ember';

export default Ember.Component.extend ({

	localStorageCalc : Ember.inject.service("localStorageCalc"),

	type: null,

  fileInput: null,

  fileInputChanged: Ember.observer("fileInput", function() {
  	this.set('file', this.get('fileInput') && this.get('fileInput').files[0]);
  	this.set('fileName', this.get('file') && this.get('file').name);
  }),

  isValidFileType: Ember.computed("file", function() {
  	var fileType = this.get('file') && this.get('file').type;
  	if(!fileType) {
  		return true;
  	}
  	var imageType = /^image\//;
    return imageType.test(fileType);
  }),
  
  isEnoughSpaceForFile: Ember.computed("file", function() {
  	var file = this.get("file");
  	if(!file) {
  		return true;
  	}
  	if(this.type == 'sticker'){
  		return (file.size*2) < this.get('localStorageCalc').remainingLocalStorageSpace();
  	}else{
			return (file.size*2) < this.get('localStorageCalc').remainingLocalStorageSpaceForPhotoArea();
  	}
  }),

	onUploadFile: Ember.observer("triggerFileUploadAction", function() {
  		this.initUploadFile();
  }),

  click: function(e) {
  	if($(e.target).hasClass("upload-file-btn")) {
  		e.stopPropagation();
    	$(e.target).parent().find(".input-upload-file").click();
    	return false;
  	}
  },

  change: function(e) {
  	this.set('fileInput', e.target);
  	this.notifyPropertyChange('fileInput');
    if(!this.get('uploadFileOnAction')) {
    	this.initUploadFile();
    };
  },

  initUploadFile: function() {
  	var fileInput = this.get('fileInput');
  	if(!fileInput) {
  		return;	
  	}
    this.uploadFile();
    this.resetFile();
  },

  resetFile: function() {
  	$(this.get('fileInput')).val(null);
    this.set('fileName', null);
  },

  uploadFile: function() {
  	var file = this.get("file");
  	if(!this.get('isValidFileType') || !this.get('isEnoughSpaceForFile')) {
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
    	stickers.push({"url" : imageURL, "id" : stickers.length+1, "title" : this.get('title')});
    	store.set("stickers", stickers);
    	this.set('stickers', stickers);
    	this.sendAction();
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