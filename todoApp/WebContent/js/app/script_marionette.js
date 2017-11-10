(function(){

	var Product = Backbone.Model.extend({
			defaults: {
				name: 'Please enter a name',
				price: 0
			}
	});

	var model = new Product();

	var ProductView = Backbone.View.extend({
		model: model,
		_modelDataBind: undefined,
		initialize: function(){
			_.bindAll(this, 'render');
			this._modelDataBind = new Backbone.ModelBinder();
			this.render();
		},
		render: function(){
			var template = _.template($('#productApp').html());
			this.$el.html(template);
			var bindings = {
					name: '#txtName',
					price: '#txtPrice'
			};
			var changeTriggers = {
					'changeTriggers': {
						'': 'keyup',
						'[contenteditable]': 'keyup'
					}
			};
			this._modelDataBind.bind(this.model, this.$el, bindings, changeTriggers);
		}
	});

	var ListingView = Backbone.View.extend({
		initialize: function(options){
			_.bindAll(this, 'render');
			this.title = options.title || 'Listing'
			this.render();
		},
		render: function(){
			var self = this;
			var template = _.template($('#listingApp').html());
			this.$el.html(template({
				title: self.title
			}));
		}
	});

	var MainApp = Marionette.View.extend({
		regions: {
			'product': '#product',
			'listing': '#listing'
		},
		initialize: function(){
			debugger;
			_.bindAll(this, 'onRender');
			this.triggerMethod('showView');
		},
		onShowView: function(){
			this.triggerMethod('render');
		},
		onRender: function(){
			var productView = new ProductView();
			var listingView = new ListingView({title: 'ProductListing'});
			this.showChildView('product', productView);
			this.showChildView('listing', listingView);
		},
		events: {
			'click #btnAdd': 'addProduct',
			'click #btnReset': 'Reset',
			'keyup #txtPrice': 'addProductByKey'
		},
		addProductByKey: function(e){
			if(e.keyCode === 13){
				this.addProduct();
			}
			else if(e.keyCode === 27){
				this.Reset();
			}
		},
		addProduct: function(){
			var item = '<li>' + model.get('name') + ' $' + model.get('price') + '</li>';
			this.$el.find('#productListing').append(item);
			this.Reset();
		},
		Reset: function(){
			$('input[type=text]').each(function(index, value){
				$(value).val('');
			});
			$('input[type=text]').eq(0).focus();
		}
	});

	var app = new MainApp({
		el: '#container'
	})

})();