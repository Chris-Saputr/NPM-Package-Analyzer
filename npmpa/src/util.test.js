import { describe, it, expect } from "vitest";
import { dependencyCount, sizeBytes } from "./util";

describe('util', () => {
    it('Counts Dependencies', () => {
        expect(dependencyCount({ a: "1.0.0", b: "2.0.0" })).toBe(2);
        expect(dependencyCount(null)).toBe(0);
    });
    it('returns 0 for empty object', () => {
        expect(dependencyCount({})).toBe(0);
    });
    it('Format Bytes', () => {
        expect(sizeBytes(0)).toBe('0 Bytes');
        expect(sizeBytes(500)).toBe('500 Bytes');
        expect(sizeBytes(1024)).toBe('1 KB');
        expect(sizeBytes(1048576)).toBe('1 MB');
        expect(sizeBytes(1073741824)).toBe('1 GB');
        expect(sizeBytes(1099511627776)).toBe('1 TB');
        expect(sizeBytes(123456789)).toBe('118 MB');
        expect(sizeBytes()).toBe('0 Bytes');
    });
});