import _ from 'lodash';
const Placements = React.createClass({

    getInitialState() {
        return {
            formReady: false,
            data: _.map(this.props.candidates, (item) => {
                return { text: item, selected: false }
            })
        };
    },

    __changeSelection: function (text) {
        var state = this.state.data.map((d) => {
            return {
                text: d.text,
                selected: (d.text === text ? !d.selected : d.selected)
            };
        });
        const selectedOnes = _.filter(state, (item) => {
            return item.selected
        });
        if (selectedOnes.length > 2)
            return;

        this.setState({ data: state });
        if (selectedOnes.length === 2) {
            this.setState({ formReady: true });
            this.props.placementsReady({
                isReady: true,
                choices: selectedOnes
            });
        }
        else {
            this.setState({ formReady: false });
            this.props.placementsReady({
                isReady: false,
                choices: selectedOnes
            });
        }
    },

    render() {
        var checks = this.state.data.map((d) => {
            return (
                <div className="checkbox">
                    <label>
                        <input type="checkbox" checked={d.selected}
                            onChange={this.__changeSelection.bind(this, d.text) } />
                        {d.text}
                    </label>
                </div>
            );
        });

        return (
            <div className="post-block">
                <h3>Placements</h3>
                <p className="text-info">Choose any two candidates</p>
                {this.state.formReady ? <p className="text-success">Your selection is complete.</p>
                    : <p className="text-danger">Candidates not yet chosen</p>}
                {checks}
            </div>
        );
    }
});

export default Placements;