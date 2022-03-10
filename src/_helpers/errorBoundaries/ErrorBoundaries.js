import React from "react";

export class AppError extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div id="notfound">
            <div class="notfound">
              <div class="notfound-404"></div>
              <h1>Oops!</h1>
              <h2>Something Went Wrong</h2>
              <p>
                Sorry but the page you are looking for does not exist, have been
                removed. name changed or is temporarily unavailable
              </p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again?
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
