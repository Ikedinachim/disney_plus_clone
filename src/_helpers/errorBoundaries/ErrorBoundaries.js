import React from "react";

const ErrorComponent = (hasError) => {
  return (
    <div>
      <h1>Oops, Something Went Wrong</h1>
      <button type="button" onClick={() => this.setState({ hasError: false })}>
        Try again?
      </button>
    </div>
    //   <h1>Something went wrong</h1>
  );
};

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
          <h1>Oops, Something Went Wrong</h1>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// export class AppError extends React.Component {
//   state = { hasError: false };
//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }
//   componentDidCatch(error, errorInfo) {
//     this.setState({ error, errorInfo });
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <div>
//           <h1>Oops, we done goofed up</h1>
//           <button
//             type="button"
//             onClick={() => this.setState({ hasError: false })}
//           >
//             Try again?
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }
