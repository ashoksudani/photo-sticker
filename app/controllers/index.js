import Ember from 'ember';

export default Ember.Controller.extend({
	
	localStorageCalc : Ember.inject.service("localStorageCalc"),

	startOver: Ember.on("init", Ember.computed('model.photoURL', 'model.stickers',  function() {	
		return (this.get('model.stickers') && this.get('model.stickers').length) || this.get('model.photoURL');
	})),

	remainingLocalStorageSpaceInPercenTage : Ember.on("init", Ember.computed('model.photoURL', 'model.stickers', function() {
		return this.get('localStorageCalc').remainingLocalStorageSpaceInPercenTage();
	})),

	remainingLocalStorageSpaceInMB  : Ember.on("init", Ember.computed('model.photoURL', 'model.stickers', function() {
		return this.get('localStorageCalc').remainingLocalStorageSpaceInMB();
	})),

	actions: {
		startOver: function() {
			if(window.confirm("Are you sure to start over? it will clear all images!")) {
				this.clearStore();
				this.set('model.photoURL', null);
				this.set('model.stickers', []);
				this.set('model.droppedStickers', []);
			}
		}
	},

	clearStore: function() {
		store.clear();
	}

});