import Ember from 'ember';

export default Ember.Route.extend({
	
		model: function() {
    	return {
      	'photoURL': store.get('photoURL'),
  			'stickers': store.get('stickers') || [],
  			'droppedStickers': store.get('droppedStickers') || []
    	};
  	}


});