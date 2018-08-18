import React from "react";
import { addOrganisation } from "../../../helpers/api";
import "./AddOrganisation.css";

class AddOrganisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: ""
    };
  }

  handleOnchange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  // post it to /api/organisation
  onSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    try{
      addOrganisation(name);
      this.setState({message: "Successfully added!"})
    } catch(err){
      this.setState({message: err});
    }
  }

  render() {
    return (
      <div>
        <h2>Add Organisation</h2>
        <form>
          Name:
          <br />
          <div className="errors">{this.state.message}</div>
          <input
            type="text"
            name="name"
            onChange={e => this.handleOnchange(e)}
          />
          <br />
          <button type="submit" onClick={(e) => this.onSubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddOrganisation;
