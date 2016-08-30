const PleaseWait = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
    },


    componentWillUnmount() {
    },

    render() {

        return (
            <div className="panel panel-default" style={styles.panel}>
                <div className="panel-body">
                    <h4>Please wait while the form is being fetched...</h4>
                    <div className="preloader2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }
});

export default PleaseWait;

var styles = {
    panel: {
        width: '600px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '100px'
    }
}