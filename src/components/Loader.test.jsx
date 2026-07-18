// src/components/Loader.test.jsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('applies fullscreen styling when fullScreen prop is true', () => {
    render(<Loader fullScreen />);
    const fullscreenWrapper = document.querySelector('.loader-fullscreen');
    expect(fullscreenWrapper).toBeInTheDocument();
  });

  it('applies inline styling by default', () => {
    render(<Loader />);
    const inlineWrapper = document.querySelector('.loader-inline');
    expect(inlineWrapper).toBeInTheDocument();
  });
});