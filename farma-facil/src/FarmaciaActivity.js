let erro = error =>  {
	if (error === null || error === undefined) {
		error = 'Erro';
	}
	alert(error);
}

let elementoNavBottom;

class MeuProgressBar extends React.Component {

	render() {
		return(
			<div className="progress meu-progress-bar">
			    <div className="loading-pb progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
			</div>
		);
	}

}

class BotaoFazerLogin extends React.Component {

	constructor(props) {
		super(props);
		this.abriLogin = this.abriLogin.bind(this);
	}

	abriLogin() {
		window.location.assign('login.html');
	}

	render() {
		return(
			<button onClick={this.abriLogin} type="button" className="btn btn-danger">
				<div className="font-weight-bold text-white">
					Login/Cadastro
				</div>
			</button>
		);
	}

}

class SubMenuNavbottom extends React.Component {

	render() {

		return (


			<div>
				
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
			        <span className="navbar-toggler-icon"></span>
			      </button>
			      <div className="navbar-collapse collapse show" id="navbarCollapse">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item active">
			            <a className="nav-link" href="#"><font className="vertical-alinhamento"><font className="vertical-alinhamento">WhatssApp:</font></font><span class="sr-only"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(atual)</font></font></span></a>
			          </li>
			
			          <li className="nav-item dropup show">
			            <a className="nav-link" href="#"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(92) 992037915</font></font><span class="sr-only"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(atual)</font></font></span></a>
			          </li>
			        </ul>
			        <MeuSearchInput />
			      </div>

			</div>
			  

		);

	}

}

class BotaoAbrirCarrinho extends React.Component {

	render() {

		return(
			<button type="button" class="btn btn-success">
				<div className="font-weight-bold text-white">
					Carrinho/Compras
				</div>
			</button>
		);

	}

}

class BannerTopo extends React.Component {

	render(){
		return(

			<img className="rendimensionar" src="baner2.jpg"/>

		);
	}

}

class MeuSearchInput extends React.Component {

	render() {

		return(

			<form className="form-inline mt-2 mt-md-0">
	            <input className="form-control mr-sm-2" type="text" placeholder="Pesquisar produto" aria-label="Pesquisar produto"></input>
	            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
	            	<font className="vertical-alinhamento">
	            		<font className="vertical-alinhamento">
	            			Procurar
	            		</font>
	            	</font>
	            </button>
	        </form>

		);

	}

}

class NavbarInferior extends React.Component {

	constructor(props) {
		super(props);
		if (this.props.anonimo) {
			elementoNavBottom = <BotaoFazerLogin />
		} else {
			elementoNavBottom = <BotaoAbrirCarrinho />
		}
	}

	render() {
		return(
			<nav className="navbar fixed-bottom navbar-expand-sm navbar-dark p-3 mb-2 bg-secondary text-white sem-margim-bottom">
				<a className="navbar-brand" href="#">
					{elementoNavBottom}
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
			        <span className="navbar-toggler-icon"></span>
			      </button>
			      <div className="navbar-collapse collapse show" id="navbarCollapse">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item active">
			            <a className="nav-link" href="#"><font className="vertical-alinhamento"><font className="vertical-alinhamento">WhatssApp:</font></font><span class="sr-only"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(atual)</font></font></span></a>
			          </li>
			
			          <li className="nav-item dropup show">
			            <a className="nav-link" href="#"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(92) 992037915</font></font><span class="sr-only"><font className="vertical-alinhamento"><font className="vertical-alinhamento">(atual)</font></font></span></a>
			          </li>
			        </ul>
			        <MeuSearchInput />
			      </div>
			</nav>
		);
	}

	

}

