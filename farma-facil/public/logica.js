

function Welcome(props) {
	return React.createElement(
		"div",
		{ className: "card tamanho_card border border-success" },
		React.createElement(
			"div",
			{ className: "card-body" },
			React.createElement(
				"h5",
				{ className: "card-title" },
				"Card title ",
				props.name
			),
			React.createElement(
				"h6",
				{ className: "card-subtitle mb-2 text-muted" },
				"Card subtitle"
			),
			React.createElement(
				"p",
				{ className: "card-text" },
				"Some quick example text to build on the card title and make up the bulk of the card's content."
			),
			React.createElement(
				"a",
				{ className: "card-link" },
				"Card link"
			),
			React.createElement(
				"a",
				{ className: "card-link" },
				"Another link"
			)
		)
	);
}

function GradeLinha(props) {
	return React.createElement(
		"div",
		{ className: "row justify-content-md-center border border-danger justify-content-md-center" },
		React.createElement(Welcome, { name: props.name[0] }),
		React.createElement(Welcome, { name: props.name[1] }),
		React.createElement(Welcome, { name: props.name[2] })
	);
}

function Grade(props) {
	return React.createElement(
		"div",
		{ className: "container-fluid card-deck border border-primary justify-content-md-center" },
		React.createElement(GradeLinha, { name: props.name[0] }),
		React.createElement(GradeLinha, { name: props.name[1] }),
		React.createElement(GradeLinha, { name: props.name[2] })
	);
}

var listaNomes = function listaNomes() {
	return [['Raphael', 'Maria', 'Regi'], ['Reni', 'Beatriz', 'Del'], ['Neto', 'Sofia', 'Miguel']];
};

var element = React.createElement(Grade, { name: listaNomes() });

var elem = React.createElement(
	"h1",
	null,
	"Holla"
);

ReactDOM.render(element, document.getElementById('rot'));