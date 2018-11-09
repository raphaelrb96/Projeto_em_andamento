

function Welcome(props) {
  return (<div className="card tamanho_card border border-success">
  <div className="card-body">
    <h5 className="card-title">Card title {props.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a className="card-link">Card link</a>
    <a className="card-link">Another link</a>
  </div>
</div>);
}

function GradeLinha(props) {
	return(
		<div className="row justify-content-md-center border border-danger justify-content-md-center">
			<Welcome name={props.name[0]}/>
			<Welcome name={props.name[1]}/>
			<Welcome name={props.name[2]}/>
		</div>
		
	);
}

function Grade(props) {
	return(
		<div className="container-fluid card-deck border border-primary justify-content-md-center">
			<GradeLinha name={props.name[0]}/>
			<GradeLinha name={props.name[1]}/>
			<GradeLinha name={props.name[2]}/>
		</div>
	);
}

let listaNomes = () => {
	return [
		['Raphael', 'Maria', 'Regi'],
		['Reni', 'Beatriz', 'Del'],
		['Neto', 'Sofia', 'Miguel']
	];
}

const element = <Grade name={listaNomes()}/>

const elem = <h1>Holla</h1>;

ReactDOM.render(
  element,
  document.getElementById('rot')
);