class LinhaGrade extends React.Component {
	render() {

		let doc = this.props.doc;


		return(

			<div className="row justify-content-around">
					
				<CardItemProduto img={doc[0].get('imgCapa')} key={doc[0].get('idProduto')} name={doc[0].get('prodName')} valor={doc[0].get('prodValor')} descr={doc[0].get('descr')} />
				<CardItemProduto img={doc[1].get('imgCapa')} key={doc[1].get('idProduto')} name={doc[1].get('prodName')} valor={doc[1].get('prodValor')} descr={doc[1].get('descr')} />
				<CardItemProduto img={doc[2].get('imgCapa')} key={doc[2].get('idProduto')} name={doc[2].get('prodName')} valor={doc[2].get('prodValor')} descr={doc[2].get('descr')} />
				<CardItemProduto img={doc[3].get('imgCapa')} key={doc[3].get('idProduto')} name={doc[3].get('prodName')} valor={doc[3].get('prodValor')} descr={doc[3].get('descr')} />

			</div>

		);

	}
}

class GradeProdutos extends React.Component {

	render() {

		let size = this.props.size;
		let lista = this.props.lista;

		let listaLinha = Array();

		let itensListaLinha = 0;

		let listaFormatada = Array();
		let numeroLinhas = 0;

		lista.forEach(item => {
			if(itensListaLinha === 4){
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


		let elemento = listaFormatada.map(docs => <div><LinhaGrade doc={docs}/></div> );

		return(

			<div className="container">

				{elemento}
				
			</div>		

		);

	}

}

class CardItemProduto extends React.Component {

	render() {

		let img, key, descr, valor, name;

		img = this.props.img;
		key = this.props.key;
		descr = this.props.descr;
		valor = this.props.valor;
		name = this.props.name;

		return(

			<div className="col-sm">

				<div className="card card-product card-produto">
				
					<ImagemProduto img={img} />
					<DadosItemProduto name={name} descr={descr} valor={valor} />

				</div>

			</div>

		);

	}

}

class DadosItemProduto extends React.Component {

	render() {

		let title, descr, valor;
		title = this.props.name;
		descr = this.props.descr;
		valor = this.props.valor;

		return(

			<div className="card-body">
				<h5 className="card-title title text-justify">{title}</h5>
				<p className="card-text">
					{descr}
				</p>
				<h5 className="preco-produto text-success">
					R$ {valor}
				</h5>
			</div>

		);

	}
	
}

class ImagemProduto extends React.Component {

	render() {

		return(
			<div className="card-img-top container-produto-img">
				<img className="produto-img" src={this.props.img}/>
			</div>
			
		);

	}

}

let showPb = () => {
	let element = <MeuProgressBar />
	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let showInterfaceMain = (tamanho, prods, isAnonimo) => {
	const element = <ConstruirLayout size={tamanho} produtos={prods} isAnonimo={isAnonimo} />

	ReactDOM.render(
		element,
		document.getElementById('root')
	);
}

let loginAnonimo = () => {
	firebase.auth().signInAnonymously().catch(error => {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  if (errorCode === 'auth/operation-not-allowed') {
	    alert('Libere o login anonimo no Firebase Console.');
	  } else {
	    erro(errorMessage);
	  }
	});
}

class ConstruirLayout extends React.Component {

	render() {

		let size = this.props.size;
		let lista = this.props.produtos;
		let isAnonimo = this.props.isAnonimo;

		return(
			<div>
				<BannerTopo />
				<hr/>
				<GradeProdutos size={size} lista={lista} isAnonimo={isAnonimo} />
				<NavbarInferior anonimo={isAnonimo} />
			</div>
		);

	}
}

let updateInterface = (firebase, isAnonimo) => {

	const db = firebase.firestore();
	db.settings({timestampsInSnapshots: true});

	db.collection("produtos").get()
		.then(querySnapshot => {
			let prods = querySnapshot.docs;
			let tamanho = querySnapshot.size;


			showInterfaceMain(tamanho, prods, isAnonimo);

		})
		.catch(error => {
			erro(error.message);
		});

}


firebase.auth().onAuthStateChanged(
	user => {
	  if (user) {
	    // User is signed in.
	    try {
          let app = firebase.app();

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
	},
	erro => {
		// user saiu ou ocorreu algum erro
		loginAnonimo();
	}
);

// Criacao da interface
let onCreate = () => {
	showPb();
	loginAnonimo();
}

onCreate();