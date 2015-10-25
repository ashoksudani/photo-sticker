import Ember from 'ember';

export default Ember.Service.extend({

	remainingLocalStorageSpaceInPercenTage : function() {
		return ((100 * this.remainingLocalStorageSpace())/(5 * 1024 * 1024)).toFixed(2);
	},

	remainingLocalStorageSpaceInMB: function() {
		return (this.remainingLocalStorageSpace()/(1024 * 1024)).toFixed(2);
	},

	remainingLocalStorageSpaceForPhotoArea: function() {
		var photoStorage = (localStorage["photoURL"] && localStorage["photoURL"].length * 2) || 0;	
		return this.remainingLocalStorageSpace() - photoStorage;	
	},

	remainingLocalStorageSpace: function() {
    var totalStorage = 0;
    for (var item in localStorage) {
        var itemStorage = (localStorage[item].length * 2);
        totalStorage += itemStorage;
    }
    return ((5 * (1024 * 1024)) - totalStorage);
	}
	
});