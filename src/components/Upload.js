import React from 'react';
import {connect} from 'react-redux';
import {fetchProfile} from '../redux/actions';

const styleMonitoringDiv = {
  border: "solid 1px black",
  width: "60%",
  height: "200px",
  margin: "auto"
}

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dateUpload: ""
    }
  }

  onClickHandler = async () => {
    this.setState({dateUpload: new Date().getTime()})
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    const res = await this.props.getNamesFromFile(data)
    this.setState({data: res})
    console.log(this.state.data)
  }

  onChangeHandler = async event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render() {
    return (
        <div className="header">
          <input type="file" name="file" onChange={this.onChangeHandler.bind(this)}/>
          <button type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onClickHandler.bind(this)}>
            Upload
          </button>
          <h3>Monitoring</h3>
          <div style={styleMonitoringDiv}>
            {this.state.data && this.state.data.map(item =>
                <p>{item.name}{" "}{item.number}</p>
            )}
          </div>
          <p><b>Time Upload</b> {this.state.dateUpload}</p>
          <p><b>Time Load</b> {this.state.data.length > 0 && new Date().getTime()}</p>
          <p><b>Spend time of Loading </b> {this.state.data.length > 0 && new Date().getTime() - this.state.dateUpload}
          </p>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    fetching: state.fetching
  };
};


const mapDispatchToProps = dispatch => {
  return {
    getNamesFromFile: (data) => dispatch(fetchProfile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

