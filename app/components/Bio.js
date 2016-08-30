const App = React.createClass({

    render() {

        let {voterName, voterProgram, isHostelite, voterHostel, voterEmail, voterYear} = this.props;

        return (
            <div className="voter-details panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Your Details</h3>
                </div>
                <div className="panel-body">
                    <p>Name: {voterName}</p>
                    <p>Program: {voterProgram}</p>
                    {isHostelite ? <p>Hostel: {voterHostel}</p> : ''}
                    <p>Email: {voterEmail}</p>
                    <p>Year: {voterYear}</p>
                </div>
            </div>
        );
    }
});

export default App;