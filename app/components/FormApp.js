import Bio from './Bio';
import SC from './SC';
import Placements from './Placements';
import SSC from './SSC';
import SRC from './SRC';
import Program from './Program';
import ThankYou from './ThankYou';
import {candidateDefaults} from '../constants';
import _ from 'lodash';
const isProduction = process.env.NODE_ENV === 'production';
const App = React.createClass({

    getInitialState() {
        return {
            votedAlready: false,
            candidates: candidateDefaults,
            readiness: {
                sc: false,
                ssc: false,
                placements: false,
                program: false,
                residence: false
            },
            name: '',
            voterProgram: '',
            isHostelite: '',
            voterHostel: '',
            voterEmail: '',
            voterYear: null,
            dataAvailable: false,
            finalChoices: {
                placements: [],
                sc: [],
                ssc: [],
                residence: [],
                program: []
            }
        };
    },

    componentDidMount() {
        if (!isProduction) {
            const getUserOptions = require('../utils').getUserOptions;
            const fetchedState = getUserOptions();
            fetchedState.dataAvailable = true;
            this.setState(fetchedState);
        } else {
            console.log('getting the form data now...');
            google.script.run.withSuccessHandler((response) => {
                console.log(response);
                const fetchedState = JSON.parse(response);
                fetchedState.dataAvailable = true;
                this.setState(fetchedState);
            }).withFailureHandler(function (message) {
                console.log({
                    'status': 'There was a problem in processing your request',
                    error: message
                });
            }).getStudentDetails(localStorage.getItem('boothDetails'));
        }
    },

    _submitForm(e) {
        e.preventDefault();
        document.getElementById("submit-btn").disabled = true;
        if (!isProduction) {
            console.log(JSON.stringify({
                boothDetails: localStorage.getItem('boothDetails'),
                clientChoice: this.state.finalChoices
            }));
            this.setState({ votedAlready: true });
            setTimeout(() => {
                this.props.formSubmitted();
            }, 10000);
        } else {
            google.script.run.withSuccessHandler((response) => {
                console.log(response);
                this.setState(JSON.parse(response));
                setTimeout(() => {
                    this.props.formSubmitted();
                }, 10000);
            }).withFailureHandler(function (message) {
                console.log({
                    'status': 'There was a problem in processing your request',
                    error: message
                });
            }).updateMyChoices(JSON.stringify({
                boothDetails: localStorage.getItem('boothDetails'),
                clientChoice: this.state.finalChoices
            }));
        }
    },

    _scReady(data) {
        if (data.isReady) {
            let readiness = Object.assign(this.state.readiness, { sc: true });
            let finalChoices = Object.assign(this.state.finalChoices, {
                sc: _.map(data.choices, (value) => { return value.text })
            })
            this.setState({
                readiness,
                finalChoices
            });
        } else {
            let readiness = Object.assign(this.state.readiness, { sc: false });
            let finalChoices = Object.assign(this.state.finalChoices, {
                sc: []
            })
            this.setState({
                readiness,
                finalChoices
            });
        }
    },

    _placementsReady(data) {
        if (data.isReady) {
            let readiness = Object.assign(this.state.readiness, { placements: true });
            let finalChoices = Object.assign(this.state.finalChoices, {
                placements: _.map(data.choices, (value) => { return value.text })
            })
            this.setState({
                readiness,
                finalChoices
            });
        } else {
            let readiness = Object.assign(this.state.readiness, { placements: false });
            let finalChoices = Object.assign(this.state.finalChoices, {
                placements: []
            })
            this.setState({
                readiness,
                finalChoices
            });
        }
    },

    _sscReady(data) {
        if (data.isReady) {
            let readiness = Object.assign(this.state.readiness, { ssc: true });
            let finalChoices = Object.assign(this.state.finalChoices, {
                ssc: _.map(data.choices, (value) => { return value.text })
            })
            this.setState({
                readiness,
                finalChoices
            });
        } else {
            let readiness = Object.assign(this.state.readiness, { ssc: false });
            let finalChoices = Object.assign(this.state.finalChoices, {
                ssc: []
            })
            this.setState({
                readiness,
                finalChoices
            });
        }
    },

    _programReady(data) {
        if (data.isReady) {
            let readiness = Object.assign(this.state.readiness, { program: true });
            let finalChoices = Object.assign(this.state.finalChoices, {
                program: _.map(data.choices, (value) => { return value })
            })
            this.setState({
                readiness,
                finalChoices
            });
        } else {
            let readiness = Object.assign(this.state.readiness, { program: false });
            let finalChoices = Object.assign(this.state.finalChoices, {
                program: []
            })
            this.setState({
                readiness,
                finalChoices
            });
        }
    },

    _srcReady(data) {
        if (data.isReady) {
            let readiness = Object.assign(this.state.readiness, { residence: true });
            let finalChoices = Object.assign(this.state.finalChoices, {
                residence: _.map(data.choices, (value) => { return value })
            })
            this.setState({
                readiness,
                finalChoices
            });
        } else {
            let readiness = Object.assign(this.state.readiness, { residence: false });
            let finalChoices = Object.assign(this.state.finalChoices, {
                residence: []
            })
            this.setState({
                readiness,
                finalChoices
            });
        }
    },

    render() {

        let formCleanProgress =
            this.state.readiness.sc && this.state.readiness.ssc && this.state.readiness.placements &&
            this.state.readiness.program;

        if (this.state.isHostelite) {
            formCleanProgress = formCleanProgress && this.state.readiness.residence;
        }

        const form = <div className="container">
            {this.state.dataAvailable ?
                <div className="voter-details panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Choose your candidates</h3>
                    </div>
                    <div className="panel-body">
                        <form className="col-md-12">
                            <SC scReady={this._scReady} candidates={this.state.candidates.SC} />
                            <Placements placementsReady={this._placementsReady}
                                candidates={this.state.candidates.Placements} />
                            <SSC sscReady={this._sscReady} candidates={this.state.candidates.SSC} />
                            <SRC srcReady={this._srcReady} candidates={this.state.candidates.residence} />
                            <Program programReady={this._programReady} candidates={this.state.candidates.program} />
                            <br/>
                            <p>
                                <button onClick={this._submitForm} id="submit-btn"
                                    disabled={!formCleanProgress}
                                    className="btn btn-primary" type="button">Submit my Vote</button>
                            </p>
                        </form>
                    </div>
                </div>
                : ''}
        </div>

        return (
            <div>
                { this.state.votedAlready ? <ThankYou /> : form }
            </div>
        );
    }
});

export default App;