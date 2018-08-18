import React from "react";
import "./AddOrganasation.css";

class AddOrganasation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleOnchange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  // post it to /api/organisation
  onSubmit() {
    const name = this.state.name;
  }

  render() {
    return (
      <div>
        <h2>Add Organisation</h2>
        <form>
          Name:
          <br />
          <div className="errors"></div>
          <input
            type="text"
            name="name"
            onChange={e => this.handleOnchange(e)}
          />
          <br />
          <button type="submit" onClick={() => this.onSubmit()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddOrganasation;
