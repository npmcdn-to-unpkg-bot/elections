const ThankYou = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
    },


    componentWillUnmount() {
    },

    render() {

        return (
            <div className="jumbotron" style={styles.jumbotron}>
                <h1>Thank You!</h1>
                <p>Your vote has been registered!</p>
                <p>You may exit the booth now.</p>
            </div>
        );
    }
});

export default ThankYou;

var styles = {
    jumbotron: {
        width: '500px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '100px'
    }
}