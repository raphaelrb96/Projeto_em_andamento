let mUser;
let minhaListaDeProdutos = Array();
let valorEntrega = 5;
let valorTotal = valorEntrega;

let onCreate = () => {

	showPb();

	firebase.auth().onAuthStateChanged(
	user => {
	  if (user) {
	    // User is signed in.
	    mUser = user;
	    try {
          let app = firebase.app();

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
	},
	erro => {
		// user saiu ou ocorreu algum erro
		erro(erro.message);
	}
);

}

let enviarPedidoFinal = () => {

	let e = document.getElementById("pagamento");
	let pg = e.value;


	if (pg !== 'Dinheiro' && pg !== 'Cartao') {
		alert('Escolha uma opção de pagamento!');
		return;
	}

	let cep = document.getElementById("recipient-cep").value;
	let rua = document.getElementById("recipient-rua").value;
	let bairro = document.getElementById("recipient-bairro").value;
	let ncasa = document.getElementById("recipient-n-casa").value;
	let whatsapp = document.getElementById("recipient-phone").value;

	if (cep !== '' && rua !== '' && bairro !== '' && ncasa !== '' && whatsapp !== '') {
		const db = firebase.firestore();
		db.settings({timestampsInSnapshots: true});

		db.collection('carComprasActivy')
			.doc('usuario')
			.collection(mUser.uid)
			.get()
			.then(querySnapshot => {
				let prods = querySnapshot.docs;
				let tamanho = querySnapshot.size;


				if (tamanho == 0) {
					let retorno = confirm('Você ainda não adicionou nenhum item ao carrinho.');
					voltar();
				} else {


					let objeto = {
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
					db.collection('pedidosWeb')
						.doc(mUser.uid)
						.set(objeto)
						.then(()=>{
							voltar();
						});
				}

				

			})
			.catch(error => {
				erro(error.message);
			});
	} else {
		alert('Preencha todos os campos');
	}

}

let atualizarProdutoCarrinho = (obj, idProdut) => {

	let totall = <ContainerPrecoTotal total={valorTotal} />
	ReactDOM.render(
		totall,
		document.getElementById('totall')
	);

	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProdut)
		.update(obj);
}

let voltar = () => {
	window.location.assign('index.html');
}

let erro = (e) => {
	alert(e);
}

let showPb = () => {
	let element = <MeuProgressBar />
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let abrirJanelaEspera = () => {
	window.location.assign('espera.html');
}

let getListCompras = () => {
	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection('pedidosWeb')
		.doc(mUser.uid)
		.get()
		.then(doc => {
			if (doc.exists) {
				abrirJanelaEspera();
			} else {
				db.collection('carComprasActivy')
					.doc('usuario')
					.collection(mUser.uid)
					.get()
					.then(querySnapshot => {
						let prods = querySnapshot.docs;
						let tamanho = querySnapshot.size;


						if (tamanho == 0) {
							let retorno = confirm('Você ainda não adicionou nenhum item ao carrinho.');
							voltar();
						} else {
							listaProdutosPrincipal = querySnapshot.docs;
							criarInterface(prods, tamanho);
						}

						

					})
					.catch(error => {
						erro(error.message);
					});
			}
		}).catch(error => {
			erro(error.message);
		})

	
}


let criarInterface = (list, size) => {

	let elemento = <ListaDeCompras list={list} size={size} />;

	ReactDOM.render(
	  elemento,
	  document.getElementById('root')
	);
	let totall = <ContainerPrecoTotal total={valorTotal} />
	ReactDOM.render(
		totall,
		document.getElementById('totall')
	);
}


let itensPorLinha = 0;
let linhasPorTabela=0;

let listaMainFormatada = Array();
let doubleData = Array();
let parImpar = false;

class Item extends React.Component {

	constructor(props) {
		super(props);
		let q = props.item.get('quantidade');
		let vf = props.item.get('valorTotal');

		this.state = {
						quantidade: q, 
						valorTotal: vf
					};
		this.aumentar = this.aumentar.bind(this);
		this.diminuir = this.diminuir.bind(this);
	}

	aumentar() {
		let quant = this.state.quantidade + 1;
		let v = this.props.item.get('valorUni');
		valorTotal += v;
		let vf = v * quant;
		this.setState({
			quantidade: quant, 
			valorTotal: vf
		});
		atualizarProdutoCarrinho(this.state, this.props.item.get('idProdut'));
	}

	diminuir() {
		let quant = this.state.quantidade - 1;
		if (quant > 1) {
			let v = this.props.item.get('valorUni');
			let vf = v * quant;
			valorTotal -= v;
			this.setState({
				quantidade: quant, 
				valorTotal: vf
			});
			atualizarProdutoCarrinho(this.state, this.props.item.get('idProdut'));
		}
	}

	render() {

		let object = this.props.item;

		return(

			<div className="card margin-card">
			    <img className="card-img-top photo" src={object.get('caminhoImg')} alt="Card image cap"/>
			    <div className="card-body">
			      <h5 className="card-title">{object.get('produtoName')}</h5>
			      <p className="card-text">
			      	{object.get('labo')}
			      </p>
			      <div>
			      	<h5 className="text-secondary">{'R$ ' + object.get('valorUni') + ',00'}</h5>
			      	<h2 className="text-success">{'R$ ' + this.state.valorTotal + ',00'}</h2>
			      </div>
			    </div>
			    <div className="card-footer">
			    	<span className="centro">
		                <span onClick={this.diminuir} className="font-weight-bold c-pointer">-</span>
		                <span className="tv-quantidade text-danger">{this.state.quantidade}</span>
		                <span onClick={this.aumentar} className="font-weight-bold c-pointer">+</span>
		            </span>
			    </div>
		    </div>

		);

	}
}

class ItemBinario extends React.Component {

	render() {
		return(

			<div className="card-deck">

				<Item item={this.props.item1} />
				<Item item={this.props.item2} />

			</div>

		);
	}

}

class ItemUnico extends React.Component {

	render() {

		return(

			<div className="card-deck">
				<Item item={this.props.itemunico} />
			</div>

		);

	}

}

class ContainerPrecoTotal extends React.Component {

	render() {
		return(
			<h3 className="text-center text-success margin-taxa-entrega">{'Total da compra: R$ ' + this.props.total + ',00'}</h3>
		);
	}

}

class FinalizarPedidoNavbar extends React.Component {

	render() {
		return(
			<div className="row">
				<div className="centro caixa-top">
					<h3 className="text-center text-danger margin-taxa-entrega">Taxa de entrega: R$ 5,00</h3>
					<div id="totall"></div>
					<h5 className="font-italic text-center info text-secondary">Já escolheu seus produtos? Clique no botão a baixo para concluir sua compra e receber seu pedido!</h5>
					<div className="forma-pagamento">
						<select className="centro" id="pagamento">
							<option value="branco" selected>Formas de pagamento</option>
							<option value="Dinheiro">Dinheiro</option>
							<option value="Cartao">Cartão</option>
						</select>
						<div className="top-60">
							<h4 className="font-italic text-secondary">
							<strong>Aceitamos os seguintes cartões:</strong>
							</h4>
							<p className="font-italic text-secondary">
							<strong>Crédito:</strong> Mastercard, Visa, Elo, Cabal, AmericanExpress, Hipercard, Hiper
							</p>
							<p className="font-italic text-secondary">
							<strong>Débito:</strong> Mastercard, Visa, Elo, Cabal, BanriCompras
							</p>
							<p className="font-italic text-secondary">
							<strong>Alimentação:</strong> Alelo
							</p>
						</div>
					</div>
					<button type="button" className="btn btn-success centro" data-toggle="modal" data-target="#comprasModal">CONCLUIR COMPRA</button>

				</div>
			</div>
		);
	}

}

class MeuProgressBar extends React.Component {

	render() {
		return(
			<div className="progress meu-progress-bar">
			    <div className="loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
		);
	}

}

class ListaDeCompras extends React.Component {

	render() {

		let list = this.props.list;

		let size = this.props.size;
		let sz = size - 1;

		if (size%2 === 0) {
			//a ultima linha é binaria
			impar = false;

	} else {
			//a ultima linha é unica
			impar = true;
	}


	list.forEach((item, pos) => {
		valorTotal += item.get('valorTotal');
	});

	const conteudo = list.map(item => <div className="col-sm"><Item item={item}/></div>);

	return(
		<div className="container">
			<FinalizarPedidoNavbar />
			<div className="bar-top bg-secondary">
				<hr/>
					<h1 className="text-white text-center">Minha lista de compras</h1>
				<hr/>
			</div>
			<div className="row">
			{conteudo}
			</div>
		</div>
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


}


onCreate();