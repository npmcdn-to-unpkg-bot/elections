import BoothKey from './BoothKey';
import FormManager from './FormManager';
const isProduction = process.env.NODE_ENV === 'production';
const App = React.createClass({

    getInitialState() {
        return {
            keyValid: false,
            boothDetails: {
                name: '',
                key: ''
            }
        };
    },

    componentDidMount() {
        console.log(localStorage.getItem('boothDetails'));
        if (!isProduction) {
            localStorage.removeItem('boothDetails');
        }
        if (localStorage.getItem('boothDetails')) {
            this.validateBooth();
        };
    },

    validateBooth() {
        if (!isProduction) {
            this.setState({
                keyValid: true,
                boothDetails: JSON.parse(localStorage.getItem('boothDetails'))
            });
        } else {
            google.script.run.withSuccessHandler((response) => {
                console.log(response);
                let r = JSON.parse(response);
                if (r.validBooth) {
                    this.setState({
                        keyValid: true,
                        boothDetails: JSON.parse(localStorage.getItem('boothDetails'))
                    });
                } else {
                    this.setState({
                        keyValid: false,
                        boothDetails: {
                            name: '',
                            key: ''
                        }
                    });
                    localStorage.removeItem('boothDetails');
                }
            }).withFailureHandler(function (message) {
                console.log({
                    'status': 'There was a problem in processing your request',
                    error: message
                });
            }).validateBooth(localStorage.getItem('boothDetails'));
        }
    },


    componentWillUnmount() {
    },

    _keysSet() {
        this.validateBooth();
    },

    _setKeysAgain() {
        this.setState({
            keyValid: false,
            boothDetails: {
                name: '',
                key: ''
            }
        });
        localStorage.removeItem('boothDetails');
    },

    render() {

        return (
            <div>
                { this.state.keyValid ? <FormManager setKeysAgain={this._setKeysAgain} />
                    : <BoothKey keysSet={this._keysSet} /> }
            </div>
        );
    }
});

export default App;