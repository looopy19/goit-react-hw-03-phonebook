import { Component } from 'react';
import s from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = uuidv4();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  // для получения данных из формы в App.js во время сабмита
  // использую метод с поднятием состояния в родитель
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  // form.reset() в реакте не работает, пользуюсь методом
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameId}>
            <p className={s.form__label}>Name</p>
            <input
              type="text"
              name="name"
              className={s.form__firstInput}
              value={name}
              onChange={this.handleInputChange}
              id={this.nameId}
              placeholder="Enter name"
              required
            />
          </label>
          <label>
            <p className={s.form__label}>Number</p>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleInputChange}
              maxLength="9"
              minLength="7"
              pattern="[0-9]{3}-{0,1}[0-9]{2}-{0,1}[0-9]{2}"
              required
              placeholder="123-45-67"
            />
          </label>
          <div className={s.submit__box}>
            <button
              className={s.form__button}
              type="submit"
              disabled={name === '' || number === ''}
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;