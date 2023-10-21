import { createMemoryHistory, createBrowserHistory, History } from 'history';

const history: History = 
  process.env.NODE_ENV === 'test' 
    ? createMemoryHistory()
    : createBrowserHistory();

export default history;
