var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var erro = function erro(error) {
	if (error === null || error === undefined) {
		error = 'Erro';
	}
	alert(error);
};

var elementoNavBottom = void 0;

var MeuProgressBar = function (_React$Component) {
	_inherits(MeuProgressBar, _React$Component);

	function MeuProgressBar() {
		_classCallCheck(this, MeuProgressBar);

		return _possibleConstructorReturn(this, (MeuProgressBar.__proto__ || Object.getPrototypeOf(MeuProgressBar)).apply(this, arguments));
	}

	_createClass(MeuProgressBar, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "progress meu-progress-bar" },
				React.createElement("div", { className: "loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success", role: "progressbar", "aria-valuenow": "75", "aria-valuemin": "0", "aria-valuemax": "100" })
			);
		}
	}]);

	return MeuProgressBar;
}(React.Component);

var BotaoFazerLogin = function (_React$Component2) {
	_inherits(BotaoFazerLogin, _React$Component2);

	function BotaoFazerLogin(props) {
		_classCallCheck(this, BotaoFazerLogin);

		var _this2 = _possibleConstructorReturn(this, (BotaoFazerLogin.__proto__ || Object.getPrototypeOf(BotaoFazerLogin)).call(this, props));

		_this2.abriLogin = _this2.abriLogin.bind(_this2);
		return _this2;
	}

	_createClass(BotaoFazerLogin, [{
		key: "abriLogin",
		value: function abriLogin() {
			window.location.assign('login.html');
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"button",
				{ onClick: this.abriLogin, type: "button", className: "btn btn-danger" },
				React.createElement(
					"div",
					{ className: "font-weight-bold text-white" },
					"Login/Cadastro"
				)
			);
		}
	}]);

	return BotaoFazerLogin;
}(React.Component);

var SubMenuNavbottom = function (_React$Component3) {
	_inherits(SubMenuNavbottom, _React$Component3);

	function SubMenuNavbottom() {
		_classCallCheck(this, SubMenuNavbottom);

		return _possibleConstructorReturn(this, (SubMenuNavbottom.__proto__ || Object.getPrototypeOf(SubMenuNavbottom)).apply(this, arguments));
	}

	_createClass(SubMenuNavbottom, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarCollapse", "aria-controls": "navbarCollapse", "aria-expanded": "true", "aria-label": "Toggle navigation" },
					React.createElement("span", { className: "navbar-toggler-icon" })
				),
				React.createElement(
					"div",
					{ className: "navbar-collapse collapse show", id: "navbarCollapse" },
					React.createElement(
						"ul",
						{ className: "navbar-nav mr-auto" },
						React.createElement(
							"li",
							{ className: "nav-item active" },
							React.createElement(
								"a",
								{ className: "nav-link", href: "#" },
								React.createElement(
									"font",
									{ className: "vertical-alinhamento" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										"WhatssApp:"
									)
								),
								React.createElement(
									"span",
									{ "class": "sr-only" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										React.createElement(
											"font",
											{ className: "vertical-alinhamento" },
											"(atual)"
										)
									)
								)
							)
						),
						React.createElement(
							"li",
							{ className: "nav-item dropup show" },
							React.createElement(
								"a",
								{ className: "nav-link", href: "#" },
								React.createElement(
									"font",
									{ className: "vertical-alinhamento" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										"(92) 992037915"
									)
								),
								React.createElement(
									"span",
									{ "class": "sr-only" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										React.createElement(
											"font",
											{ className: "vertical-alinhamento" },
											"(atual)"
										)
									)
								)
							)
						)
					),
					React.createElement(MeuSearchInput, null)
				)
			);
		}
	}]);

	return SubMenuNavbottom;
}(React.Component);

