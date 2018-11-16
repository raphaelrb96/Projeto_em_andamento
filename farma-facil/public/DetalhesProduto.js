var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mUser = void 0,
    mProduto = void 0;

var onCreate = function onCreate() {

	showPb();

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			mUser = user;
			try {
				var app = firebase.app();

				var db = firebase.firestore();
				db.settings({ timestampsInSnapshots: true });

				db.collection('pedidosWeb').doc(mUser.uid).get().then(function (documento) {
					console.log(documento);
					if (documento.exists) {
						abrirJanelaEspera();
					} else {
						exibirProduto(firebase, idProd, user.isAnonymous);
					}
				}).catch(function (error) {
					erro(error.message);
				});
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

var voltar = function voltar() {
	window.location.assign('index.html');
};

var abrirCompras = function abrirCompras() {
	window.location.assign('comprar.html');
};

var abrirJanelaEspera = function abrirJanelaEspera() {
	window.location.assign('espera.html');
};

var erro = function erro(e) {
	alert(e);
};

var adicionarAoCarrinho = function adicionarAoCarrinho(q, vt, v) {
	var documento = {
		caminhoImg: mProduto.get('imgCapa'),
		idProdut: mProduto.get('idProduto'),
		labo: mProduto.get('laboratorio'),
		produtoName: mProduto.get('prodName'),
		quantidade: q,
		valorTotal: vt,
		valorUni: v
	};

	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });

	db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(idProd).set(documento).then(function () {
		voltar();
	}).catch(function (erro) {
		erro(erro.message);
	});
};

var miniPbInvisivel = function miniPbInvisivel() {
	document.getElementById("minipb").style.visibility = "hidden";
};

var miniPbVisivel = function miniPbVisivel() {
	document.getElementById("minipb").style.visibility = "visible";
};

var showPb = function showPb() {
	var element = React.createElement(MeuProgressBar, null);
	ReactDOM.render(element, document.getElementById('root'));
};

var showPbDelete = function showPbDelete() {

	var element = React.createElement(MeuMiniProgressBar, null);
	ReactDOM.render(element, document.getElementById('root-pb-delete'));
};

var getIdProduto = function getIdProduto() {
	var loc = location.search.substring(1, location.search.length);
	var param_value = false;
	var parameter = 'idProd';
	var params = loc.split("&");
	for (i = 0; i < params.length; i++) {
		param_name = params[i].substring(0, params[i].indexOf('='));
		if (param_name == parameter) {
			param_value = params[i].substring(params[i].indexOf('=') + 1);
		}
	}
	if (param_value) {
		return param_value;
	} else {
		return null;
	}
};

var removerItem = function removerItem() {

	showPbDelete();

	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });

	db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(idProd).delete().then(function () {
		voltar();
	}).catch(function (erro) {
		erro(erro.message);
	});
};

var interfaceAutenticada = function interfaceAutenticada(isAnonymous, valor, valorfinal, quantidade, contem, descricao, lab, nome, img) {
	var element = React.createElement(
		'div',
		{ className: 'container' },
		React.createElement('div', { id: 'root-pb-delete' }),
		React.createElement(ContainerDetalhes, {
			img: img,
			nome: nome,
			lab: lab,
			descricao: descricao,
			isAnonymous: isAnonymous,
			valor: valor,
			valorfinal: valorfinal,
			quantidade: quantidade,
			contem: contem }),
		React.createElement(
			'div',
			{ className: 'container' },
			React.createElement(
				'button',
				{ onClick: removerItem, className: 'btn btn-outline-danger centro' },
				'Remover do meu carrinho'
			)
		),
		React.createElement('img', { className: 'whatsbaner', src: 'whatsbaner.jpg' })
	);
	ReactDOM.render(element, document.getElementById('root'));
};

var interfaceAnonima = function interfaceAnonima(isAnonymous, valor, descricao, lab, nome, img) {
	var element = React.createElement(
		'div',
		{ className: 'container' },
		React.createElement(ContainerDetalhes, {
			img: img,
			nome: nome,
			lab: lab,
			descricao: descricao,
			isAnonymous: isAnonymous,
			valor: valor,
			valorfinal: valor,
			quantidade: 1,
			contem: false }),
		React.createElement('img', { className: 'whatsbaner', src: 'whatsbaner.jpg' })
	);
	ReactDOM.render(element, document.getElementById('root'));
};

