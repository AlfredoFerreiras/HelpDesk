import 'react-dom';

declare module 'react-dom' {
  interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }

  function createRoot(
    container: Element | Document | DocumentFragment | Comment,
    options?: RootOptions
  ): Root;

  interface RootOptions {
    hydrate?: boolean;
  }
}
