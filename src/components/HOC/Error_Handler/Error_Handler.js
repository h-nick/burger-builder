import React from 'react';
import Modal from '../../Ui/Modal/Modal';
import useHttpErrorHandler from '../../../hooks/http-error-handler';

/*eslint-disable*/
const ErrorHandler = (Wrapped, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {error && error.message}
        </Modal>
        <Wrapped {...props} />
      </>
    );
  }
}

export default ErrorHandler;
/*eslint-enable*/

/* import React, { Component } from 'react';
import Modal from '../../Ui/Modal/Modal';

const ErrorHandler = (Wrapped, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });

        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({ error });
      });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    componentWillUnmount() {
      // This prevents memory leaks.
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.reqInterceptor);
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Wrapped {...this.props} />
        </>
      );
    }
  };
}

export default ErrorHandler; */