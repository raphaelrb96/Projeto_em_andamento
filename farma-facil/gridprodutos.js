var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GradeProdutos = function (_React$Component) {
	_inherits(GradeProdutos, _React$Component);

	function GradeProdutos() {
		_classCallCheck(this, GradeProdutos);

		return _possibleConstructorReturn(this, (GradeProdutos.__proto__ || Object.getPrototypeOf(GradeProdutos)).apply(this, arguments));
	}

	_createClass(GradeProdutos, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" })
				),
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" })
				),
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" })
				),
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" })
				),
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" })
				),
				React.createElement(
					"div",
					{ className: "row justify-content-around" },
					React.createElement(CardItemProduto, { img: "batedeira.jpg" }),
					React.createElement(CardItemProduto, { img: "celular.jpg" }),
					React.createElement(CardItemProduto, { img: "batedeira.jpg" })
				)
			);
		}
	}]);

	return GradeProdutos;
}(React.Component);

var CardItemProduto = function (_React$Component2) {
	_inherits(CardItemProduto, _React$Component2);

	function CardItemProduto() {
		_classCallCheck(this, CardItemProduto);

		return _possibleConstructorReturn(this, (CardItemProduto.__proto__ || Object.getPrototypeOf(CardItemProduto)).apply(this, arguments));
	}

	_createClass(CardItemProduto, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "col-sm" },
				React.createElement(
					"div",
					{ className: "card card-product card-produto" },
					React.createElement(ImagemProduto, { img: this.props.img }),
					React.createElement(DadosItemProduto, null)
				)
			);
		}
	}]);

	return CardItemProduto;
}(React.Component);

var DadosItemProduto = function (_React$Component3) {
	_inherits(DadosItemProduto, _React$Component3);

	function DadosItemProduto() {
		_classCallCheck(this, DadosItemProduto);

		return _possibleConstructorReturn(this, (DadosItemProduto.__proto__ || Object.getPrototypeOf(DadosItemProduto)).apply(this, arguments));
	}

	_createClass(DadosItemProduto, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "card-body" },
				React.createElement(
					"h5",
					{ className: "card-title title text-justify" },
					"Card title"
				),
				React.createElement(
					"p",
					{ className: "card-text" },
					"This card has supporting text below as a natural lead-in to additional content."
				),
				React.createElement(
					"h5",
					{ className: "preco-produto text-success" },
					"R$ 100,00"
				)
			);
		}
	}]);

	return DadosItemProduto;
}(React.Component);

var ImagemProduto = function (_React$Component4) {
	_inherits(ImagemProduto, _React$Component4);

	function ImagemProduto() {
		_classCallCheck(this, ImagemProduto);

		return _possibleConstructorReturn(this, (ImagemProduto.__proto__ || Object.getPrototypeOf(ImagemProduto)).apply(this, arguments));
	}

	_createClass(ImagemProduto, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "card-img-top container-produto-img" },
				React.createElement("img", { className: "produto-img", src: this.props.img })
			);
		}
	}]);

	return ImagemProduto;
}(React.Component);

var element = React.createElement(GradeProdutos, null);

ReactDOM.render(element, document.getElementById('root'));