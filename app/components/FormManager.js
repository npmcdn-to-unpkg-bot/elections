import FormApp from './FormApp';
let isProduction = process.env.NODE_ENV === 'production';
isProduction = true;
const FormManager = React.createClass({

    getInitialState() {
        return {
            formReady: false
        };
    },

    componentDidMount() {
        this.checkIfFormReady();
    },

    checkIfFormReady() {
        if (!isProduction) {
            this.setState({ formReady: true });
        } else {
            google.script.run.withSuccessHandler((response) => {
                console.log(response);
                let r = JSON.parse(response);
                if (r.formReady) {
                    this.setState({ formReady: true });
                } else if (r.wrongBooth) {
                    this.props.setKeysAgain();
                } else {
                    this.setState({ formReady: false });
                    setTimeout(this.checkIfFormReady, 15000);
                }
            }).checkIfFormReady(function (message) {
                console.log({
                    'status': 'There was a problem in processing your request',
                    error: message
                });
            }).checkIfFormReady(localStorage.getItem('boothDetails'));
        }
    },

    _formSubmitted() {
        this.setState({ formReady: false });
        this.checkIfFormReady();
    },

    componentWillUnmount() {
    },

    render() {

        return (
            <div>
                {this.state.formReady ? <FormApp formSubmitted={this._formSubmitted} />
                    : <p>Please wait while the form is being fetched...</p> }
            </div>
        );
    }
});

export default FormManager;