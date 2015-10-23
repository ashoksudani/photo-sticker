import Ember from "ember";

export default Ember.Component.extend({

	dragOver: function(e) {
		e.preventDefault();
	},

	dragEnter: function(e) {
		if(!this.isTargetDropArea(e.target)){
			return;
		} 
		$(e.target).addClass("drag-over");
		
	},

	dragLeave: function(e) {
		if(!this.isTargetDropArea(e.target)) {
			return;
		}
		$(e.target).removeClass("drag-over");
	},

	drop: function(e) {
		if(!this.isTargetDropArea(e.target)) {
			return;
		}

		$(e.target).removeClass("drag-over");

		if(!this.isValidDraggedElement(e)) {
			return;
		}
		
		var stickerId = e.dataTransfer.getData("stickerId");
		this.storeDroppedElement(e, stickerId);
		e.preventDefault();
	},

	assignStickerURLs: Ember.observer('droppedStickers', function() {
		var stickers = store.get('stickers');
		this.get('droppedStickers').forEach(function(item) {
				item.url = stickers.findBy("id", item.id).url;
		});
	}),
	
	storeDroppedElement: function(e, stickerId) {
		var sticker = this.get('stickers').findBy("id", Number(stickerId));
		if(sticker) {
			var coords = this.getStickerDropCoordinates(e);
			this.updateDroppedStickers(coords, sticker);
		}
	},

	updateDroppedStickers: function(coords, sticker) {
		var droppedStickers = store.get('droppedStickers') || [];
		droppedStickers.push({id: sticker.id, posx: coords.x, posy: coords.y});
		this.set('droppedStickers', droppedStickers);
		store.set('droppedStickers', droppedStickers);
	},

	getStickerDropCoordinates: function(e) {
		var offset = $(e.target).offset();
		var relativeOffsetX = e.originalEvent.pageX - offset.left;
		var relativeOffsetY = e.originalEvent.pageY - offset.top;
		return { x: relativeOffsetX, y: relativeOffsetY }
	},

	isTargetDropArea: function(target) {
		return $(target).hasClass("photo");
	},

	isValidDraggedElement: function(e) {
		var data = e.dataTransfer.getData("stickerId");
		return parseInt(data);
	}

});
