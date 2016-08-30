const BoothKey = React.createClass({

    getInitialState() {
        return {
            name: '',
            key: ''
        };
    },

    componentDidMount() {
    },


    componentWillUnmount() {
    },

    _setBooth() {
        localStorage.setItem('boothDetails', JSON.stringify(this.state));
        console.log('booth set:', localStorage.getItem('boothDetails'));
        this.props.keysSet();
    },

    boothChange(e) {
        this.setState({ name: e.target.value });
    },

    keyChange(e) {
        this.setState({ key: e.target.value });
    },

    render() {

        return (
            <div className="container">
                <form>
                    <div class="form-group">
                        <label for="booth-name">Booth Name</label>
                        <input type="text" class="form-control" id="booth-name" placeholder="Booth Name"
                            onChange={this.boothChange} value={this.state.name} />
                    </div>
                    <div class="form-group">
                        <label for="booth-key">Booth Key</label>
                        <input type="text" class="form-control" id="booth-key" placeholder="Booth Key"
                            onChange={this.keyChange} value={this.state.key} />
                    </div>
                    <button type="button" class="btn btn-default" onClick={this._setBooth}>Set Booth Info</button>
                </form>
            </div>
        );
    }
});

export default BoothKey;