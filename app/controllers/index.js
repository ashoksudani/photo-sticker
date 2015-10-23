import Ember from 'ember';

export default Ember.Controller.extend({
	
	startOver: Ember.on("init", Ember.computed('model.photoURL', 'model.stickers',  function() {	
		return (this.get('model.stickers') && this.get('model.stickers').length) || this.get('model.photoURL');
	})),

	usedLocalStorageSpaceInPercenTage : Ember.computed('usedLocalStorageSpace', function() {
		return ((5 * (1024 * 1024)) * 100) / this.get('usedLocalStorageSpace');
	}),

	usedLocalStorageSpace: Ember.on("init", Ember.computed('model.photoURL', 'model.stickers', function() {
    var totalStorage = 0;
    for (var item in localStorage) {
        var itemStorage = (localStorage[item].length * 2);
        totalStorage += itemStorage;
    }
    return (5 * (1024 * 1024)) - totalStorage ;
	})),

	actions: {
		startOver: function() {
			if(window.confirm("are you sure to start over?")) {
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