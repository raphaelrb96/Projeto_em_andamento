var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mUser = void 0;
var minhaListaDeProdutos = Array();
var valorEntrega = 5;
var valorTotal = valorEntrega;

var onCreate = function onCreate() {

	showPb();

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			mUser = user;
			try {
				var app = firebase.app();

				if (user.isAnonymous) {
					//usuario 'visitante', ou que ainda nao fez login
					voltar();
				} else {
					//usuario logado
					getListCompras(firebase);
				}
			} catch (e) {
				erro(e.message);
			}
		} else {
			// user saiu ou ocorreu algum erro
			voltar();
		}
	}, function (erro) {
		// user saiu ou ocorreu algum erro
		erro(erro.message);
	});
};

var enviarPedidoFinal = function enviarPedidoFinal() {

	var e = document.getElementById("pagamento");
	var pg = e.value;

	if (pg !== 'Dinheiro' && pg !== 'Cartao') {
		alert('Escolha uma opção de pagamento!');
		return;
	}

	var cep = document.getElementById("recipient-cep").value;
	var rua = document.getElementById("recipient-rua").value;
	var bairro = document.getElementById("recipient-bairro").value;
	var ncasa = document.getElementById("recipient-n-casa").value;
	var whatsapp = document.getElementById("recipient-phone").value;

	if (cep !== '' && rua !== '' && bairro !== '' && ncasa !== '' && whatsapp !== '') {
		var db = firebase.firestore();
		db.settings({ timestampsInSnapshots: true });

		db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).get().then(function (querySnapshot) {
			var prods = querySnapshot.docs;
			var tamanho = querySnapshot.size;

			if (tamanho == 0) {
				var retorno = confirm('Você ainda não adicionou nenhum item ao carrinho.');
				voltar();
			} else {

				var objeto = {
					pagamento: pg,
					uid: mUser.uid,
					cep: cep,
					rua: rua,
					bairro: bairro,
					ncasa: ncasa,
					whatsapp: whatsapp,
					fotouser: mUser.photoURL,
					nome: mUser.displayName,
					time: Date(),
					total: valorTotal
				};

				//salvar objeto no banco de dados
				db.collection('pedidosWeb').doc(mUser.uid).set(objeto).then(function () {
					voltar();
				});
			}
		}).catch(function (error) {
			erro(error.message);
		});
	} else {
		alert('Preencha todos os campos');
	}
};

var atualizarProdutoCarrinho = function atualizarProdutoCarrinho(obj, idProdut) {

	var totall = React.createElement(ContainerPrecoTotal, { total: valorTotal });
	ReactDOM.render(totall, document.getElementById('totall'));

	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });

	db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(idProdut).update(obj);
};

var voltar = function voltar() {
	window.location.assign('index.html');
};

var erro = function erro(e) {
	alert(e);
};

var showPb = function showPb() {
	var element = React.createElement(MeuProgressBar, null);
	ReactDOM.render(element, document.getElementById('root'));
};

var abrirJanelaEspera = function abrirJanelaEspera() {
	window.location.assign('espera.html');
};

var getListCompras = function getListCompras() {
	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });

	db.collection('pedidosWeb').doc(mUser.uid).get().then(function (doc) {
		if (doc.exists) {
			abrirJanelaEspera();
		} else {
			db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).get().then(function (querySnapshot) {
				var prods = querySnapshot.docs;
				var tamanho = querySnapshot.size;

				if (tamanho == 0) {
					var retorno = confirm('Você ainda não adicionou nenhum item ao carrinho.');
					voltar();
				} else {
					listaProdutosPrincipal = querySnapshot.docs;
					criarInterface(prods, tamanho);
				}
			}).catch(function (error) {
				erro(error.message);
			});
		}
	}).catch(function (error) {
		erro(error.message);
	});
};

var criarInterface = function criarInterface(list, size) {

	var elemento = React.createElement(ListaDeCompras, { list: list, size: size });

	ReactDOM.render(elemento, document.getElementById('root'));
	var totall = React.createElement(ContainerPrecoTotal, { total: valorTotal });
	ReactDOM.render(totall, document.getElementById('totall'));
};

var itensPorLinha = 0;
var linhasPorTabela = 0;

