class GradeProdutos extends React.Component {

	render() {

		return(

			<div className="container">

				<div className="row justify-content-around">
					
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />

				</div>
				<div className="row justify-content-around">
					
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />

				</div>
				<div className="row justify-content-around">
					
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />

				</div>
				<div className="row justify-content-around">
					
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />

				</div>
				<div className="row justify-content-around">
					
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />

				</div>
				<div className="row justify-content-around">
					
					<CardItemProduto img="batedeira.jpg" />
					<CardItemProduto img="celular.jpg" />
					<CardItemProduto img="batedeira.jpg" />

				</div>
			</div>		

		);

	}

}

class CardItemProduto extends React.Component {

	render() {

		return(

			<div className="col-sm">

				<div className="card card-product card-produto">
				
					<ImagemProduto img={this.props.img} />
					<DadosItemProduto />

				</div>

			</div>

		);

	}

}

class DadosItemProduto extends React.Component {

	render() {

		return(

			<div className="card-body">
				<h5 className="card-title title text-justify">Card title</h5>
				<p className="card-text">
					This card has supporting text below as a natural lead-in to additional content.
				</p>
				<h5 className="preco-produto text-success">
					R$ 100,00
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

const element = <GradeProdutos />

ReactDOM.render(
  element,
  document.getElementById('root')
);