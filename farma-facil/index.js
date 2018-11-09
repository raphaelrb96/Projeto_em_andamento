function Text(props) {
	return React.createElement(
		"h1",
		null,
		this.props.text
	);
}

var ele = React.createElement(Text, { text: "Ola rapha" });

ReactDOM.render(ele, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();