var listaMainFormatada = Array();
var doubleData = Array();
var parImpar = false;

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item(props) {
		_classCallCheck(this, Item);

		var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

		var q = props.item.get('quantidade');
		var vf = props.item.get('valorTotal');

		_this.state = {
			quantidade: q,
			valorTotal: vf
		};
		_this.aumentar = _this.aumentar.bind(_this);
		_this.diminuir = _this.diminuir.bind(_this);
		return _this;
	}

	_createClass(Item, [{
		key: 'aumentar',
		value: function aumentar() {
			var quant = this.state.quantidade + 1;
			var v = this.props.item.get('valorUni');
			valorTotal += v;
			var vf = v * quant;
			this.setState({
				quantidade: quant,
				valorTotal: vf
			});
			atualizarProdutoCarrinho(this.state, this.props.item.get('idProdut'));
		}
	}, {
		key: 'diminuir',
		value: function diminuir() {
			var quant = this.state.quantidade - 1;
			if (quant > 1) {
				var v = this.props.item.get('valorUni');
				var vf = v * quant;
				valorTotal -= v;
				this.setState({
					quantidade: quant,
					valorTotal: vf
				});
				atualizarProdutoCarrinho(this.state, this.props.item.get('idProdut'));
			}
		}
	}, {
		key: 'render',
		value: function render() {

			var object = this.props.item;

			return React.createElement(
				'div',
				{ className: 'card margin-card' },
				React.createElement('img', { className: 'card-img-top photo', src: object.get('caminhoImg'), alt: 'Card image cap' }),
				React.createElement(
					'div',
					{ className: 'card-body' },
					React.createElement(
						'h5',
						{ className: 'card-title' },
						object.get('produtoName')
					),
					React.createElement(
						'p',
						{ className: 'card-text' },
						object.get('labo')
					),
					React.createElement(
						'div',
						null,
						React.createElement(
							'h5',
							{ className: 'text-secondary' },
							'R$ ' + object.get('valorUni') + ',00'
						),
						React.createElement(
							'h2',
							{ className: 'text-success' },
							'R$ ' + this.state.valorTotal + ',00'
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'card-footer' },
					React.createElement(
						'span',
						{ className: 'centro' },
						React.createElement(
							'span',
							{ onClick: this.diminuir, className: 'font-weight-bold c-pointer' },
							'-'
						),
						React.createElement(
							'span',
							{ className: 'tv-quantidade text-danger' },
							this.state.quantidade
						),
						React.createElement(
							'span',
							{ onClick: this.aumentar, className: 'font-weight-bold c-pointer' },
							'+'
						)
					)
				)
			);
		}
	}]);

	return Item;
}(React.Component);

var ItemBinario = function (_React$Component2) {
	_inherits(ItemBinario, _React$Component2);

	function ItemBinario() {
		_classCallCheck(this, ItemBinario);

		return _possibleConstructorReturn(this, (ItemBinario.__proto__ || Object.getPrototypeOf(ItemBinario)).apply(this, arguments));
	}

	_createClass(ItemBinario, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'card-deck' },
				React.createElement(Item, { item: this.props.item1 }),
				React.createElement(Item, { item: this.props.item2 })
			);
		}
	}]);

	return ItemBinario;
}(React.Component);

var ItemUnico = function (_React$Component3) {
	_inherits(ItemUnico, _React$Component3);

	function ItemUnico() {
		_classCallCheck(this, ItemUnico);

		return _possibleConstructorReturn(this, (ItemUnico.__proto__ || Object.getPrototypeOf(ItemUnico)).apply(this, arguments));
	}

	_createClass(ItemUnico, [{
		key: 'render',
		value: function render() {

			return React.createElement(
				'div',
				{ className: 'card-deck' },
				React.createElement(Item, { item: this.props.itemunico })
			);
		}
	}]);

	return ItemUnico;
}(React.Component);

var ContainerPrecoTotal = function (_React$Component4) {
	_inherits(ContainerPrecoTotal, _React$Component4);

	function ContainerPrecoTotal() {
		_classCallCheck(this, ContainerPrecoTotal);

		return _possibleConstructorReturn(this, (ContainerPrecoTotal.__proto__ || Object.getPrototypeOf(ContainerPrecoTotal)).apply(this, arguments));
	}

	_createClass(ContainerPrecoTotal, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'h3',
				{ className: 'text-center text-success margin-taxa-entrega' },
				'Total da compra: R$ ' + this.props.total + ',00'
			);
		}
	}]);

	return ContainerPrecoTotal;
}(React.Component);