var exibirProduto = function exibirProduto(firebase, id, isAnonymous) {
	var db = firebase.firestore();
	db.settings({ timestampsInSnapshots: true });
	db.collection("produtos").doc(id).get().then(function (doc) {
		if (doc.exists) {
			mProduto = doc;
			if (isAnonymous) {
				interfaceAnonima(isAnonymous, doc.get('prodValor'), doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
			} else {
				db.collection('carComprasActivy').doc('usuario').collection(mUser.uid).doc(id).get().then(function (docSnap) {
					if (docSnap.exists) {
						var totalVf = doc.get('prodValor') * docSnap.get('quantidade');
						interfaceAutenticada(isAnonymous, doc.get('prodValor'), totalVf, docSnap.get('quantidade'), true, doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
					} else {
						interfaceAnonima(isAnonymous, doc.get('prodValor'), doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
					}
				}).catch(function (error) {
					erro(error.message);
				});
			}
		} else {
			erro('Erro inesperado');
			voltar();
		}
	}).catch(function (error) {
		erro(error.message);
	});
};

//ELEMENTOS DA INTERFACE

var ContainerDetalhes = function (_React$Component) {
	_inherits(ContainerDetalhes, _React$Component);

	function ContainerDetalhes() {
		_classCallCheck(this, ContainerDetalhes);

		return _possibleConstructorReturn(this, (ContainerDetalhes.__proto__ || Object.getPrototypeOf(ContainerDetalhes)).apply(this, arguments));
	}

	_createClass(ContainerDetalhes, [{
		key: 'render',
		value: function render() {

			var isAnonymous = this.props.isAnonymous;
			var valor = this.props.valor;
			var valorfinal = this.props.valorfinal;
			var quantidade = this.props.quantidade;
			var contem = this.props.contem;
			var descricao = this.props.descricao;
			var lab = this.props.lab;
			var nome = this.props.nome;
			var img = this.props.img;

			return React.createElement(
				'div',
				{ className: 'margem-50 card-group justify-content-md-center' },
				React.createElement(ImagemProduto, {
					img: img }),
				React.createElement(DadosProduto, {
					nome: nome,
					lab: lab,
					descricao: descricao,
					valor: valor }),
				React.createElement(DetalheProduto, {
					isAnonymous: isAnonymous,
					valor: valor,
					valorfinal: valorfinal,
					quantidade: quantidade,
					contem: contem })
			);
		}
	}]);

	return ContainerDetalhes;
}(React.Component);

var ImagemProduto = function (_React$Component2) {
	_inherits(ImagemProduto, _React$Component2);

	function ImagemProduto() {
		_classCallCheck(this, ImagemProduto);

		return _possibleConstructorReturn(this, (ImagemProduto.__proto__ || Object.getPrototypeOf(ImagemProduto)).apply(this, arguments));
	}

	_createClass(ImagemProduto, [{
		key: 'render',
		value: function render() {

			var img = this.props.img;

			return React.createElement(
				'div',
				{ className: 'card' },
				React.createElement('img', { src: img, className: 'produto-img' })
			);
		}
	}]);

	return ImagemProduto;
}(React.Component);

var DadosProduto = function (_React$Component3) {
	_inherits(DadosProduto, _React$Component3);

	function DadosProduto() {
		_classCallCheck(this, DadosProduto);

		return _possibleConstructorReturn(this, (DadosProduto.__proto__ || Object.getPrototypeOf(DadosProduto)).apply(this, arguments));
	}

	_createClass(DadosProduto, [{
		key: 'render',
		value: function render() {

			var p = this.props;

			return React.createElement(
				'div',
				{ className: 'card' },
				React.createElement(
					'div',
					{ className: 'card-header' },
					'Dados do produto'
				),
				React.createElement(
					'div',
					{ className: 'card-body' },
					React.createElement(
						'h2',
						{ className: 'card-title' },
						p.nome
					),
					React.createElement(
						'h5',
						null,
						p.lab
					),
					React.createElement(
						'p',
						{ className: 'card-text' },
						p.descricao
					),
					React.createElement(
						'h5',
						{ className: 'preco-produto text-secondary' },
						'R$ ',
						p.valor,
						',00'
					)
				)
			);
		}
	}]);

	return DadosProduto;
}(React.Component);

var DetalheProduto = function (_React$Component4) {
	_inherits(DetalheProduto, _React$Component4);

	function DetalheProduto(props) {
		_classCallCheck(this, DetalheProduto);

		var _this4 = _possibleConstructorReturn(this, (DetalheProduto.__proto__ || Object.getPrototypeOf(DetalheProduto)).call(this, props));

		var v = props.valor;
		var q = props.quantidade;
		var vf = props.valorfinal;

		_this4.state = {
			quantidade: q,
			valor: v,
			valorfinal: vf
		};

		_this4.handerClick = _this4.handerClick.bind(_this4);
		_this4.aumentar = _this4.aumentar.bind(_this4);
		_this4.diminuir = _this4.diminuir.bind(_this4);
		_this4.finalizar = _this4.finalizar.bind(_this4);
		_this4.adicionar = _this4.adicionar.bind(_this4);
		_this4.voltarIndex = _this4.voltarIndex.bind(_this4);

		return _this4;
	}

	_createClass(DetalheProduto, [{
		key: 'aumentar',
		value: function aumentar() {
			var quant = this.state.quantidade + 1;
			var v = this.props.valor;
			var vf = v * quant;
			this.setState({
				quantidade: quant,
				valor: v,
				valorfinal: vf
			});
			this.render();
		}
	}, {
		key: 'diminuir',
		value: function diminuir() {
			var quant = this.state.quantidade;
			if (quant > 1) {
				quant = quant - 1;
				var v = this.props.valor;
				var vf = v * quant;
				this.setState({
					quantidade: quant,
					valor: v,
					valorfinal: vf
				});
				this.render();
			}
		}
	}, {
		key: 'handerClick',
		value: function handerClick() {
			//miniPbVisivel();

			if (this.props.isAnonymous) {
				confirm('Você precisa fazer login');
				window.location.assign('login.html');
			}
		}
	}, {
		key: 'adicionar',
		value: function adicionar() {
			adicionarAoCarrinho(this.state.quantidade, this.state.valorfinal, this.state.valor);
		}
	}, {
		key: 'finalizar',
		value: function finalizar() {
			this.handerClick();
			if (this.state.quantidade === this.props.quantidade && this.props.contem) {
				abrirCompras();
			} else {
				this.adicionar();
			}
		}
	}, {
		key: 'voltarIndex',
		value: function voltarIndex() {
			this.handerClick();
			if (this.state.quantidade === this.props.quantidade && this.props.contem) {
				voltar();
			} else {
				this.adicionar();
			}
		}
	}, {
		key: 'render',
		value: function render() {

			var contem = this.props.contem;

			if (contem) {
				this.texto1 = 'Continuar comprando';
				this.texto2 = 'Finalizar compra';
			} else {
				this.texto1 = 'Adicionar ao carrinho \ne continuar comprando';
				this.texto2 = 'Adicionar ao carrinho\ne finalizar compra';
			}

			var state = this.state;

			return React.createElement(
				'div',
				{ className: 'card text-center' },
				React.createElement(
					'div',
					{ className: 'card-body' },
					React.createElement(
						'h5',
						{ className: 'card-title' },
						'Quantidade'
					),
					React.createElement(
						'div',
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
					),
					React.createElement(
						'h4',
						{ className: 'total centro text-secondary vt-m-top' },
						'Total'
					),
					React.createElement(
						'h3',
						{ className: 'preco-produto text-success vt-margin' },
						'R$' + this.state.valorfinal + ',00'
					),
					React.createElement(
						'button',
						{ onClick: this.finalizar, className: 'btn btn-success meus-botoes centro' },
						'Comprar'
					)
				)
			);

			// return(

			//            <div className="card text-center">
			//                <div className="card-body">
			//                    <h5 className="card-title">
			//                        Quantidade
			//                    </h5>
			//                    <div className="centro">
			//                        <span onClick={this.diminuir} className="font-weight-bold c-pointer">-</span>
			//                        <span className="tv-quantidade text-danger">{this.state.quantidade}</span>
			//                        <span onClick={this.aumentar} className="font-weight-bold c-pointer">+</span>
			//                    </div>
			//                    <h4 className="total centro text-secondary vt-m-top">
			//                        Total
			//                    </h4>
			//                    <h3 className="preco-produto text-success vt-margin">
			//                        {'R$' + this.state.valorfinal + ',00'}
			//                    </h3>
			//                    <button onClick={this.voltarIndex} className="btn btn-outline-success meus-botoes centro m-top-16px">
			//                        Adicionar
			//                    </button>
			//                    <button onClick={this.finalizar} className="btn btn-success meus-botoes centro">
			//                    	Comprar
			//                    </button>
			//                </div>
			//            </div>
			// );
		}
	}]);

	return DetalheProduto;
}(React.Component);

var MeuProgressBar = function (_React$Component5) {
	_inherits(MeuProgressBar, _React$Component5);

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

var MeuMiniProgressBar = function (_React$Component6) {
	_inherits(MeuMiniProgressBar, _React$Component6);

	function MeuMiniProgressBar() {
		_classCallCheck(this, MeuMiniProgressBar);

		return _possibleConstructorReturn(this, (MeuMiniProgressBar.__proto__ || Object.getPrototypeOf(MeuMiniProgressBar)).apply(this, arguments));
	}

	_createClass(MeuMiniProgressBar, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'progress meu-progress-bar' },
				React.createElement('div', { className: 'loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success', role: 'progressbar', 'aria-valuenow': '75', 'aria-valuemin': '0', 'aria-valuemax': '100' })
			);
		}
	}]);

	return MeuMiniProgressBar;
}(React.Component);

//pegar o id do produto


var idProd = getIdProduto();

//Criacao da logica
onCreate();