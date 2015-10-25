import Ember from 'ember';

export default Ember.Component.extend ({
	title: null,
	fileName: null,
	triggerFileUploadAction: false,

	isFormInValid: Ember.on("init", Ember.computed("title", "fileName", function() {
		if(this.get('title') && this.get('fileName')) {
			return false;
		}
		return true;
	})),

	actions: {
		save: function() {
			if(!this.get('isFormInValid')) {
				this.toggleProperty('triggerFileUploadAction');
			}
		},
		closeAndResetForm: function() {
			$('#sticker-upload-form .close').click();
			this.set('title', null);
			this.set('fileName', null);
		}
	}

});