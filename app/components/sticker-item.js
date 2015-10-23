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
	}
	
});