import { Component } from "react";
import { RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

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
      return (
        <main className="grid min-h-screen place-items-center bg-[#050505] px-4 py-16 text-white">
          <section className="w-full max-w-2xl border border-white/10 bg-[#0d0d0d] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,.45)] sm:p-10">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">System recovery</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">The experience hit a snag.</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">A page component failed unexpectedly. Try the page again, or return home and continue browsing Royalties Buffet.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={this.handleReset} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d8ab4d] px-5 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-[#efcb73]">
                <RefreshCcw className="size-4" />
                Try Again
              </button>
              <Link to="/" className="inline-flex min-h-12 items-center justify-center border border-white/15 px-5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-[#d8ab4d]/60 hover:text-[#efcb73]">
                Return Home
              </Link>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
