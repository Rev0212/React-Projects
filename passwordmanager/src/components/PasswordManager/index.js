import React, { Component } from 'react';
import './index.css';

class PasswordManager extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    passwordList: [],
    count: 0,
    isChecked: false,
    searchQuery: '' 
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { website, userName, password, passwordList } = this.state;

    if (website === '' || userName === '' || password === '') {
      return; 
    }

    const newPasswordList = [
      ...passwordList,
      { website, userName, password }
    ];

    this.setState({
      passwordList: newPasswordList,
      count: newPasswordList.length,
      website: '',
      userName: '',
      password: ''
    });
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked
    }));
  };

  handleDelete = (index) => {
    const { passwordList } = this.state;
    const newPasswordList = passwordList.filter((_, i) => i !== index);
    this.setState({
      passwordList: newPasswordList,
      count: newPasswordList.length
    });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  renderHeader = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
        className='logo'
      />
    </div>
  );

  renderForm = () => {
    const { website, userName, password } = this.state;

    return (
      <form id="passwordManager" className="formContainer" onSubmit={this.onSubmit}>
        <h1 className="formTitle">Add New Password</h1>
        <div className="inputContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="inputContainerImg"
          />
          <input
            className="inputContainerInput"
            placeholder="website"
            type="text"
            value={website}
            onChange={(e) => this.setState({ website: e.target.value })}
          />
        </div>
        <div className="inputContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="inputContainerImg"
          />
          <input
            className="inputContainerInput"
            placeholder="username"
            type="text"
            value={userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
        </div>
        <div className="inputContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="inputContainerImg"
          />
          <input
            className="inputContainerInput"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <button className="formButton" type="submit">ADD</button>
      </form>
    );
  };

  renderAddNewPassword = () => (
    <div className="addNewPasswordContainer">
      {this.renderForm()}
      <img
        className="addNewPasswordConatinerImg"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
        alt="password manager"
      />
    </div>
  );

  renderPasswordItem = (item, index) => {
    const { isChecked } = this.state;

    return (
      <li>
      <div key={index} className="passwordItem">
        <div>
          <p className='passwordItemText'>{item.website}</p>
          <p className='passwordItemText'>{item.userName}</p>
          {isChecked ? (
            <p className='passwordItemText'>{item.password}</p>
          ) : (
            <img className="passwordItemImg"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
           
          )}
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="passwordItemDeleteIcon"
          onClick={() => this.handleDelete(index)}
        />
      </div>
      </li>
    );
  };

  renderPasswordDisplayHeader = (count) => (
    <div className="renderPasswordDisplayheader">
      <h1 className="passwordCount">Your Password Count: {count}</h1>
      <div className="inputC">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
          alt="search"
          className="inputContainerImg"
        />
        <input
          type="text"
          className="inputContainerInput"
          placeholder="Search"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
        />
      </div>
    </div>
  );

  renderPasswordDisplay = () => {
    const { count, passwordList, isChecked, searchQuery } = this.state;
    const filteredPasswordList = passwordList.filter(item =>
      item.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="displayPasswordContainer">
        {this.renderPasswordDisplayHeader(count)}
        <div>
          <hr />
        </div>
        <div>
          <input
            type="checkbox"
            id="Checkbox"
            checked={isChecked}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="Checkbox">Show Password</label>
        </div>
        {filteredPasswordList.length === 0 ? (
         
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="noPasswordsImage"
            />
        ) : (
          <ul className='passwordItemContainer'>
            {filteredPasswordList.map((eachItem, index) => this.renderPasswordItem(eachItem, index))}
          </ul>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderAddNewPassword()}
        {this.renderPasswordDisplay()}
      </div>
    );
  }
}

export default PasswordManager;
