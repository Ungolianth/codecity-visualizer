/**
 * Classes can implement this Feature to become Configurable
 */

export interface ConfigurableInterface {
    setDefaults: (defaults: AttributeContainer) => void;
    setOptions: (options: AttributeContainer) => void;
    setOption: (key: string, value: any) => void;
    getOption: (key: string) => any;
    getOptions: () => AttributeContainer;
    requireOption: (key: string) => void;
}

export class Configurable implements ConfigurableInterface {
    protected _icDefaults: AttributeContainer | null = null;
    protected _icOptions: AttributeContainer = {};

    public setDefaults(defaults: AttributeContainer): void {
        if (typeof(this._icDefaults) === "undefined" || this._icDefaults === null) {
            this._icDefaults = defaults;
        } else {
            throw new Error("Default values are already set");
        }
    }

    /**
     * Set all options. Overwrites all previous options.
     */
    public setOptions(options: AttributeContainer): void {
        this._icOptions = options;
    }

    /**
     * Set a single option. Overwrites previous value.
     */
    public setOption(key: string, value: any): void {
        if (typeof(this._icOptions) === "undefined" || this._icOptions === null) {
            this._icOptions = {};
        }

        this._icOptions[key] = value;
    }

    /**
     * Get the content for an option. return null, if no value was set.
     */
    public getOption(key: string): any {
        if (typeof(this._icOptions) !== "undefined" && this._icOptions !== null && key in this._icOptions) {
            return this._icOptions[key];
        }

        if (typeof(this._icDefaults) !== "undefined" && this._icDefaults !== null && key in this._icDefaults) {
            return this._icDefaults[key];
        }

        return null;
    }

    /**
     * Get all Options in a single Object
     */
    public getOptions(): AttributeContainer {
        return Object.assign({}, this._icDefaults, this._icOptions);
    }

    /**
     * Require an option to be set. Throws an exception if it is not.
     * @throws Exception if key is not set
     */
    public requireOption(key: string): void {
        if (typeof(this._icOptions) !== "undefined" && this._icOptions !== null && key in this._icOptions) {
            return;
        }

        throw new Error("Option `" + key + "` was not set.");
    }
}

export function applyMixins(derivedCtor: any, baseCtors: any) {
    const baseCtorsArr: any[] = Array.isArray(baseCtors) ? baseCtors : [baseCtors];

    baseCtorsArr.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
