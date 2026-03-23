const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
export function deepMerge(...sources) {
    const out = {};
    for (const src of sources) {
        for (const key in src) {
            if (!Object.prototype.hasOwnProperty.call(src, key))
                continue;
            const sv = src[key];
            const ov = out[key];
            out[key] = isObj(sv) && isObj(ov)
                ? deepMerge(ov, sv)
                : sv;
        }
    }
    return out;
}
