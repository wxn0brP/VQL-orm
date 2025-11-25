const isObj = (v: any): v is object =>
    v !== null && typeof v === "object" && !Array.isArray(v);

export function deepMerge<T extends object>(...sources: T[]): T {
    const out: any = {};

    for (const src of sources) {
        for (const key in src) {
            if (!Object.prototype.hasOwnProperty.call(src, key)) continue;

            const sv = (src as any)[key];
            const ov = out[key];

            out[key] = isObj(sv) && isObj(ov)
                ? deepMerge(ov, sv)
                : sv;
        }
    }

    return out;
}