var BotaoAbrirCarrinho = function (_React$Component4) {
	_inherits(BotaoAbrirCarrinho, _React$Component4);

	function BotaoAbrirCarrinho() {
		_classCallCheck(this, BotaoAbrirCarrinho);

		return _possibleConstructorReturn(this, (BotaoAbrirCarrinho.__proto__ || Object.getPrototypeOf(BotaoAbrirCarrinho)).apply(this, arguments));
	}

	_createClass(BotaoAbrirCarrinho, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"button",
				{ type: "button", "class": "btn btn-success" },
				React.createElement(
					"div",
					{ className: "font-weight-bold text-white" },
					"Carrinho/Compras"
				)
			);
		}
	}]);

	return BotaoAbrirCarrinho;
}(React.Component);

var BannerTopo = function (_React$Component5) {
	_inherits(BannerTopo, _React$Component5);

	function BannerTopo() {
		_classCallCheck(this, BannerTopo);

		return _possibleConstructorReturn(this, (BannerTopo.__proto__ || Object.getPrototypeOf(BannerTopo)).apply(this, arguments));
	}

	_createClass(BannerTopo, [{
		key: "render",
		value: function render() {
			return React.createElement("img", { className: "rendimensionar", src: "baner2.jpg" });
		}
	}]);

	return BannerTopo;
}(React.Component);

var MeuSearchInput = function (_React$Component6) {
	_inherits(MeuSearchInput, _React$Component6);

	function MeuSearchInput() {
		_classCallCheck(this, MeuSearchInput);

		return _possibleConstructorReturn(this, (MeuSearchInput.__proto__ || Object.getPrototypeOf(MeuSearchInput)).apply(this, arguments));
	}

	_createClass(MeuSearchInput, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"form",
				{ className: "form-inline mt-2 mt-md-0" },
				React.createElement("input", { className: "form-control mr-sm-2", type: "text", placeholder: "Pesquisar produto", "aria-label": "Pesquisar produto" }),
				React.createElement(
					"button",
					{ className: "btn btn-outline-light my-2 my-sm-0", type: "submit" },
					React.createElement(
						"font",
						{ className: "vertical-alinhamento" },
						React.createElement(
							"font",
							{ className: "vertical-alinhamento" },
							"Procurar"
						)
					)
				)
			);
		}
	}]);

	return MeuSearchInput;
}(React.Component);

var NavbarInferior = function (_React$Component7) {
	_inherits(NavbarInferior, _React$Component7);

	function NavbarInferior(props) {
		_classCallCheck(this, NavbarInferior);

		var _this7 = _possibleConstructorReturn(this, (NavbarInferior.__proto__ || Object.getPrototypeOf(NavbarInferior)).call(this, props));

		if (_this7.props.anonimo) {
			elementoNavBottom = React.createElement(BotaoFazerLogin, null);
		} else {
			elementoNavBottom = React.createElement(BotaoAbrirCarrinho, null);
		}
		return _this7;
	}

	_createClass(NavbarInferior, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"nav",
				{ className: "navbar fixed-bottom navbar-expand-sm navbar-dark p-3 mb-2 bg-secondary text-white sem-margim-bottom" },
				React.createElement(
					"a",
					{ className: "navbar-brand", href: "#" },
					elementoNavBottom
				),
				React.createElement(
					"button",
					{ className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarCollapse", "aria-controls": "navbarCollapse", "aria-expanded": "true", "aria-label": "Toggle navigation" },
					React.createElement("span", { className: "navbar-toggler-icon" })
				),
				React.createElement(
					"div",
					{ className: "navbar-collapse collapse show", id: "navbarCollapse" },
					React.createElement(
						"ul",
						{ className: "navbar-nav mr-auto" },
						React.createElement(
							"li",
							{ className: "nav-item active" },
							React.createElement(
								"a",
								{ className: "nav-link", href: "#" },
								React.createElement(
									"font",
									{ className: "vertical-alinhamento" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										"WhatssApp:"
									)
								),
								React.createElement(
									"span",
									{ "class": "sr-only" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										React.createElement(
											"font",
											{ className: "vertical-alinhamento" },
											"(atual)"
										)
									)
								)
							)
						),
						React.createElement(
							"li",
							{ className: "nav-item dropup show" },
							React.createElement(
								"a",
								{ className: "nav-link", href: "#" },
								React.createElement(
									"font",
									{ className: "vertical-alinhamento" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										"(92) 992037915"
									)
								),
								React.createElement(
									"span",
									{ "class": "sr-only" },
									React.createElement(
										"font",
										{ className: "vertical-alinhamento" },
										React.createElement(
											"font",
											{ className: "vertical-alinhamento" },
											"(atual)"
										)
									)
								)
							)
						)
					),
					React.createElement(MeuSearchInput, null)
				)
			);
		}
	}]);

	return NavbarInferior;
}(React.Component);

