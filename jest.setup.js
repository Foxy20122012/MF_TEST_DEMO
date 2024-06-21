import '@testing-library/jest-dom/extend-expect';


// jest.setup.js
import fetch from 'cross-fetch';

global.fetch = fetch;

