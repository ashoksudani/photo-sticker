import Ember from 'ember';

export default Ember.Component.extend ({
	draggable: "true",

	dragStart: function(e) {
			var self = this;
			var dataTransfer = e.dataTransfer;
			$(e.target).addClass("drag-start");
			dataTransfer.setData("stickerId", self.get('id'));
	},

	dragEnd: function(e) {
		$(e.target).removeClass("drag-start");
	},

	actions: {
		deleteSticker: function() {
			this.removeSelfFromStickers();
			this.removeSelfFromDroppedStickers();
		}
	},

	removeSelfFromStickers: function() {
			var self= this;
			var id = self.get('id');
			var stickers = this.get('stickers');
			if(stickers && stickers.length) {
				var filteredStickers = stickers.filter(function(item) {
						return item.id != id;
				});
				this.set('stickers', filteredStickers);
				store.set('stickers', filteredStickers);
		}
	},
	
	removeSelfFromDroppedStickers: function() {
			var self= this;
			var id = self.get('id');
			var droppedStickers = this.get('droppedStickers');
			if(droppedStickers && droppedStickers.length) {			
				var filteredDroppedStickers = droppedStickers.filter(function(item) {
						return item.id != id;
				});
				this.set('droppedStickers', filteredDroppedStickers);
				store.set('droppedStickers', filteredDroppedStickers);
			}
	}

});