var LinhaGrade = function (_React$Component8) {
	_inherits(LinhaGrade, _React$Component8);

	function LinhaGrade() {
		_classCallCheck(this, LinhaGrade);

		return _possibleConstructorReturn(this, (LinhaGrade.__proto__ || Object.getPrototypeOf(LinhaGrade)).apply(this, arguments));
	}

	_createClass(LinhaGrade, [{
		key: "render",
		value: function render() {

			var doc = this.props.doc;

			return React.createElement(
				"div",
				{ className: "row justify-content-around" },
				React.createElement(CardItemProduto, { img: doc[0].get('imgCapa'), key: doc[0].get('idProduto'), name: doc[0].get('prodName'), valor: doc[0].get('prodValor'), descr: doc[0].get('descr') }),
				React.createElement(CardItemProduto, { img: doc[1].get('imgCapa'), key: doc[1].get('idProduto'), name: doc[1].get('prodName'), valor: doc[1].get('prodValor'), descr: doc[1].get('descr') }),
				React.createElement(CardItemProduto, { img: doc[2].get('imgCapa'), key: doc[2].get('idProduto'), name: doc[2].get('prodName'), valor: doc[2].get('prodValor'), descr: doc[2].get('descr') }),
				React.createElement(CardItemProduto, { img: doc[3].get('imgCapa'), key: doc[3].get('idProduto'), name: doc[3].get('prodName'), valor: doc[3].get('prodValor'), descr: doc[3].get('descr') })
			);
		}
	}]);

	return LinhaGrade;
}(React.Component);

var GradeProdutos = function (_React$Component9) {
	_inherits(GradeProdutos, _React$Component9);

	function GradeProdutos() {
		_classCallCheck(this, GradeProdutos);

		return _possibleConstructorReturn(this, (GradeProdutos.__proto__ || Object.getPrototypeOf(GradeProdutos)).apply(this, arguments));
	}

	_createClass(GradeProdutos, [{
		key: "render",
		value: function render() {

			var size = this.props.size;
			var lista = this.props.lista;

			var listaLinha = Array();

			var itensListaLinha = 0;

			var listaFormatada = Array();
			var numeroLinhas = 0;

			lista.forEach(function (item) {
				if (itensListaLinha === 4) {
					numeroLinhas++;
					itensListaLinha = 0;
					listaFormatada.push(listaLinha);
					listaLinha = Array();
					console.log(listaLinha);
				} else {
					listaLinha.push(item);
					itensListaLinha++;
				}
			});

			var elemento = listaFormatada.map(function (docs) {
				return React.createElement(
					"div",
					null,
					React.createElement(LinhaGrade, { doc: docs })
				);
			});

			return React.createElement(
				"div",
				{ className: "container" },
				elemento
			);
		}
	}]);

	return GradeProdutos;
}(React.Component);

var CardItemProduto = function (_React$Component10) {
	_inherits(CardItemProduto, _React$Component10);

	function CardItemProduto() {
		_classCallCheck(this, CardItemProduto);

		return _possibleConstructorReturn(this, (CardItemProduto.__proto__ || Object.getPrototypeOf(CardItemProduto)).apply(this, arguments));
	}

	_createClass(CardItemProduto, [{
		key: "render",
		value: function render() {

			var img = void 0,
			    key = void 0,
			    descr = void 0,
			    valor = void 0,
			    name = void 0;

			img = this.props.img;
			key = this.props.key;
			descr = this.props.descr;
			valor = this.props.valor;
			name = this.props.name;

			return React.createElement(
				"div",
				{ className: "col-sm" },
				React.createElement(
					"div",
					{ className: "card card-product card-produto" },
					React.createElement(ImagemProduto, { img: img }),
					React.createElement(DadosItemProduto, { name: name, descr: descr, valor: valor })
				)
			);
		}
	}]);

	return CardItemProduto;
}(React.Component);

