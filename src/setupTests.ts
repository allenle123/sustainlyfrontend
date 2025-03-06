import * as matchers from '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
/// <reference types="@testing-library/jest-dom" />
import { afterEach, expect } from 'vitest';

expect.extend(matchers);

afterEach(() => {
	cleanup();
});
