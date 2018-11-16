

let mUser, mProduto;

let onCreate = () => {

	showPb();

	firebase.auth().onAuthStateChanged(
		user => {
		  if (user) {
		    // User is signed in.
		    mUser = user;
		    try {
	          let app = firebase.app();

	          const db = firebase.firestore();
			  db.settings({timestampsInSnapshots: true});

	          db.collection('pedidosWeb')
					.doc(mUser.uid)
					.get()
					.then(documento => {
						console.log(documento);
						if (documento.exists) {
							abrirJanelaEspera();
						} else {
							exibirProduto(firebase, idProd, user.isAnonymous);
						}
					}).catch(error => {
						erro(error.message);
					});

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


let voltar = () => {
	window.location.assign('index.html');
}

let abrirCompras = () => {
	window.location.assign('comprar.html');
}

let abrirJanelaEspera = () => {
	window.location.assign('espera.html');
}

let erro = (e) => {
	alert(e);
}

let adicionarAoCarrinho = (q, vt, v) => {
	let documento = {
		caminhoImg: mProduto.get('imgCapa'),
		idProdut: mProduto.get('idProduto'),
		labo: mProduto.get('laboratorio'),
		produtoName: mProduto.get('prodName'),
		quantidade: q,
		valorTotal: vt,
		valorUni: v
	}


	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProd)
		.set(documento)
		.then(() => {
			voltar();
		}).catch(erro => {
			erro(erro.message);
		});
}


let miniPbInvisivel = () => {
	document.getElementById("minipb").style.visibility = "hidden";
}

let miniPbVisivel = () => {
	document.getElementById("minipb").style.visibility = "visible";
}

let showPb = () => {
	let element = <MeuProgressBar />
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let showPbDelete = () => {
	
	let element = <MeuMiniProgressBar />
	ReactDOM.render(
		element,
		document.getElementById('root-pb-delete')
	);
}

let getIdProduto = () => {
	var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    let parameter = 'idProd';
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   
    if (param_value) {   
        return param_value;   
    } else {   
        return null;   
    }  
}

let removerItem = () => {

	showPbDelete();

	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection('carComprasActivy')
		.doc('usuario')
		.collection(mUser.uid)
		.doc(idProd)
		.delete()
		.then(() => {
			voltar();
		}).catch(erro => {
			erro(erro.message);
		});
}

let interfaceAutenticada = (isAnonymous, valor, valorfinal, quantidade, contem, descricao, lab, nome, img) => {
	const element = <div className="container">
						<div id="root-pb-delete"></div>
						<ContainerDetalhes
							img={img}
							nome={nome} 
		        			lab={lab} 
		        			descricao={descricao} 
							isAnonymous={isAnonymous}
		        			valor={valor} 
		        			valorfinal={valorfinal} 
		        			quantidade={quantidade} 
		        			contem={contem} />
		        		<div className="container">
		        			<button onClick={removerItem} className="btn btn-outline-danger centro">
		        				Remover do meu carrinho
		        			</button>
		      
		        		</div>
		        		<img className="whatsbaner" src="whatsbaner.jpg"/>
	        		</div>
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let interfaceAnonima = (isAnonymous, valor, descricao, lab, nome, img) => {
	const element = <div className="container"><ContainerDetalhes
						img={img}
						nome={nome} 
	        			lab={lab} 
	        			descricao={descricao} 
						isAnonymous={isAnonymous}
	        			valor={valor} 
	        			valorfinal={valor} 
	        			quantidade={1} 
	        			contem={false} />
	        			<img className="whatsbaner" src="whatsbaner.jpg"/>
	        			</div>;
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let exibirProduto = (firebase, id, isAnonymous) => {
	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});
	db.collection("produtos")
		.doc(id)
		.get()
		.then(doc => {
			if (doc.exists) {
				mProduto = doc;
				if (isAnonymous) {
					interfaceAnonima(isAnonymous, doc.get('prodValor'), doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
				} else {
					db.collection('carComprasActivy')
						.doc('usuario')
						.collection(mUser.uid)
						.doc(id)
						.get()
						.then(docSnap => {
							if (docSnap.exists) {
								let totalVf = doc.get('prodValor') * docSnap.get('quantidade');
								interfaceAutenticada(isAnonymous, doc.get('prodValor'), totalVf, docSnap.get('quantidade'), true, doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
							} else {
								interfaceAnonima(isAnonymous, doc.get('prodValor'), doc.get('descr'), doc.get('laboratorio'), doc.get('prodName'), doc.get('imgCapa'));
							}

						})
						.catch(error => {
							erro(error.message);
						});

				}

			} else {
				erro('Erro inesperado');
				voltar();
			}


		})
		.catch(error => {
			erro(error.message);
		});
}


//ELEMENTOS DA INTERFACE

class ContainerDetalhes extends React.Component {

	render() {

		let isAnonymous = this.props.isAnonymous;
		let valor = this.props.valor;
		let valorfinal = this.props.valorfinal;
		let quantidade = this.props.quantidade;
		let contem = this.props.contem;
		let descricao = this.props.descricao;
		let lab = this.props.lab;
		let nome = this.props.nome;
		let img = this.props.img;

		return(

			<div className="margem-50 card-group justify-content-md-center">
        
        		<ImagemProduto 
        			img={img} />
        		<DadosProduto 
        			nome={nome} 
        			lab={lab} 
        			descricao={descricao} 
        			valor={valor} />
        		<DetalheProduto 
        			isAnonymous={isAnonymous}
        			valor={valor} 
        			valorfinal={valorfinal} 
        			quantidade={quantidade} 
        			contem={contem} />
    
    		</div>
		);

	}

}


class ImagemProduto extends React.Component {

	render() {

		let img = this.props.img;

		return(
			<div className="card">
            	<img src={img} className="produto-img"/>
        	</div>
		);
	}

}

class DadosProduto extends React.Component {
	render() {

		let p = this.props;

		return(
	            <div className="card">
	                <div className="card-header">
	                    Dados do produto
	                </div>
	                <div className="card-body">
	                    <h2 className="card-title">{p.nome}</h2>
	                    <h5>{p.lab}</h5>
	                    <p className="card-text">{p.descricao}</p>
	                    <h5 className="preco-produto text-secondary">
	                        R$ {p.valor},00
	                    </h5>
	                </div>
	            </div>
		);
	}
}

class DetalheProduto extends React.Component {

	constructor(props) {
		super(props);
		let v = props.valor;
		let q = props.quantidade;
		let vf = props.valorfinal;

		this.state = {
						quantidade: q, 
						valor: v, 
						valorfinal: vf
					};

		this.handerClick = this.handerClick.bind(this);
		this.aumentar = this.aumentar.bind(this);
		this.diminuir = this.diminuir.bind(this);
		this.finalizar = this.finalizar.bind(this);
		this.adicionar = this.adicionar.bind(this);
		this.voltarIndex = this.voltarIndex.bind(this);

	}

	aumentar() {
		let quant = this.state.quantidade + 1;
		let v = this.props.valor;
		let vf = v * quant;
		this.setState({
			quantidade: quant, 
			valor: v, 
			valorfinal: vf
		});
		this.render();
	}

	diminuir() {
		let quant = this.state.quantidade;
		if (quant > 1) {
			quant = quant - 1;
			let v = this.props.valor;
			let vf = v * quant;
			this.setState({
				quantidade: quant, 
				valor: v, 
				valorfinal: vf
			});
			this.render();
		}
	}

	handerClick() {
		//miniPbVisivel();

		if(this.props.isAnonymous) {
			confirm('Você precisa fazer login');
			window.location.assign('login.html');
		}
	}

	adicionar() {
		adicionarAoCarrinho(this.state.quantidade, this.state.valorfinal, this.state.valor);
	}

	finalizar() {
		this.handerClick();
		if (this.state.quantidade === this.props.quantidade && this.props.contem) {
			abrirCompras();
		} else {
			this.adicionar();
		}
	}

	voltarIndex() {
		this.handerClick();
		if (this.state.quantidade === this.props.quantidade && this.props.contem) {
			voltar();
		} else {
			this.adicionar();
		}
	}

	render() {

		let contem = this.props.contem;

		if (contem) {
			this.texto1 = 'Continuar comprando';
			this.texto2 = 'Finalizar compra';
		} else {
			this.texto1 = 'Adicionar ao carrinho \ne continuar comprando';
			this.texto2 = 'Adicionar ao carrinho\ne finalizar compra';
		}

		let state = this.state;

		return(
			
	            <div className="card text-center">
	                <div className="card-body">
	                    <h5 className="card-title">
	                        Quantidade
	                    </h5>
	                    <div className="centro">
	                        <span onClick={this.diminuir} className="font-weight-bold c-pointer">-</span>
	                        <span className="tv-quantidade text-danger">{this.state.quantidade}</span>
	                        <span onClick={this.aumentar} className="font-weight-bold c-pointer">+</span>
	                    </div>
	                    <h4 className="total centro text-secondary vt-m-top">
	                        Total
	                    </h4>
	                    <h3 className="preco-produto text-success vt-margin">
	                        {'R$' + this.state.valorfinal + ',00'}
	                    </h3>
	                  
	                    <button onClick={this.finalizar} className="btn btn-success meus-botoes centro">
	                    	Comprar
	                    </button>
	                </div>
	            </div>
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

class MeuMiniProgressBar extends React.Component {

	render() {
		return(
			<div className="progress meu-progress-bar">
			    <div className="loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
		);
	}

}


//pegar o id do produto
let idProd = getIdProduto();

//Criacao da logica
onCreate();