var DadosItemProduto = function (_React$Component11) {
	_inherits(DadosItemProduto, _React$Component11);

	function DadosItemProduto() {
		_classCallCheck(this, DadosItemProduto);

		return _possibleConstructorReturn(this, (DadosItemProduto.__proto__ || Object.getPrototypeOf(DadosItemProduto)).apply(this, arguments));
	}

	_createClass(DadosItemProduto, [{
		key: "render",
		value: function render() {

			var title = void 0,
			    descr = void 0,
			    valor = void 0;
			title = this.props.name;
			descr = this.props.descr;
			valor = this.props.valor;

			return React.createElement(
				"div",
				{ className: "card-body" },
				React.createElement(
					"h5",
					{ className: "card-title title text-justify" },
					title
				),
				React.createElement(
					"p",
					{ className: "card-text" },
					descr
				),
				React.createElement(
					"h5",
					{ className: "preco-produto text-success" },
					"R$ ",
					valor
				)
			);
		}
	}]);

	return DadosItemProduto;
}(React.Component);

var ImagemProduto = function (_React$Component12) {
	_inherits(ImagemProduto, _React$Component12);

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

var showPb = function showPb() {
	var element = React.createElement(MeuProgressBar, null);
	ReactDOM.render(element, document.getElementById('root'));
};

var showInterfaceMain = function showInterfaceMain(tamanho, prods, isAnonimo) {
	var element = React.createElement(ConstruirLayout, { size: tamanho, produtos: prods, isAnonimo: isAnonimo });

	ReactDOM.render(element, document.getElementById('root'));
};

var loginAnonimo = function loginAnonimo() {
	firebase.auth().signInAnonymously().catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode === 'auth/operation-not-allowed') {
			alert('Libere o login anonimo no Firebase Console.');
		} else {
			erro(errorMessage);
		}
	});
};

var ConstruirLayout = function (_React$Component13) {
	_inherits(ConstruirLayout, _React$Component13);

	function ConstruirLayout() {
		_classCallCheck(this, ConstruirLayout);

		return _possibleConstructorReturn(this, (ConstruirLayout.__proto__ || Object.getPrototypeOf(ConstruirLayout)).apply(this, arguments));
	}

	_createClass(ConstruirLayout, [{
		key: "render",
		value: function render() {

			var size = this.props.size;
			var lista = this.props.produtos;
			var isAnonimo = this.props.isAnonimo;

			return React.createElement(
				"div",
				null,
				React.createElement(BannerTopo, null),
				React.createElement(GradeProdutos, { size: size, lista: lista, isAnonimo: isAnonimo }),
				React.createElement(NavbarInferior, { anonimo: isAnonimo })
			);
		}
	}]);

	return ConstruirLayout;
}(React.Component);

var updateInterface = function updateInterface(firebase, isAnonimo) {

	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });

	db.collection("produtos").get().then(function (querySnapshot) {
		var prods = querySnapshot.docs;
		var tamanho = querySnapshot.size;

		showInterfaceMain(tamanho, prods, isAnonimo);
	}).catch(function (error) {
		erro(error.message);
	});
};

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		try {
			var app = firebase.app();

			if (user.isAnonymous) {
				//usuario 'visitante', ou que ainda nao fez login
				updateInterface(firebase, true);
			} else {
				//usuario logado
				updateInterface(firebase, false);
			}
		} catch (e) {
			erro(e.message);
		}
	} else {
		// user saiu ou ocorreu algum erro
		loginAnonimo();
	}
}, function (erro) {
	// user saiu ou ocorreu algum erro
	loginAnonimo();
});

// Criacao da interface
var onCreate = function onCreate() {
	showPb();
	loginAnonimo();
};

onCreate();