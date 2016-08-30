import _ from 'lodash';
const SRC = React.createClass({

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
                selected: (d.text === text ? true : false)
            };
        });

        this.setState({ data: state, formReady: true });
        this.props.srcReady({
            isReady: true,
            choices: [text]
        });
    },

    render() {
        var radios = this.state.data.map((d) => {
            return (
                <div className="radio">
                    <label>
                        <input type="radio" checked={d.selected}
                            onChange={this.__changeSelection.bind(this, d.text) } />
                        {d.text}
                    </label>
                </div>
            );
        });

        return (
            <div className="post-block">
                <h3>Student Residence</h3>
                <p className="text-info">Choose any one Candidate</p>                
                {this.state.formReady ? <p className="text-success">Your selection is ready.</p>
                    : <p className="text-danger">Candidate not yet chosen</p>}
                {radios}
            </div>
        );
    }
});

export default SRC;