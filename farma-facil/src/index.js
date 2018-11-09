function Text(props) {
	return(
		<h1>{this.props.text}</h1>
	);
}

const ele = <Text text="Ola rapha"/>

ReactDOM.render(ele, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
