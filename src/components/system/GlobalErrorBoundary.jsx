import { Component } from "react";
import ErrorPage from "../../pages/ErrorPage";

export default class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Royalties global UI error", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorPage onRetry={this.handleReset} title="The experience hit a snag." message="A page component failed unexpectedly. Try again, or return home and continue browsing Royalties Buffet." />;
    }

    return this.props.children;
  }
}