var FinalizarPedidoNavbar = function (_React$Component5) {
	_inherits(FinalizarPedidoNavbar, _React$Component5);

	function FinalizarPedidoNavbar() {
		_classCallCheck(this, FinalizarPedidoNavbar);

		return _possibleConstructorReturn(this, (FinalizarPedidoNavbar.__proto__ || Object.getPrototypeOf(FinalizarPedidoNavbar)).apply(this, arguments));
	}

	_createClass(FinalizarPedidoNavbar, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'centro caixa-top' },
					React.createElement(
						'h3',
						{ className: 'text-center text-danger margin-taxa-entrega' },
						'Taxa de entrega: R$ 5,00'
					),
					React.createElement('div', { id: 'totall' }),
					React.createElement(
						'h5',
						{ className: 'font-italic text-center info text-secondary' },
						'J\xE1 escolheu seus produtos? Clique no bot\xE3o a baixo para concluir sua compra e receber seu pedido!'
					),
					React.createElement(
						'div',
						{ className: 'forma-pagamento' },
						React.createElement(
							'select',
							{ className: 'centro', id: 'pagamento' },
							React.createElement(
								'option',
								{ value: 'branco', selected: true },
								'Formas de pagamento'
							),
							React.createElement(
								'option',
								{ value: 'Dinheiro' },
								'Dinheiro'
							),
							React.createElement(
								'option',
								{ value: 'Cartao' },
								'Cart\xE3o'
							)
						),
						React.createElement(
							'div',
							{ className: 'top-60' },
							React.createElement(
								'h4',
								{ className: 'font-italic text-secondary' },
								React.createElement(
									'strong',
									null,
									'Aceitamos os seguintes cart\xF5es:'
								)
							),
							React.createElement(
								'p',
								{ className: 'font-italic text-secondary' },
								React.createElement(
									'strong',
									null,
									'Cr\xE9dito:'
								),
								' Mastercard, Visa, Elo, Cabal, AmericanExpress, Hipercard, Hiper'
							),
							React.createElement(
								'p',
								{ className: 'font-italic text-secondary' },
								React.createElement(
									'strong',
									null,
									'D\xE9bito:'
								),
								' Mastercard, Visa, Elo, Cabal, BanriCompras'
							),
							React.createElement(
								'p',
								{ className: 'font-italic text-secondary' },
								React.createElement(
									'strong',
									null,
									'Alimenta\xE7\xE3o:'
								),
								' Alelo'
							)
						)
					),
					React.createElement(
						'button',
						{ type: 'button', className: 'btn btn-success centro', 'data-toggle': 'modal', 'data-target': '#comprasModal' },
						'CONCLUIR COMPRA'
					)
				)
			);
		}
	}]);

	return FinalizarPedidoNavbar;
}(React.Component);

var MeuProgressBar = function (_React$Component6) {
	_inherits(MeuProgressBar, _React$Component6);

	function MeuProgressBar() {
		_classCallCheck(this, MeuProgressBar);

		return _possibleConstructorReturn(this, (MeuProgressBar.__proto__ || Object.getPrototypeOf(MeuProgressBar)).apply(this, arguments));
	}

	_createClass(MeuProgressBar, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'progress meu-progress-bar' },
				React.createElement('div', { className: 'loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success', role: 'progressbar', 'aria-valuenow': '75', 'aria-valuemin': '0', 'aria-valuemax': '100' })
			);
		}
	}]);

	return MeuProgressBar;
}(React.Component);

var ListaDeCompras = function (_React$Component7) {
	_inherits(ListaDeCompras, _React$Component7);

	function ListaDeCompras() {
		_classCallCheck(this, ListaDeCompras);

		return _possibleConstructorReturn(this, (ListaDeCompras.__proto__ || Object.getPrototypeOf(ListaDeCompras)).apply(this, arguments));
	}

	_createClass(ListaDeCompras, [{
		key: 'render',
		value: function render() {

			var list = this.props.list;

			var size = this.props.size;
			var sz = size - 1;

			if (size % 2 === 0) {
				//a ultima linha é binaria
				impar = false;
			} else {
				//a ultima linha é unica
				impar = true;
			}

			list.forEach(function (item, pos) {
				valorTotal += item.get('valorTotal');
			});

			var conteudo = list.map(function (item) {
				return React.createElement(
					'div',
					{ className: 'col-sm' },
					React.createElement(Item, { item: item })
				);
			});

			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(FinalizarPedidoNavbar, null),
				React.createElement(
					'div',
					{ className: 'bar-top bg-secondary' },
					React.createElement('hr', null),
					React.createElement(
						'h1',
						{ className: 'text-white text-center' },
						'Minha lista de compras'
					),
					React.createElement('hr', null)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					conteudo
				)
			);

			// if(impar) {
			// 	const itensdalista = listaMainFormatada.map((item) => item.length === 2 ? <ItemBinario item1={item[0]} item2={item[1]}/> : <ItemUnico itemunico={item[0]}/> );

			// 	return(
			// 		<div>
			// 			{itensdalista}
			// 		</div>
			// 	);
			// } else {
			// 	const itensdalista = listaMainFormatada.map((item) => <ItemBinario item1={item[0]} item2={item[1]}/> );

			// 	return(
			// 		<div>
			// 			{itensdalista}
			// 		</div>
			// 	);
			// }

		}
	}]);

	return ListaDeCompras;
}(React.Component);

onCreate();