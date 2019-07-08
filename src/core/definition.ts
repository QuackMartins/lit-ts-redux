import {Constructor} from "lit-element";

export const DefinitionCssState = {
    dirty: "isDirty",
    valid: "isValid",
    invalid: "isInvalid",
};

export class Constraints {

    /**
     * How will it be converted to a plain object
     */
    type = String as Constructor<any>;
    required = undefined as boolean;

    /**
     * Regex pattern to test the raw value set through model.set()
     */
    pattern = undefined as RegExp;
    extraValidation = undefined as (value: unknown) => Promise<boolean>;

    constructor(config: Partial<Constraints>) {
        Object.assign(this, config || {});
    }

    async validate(value): Promise<string | undefined> {
        switch (true) {
            case (!this.required && (value === null || value === undefined || value === "")):
                break;

            case (this.required && (value === null || value === undefined || value === "")):
                return 'required';

            case (this.pattern && !this.pattern.test(value)):
                return 'pattern';

            case (Boolean(this.extraValidation) && !(await this.extraValidation(value))):
                return 'extra-validation'
        }
    }
}


type DefineCallback<T extends Constraints> = (
    define: (path: string, constraints: Partial<T>) => void,
    validate?: (name: string, validator: (model: Model<T>) => Promise<Boolean>) => void
) => void;

export class Definition<T extends Constraints> {

    private definitions = {} as { [path: string]: T; };
    private validators = [] as { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[];
    private constraint: { new(...args): T };

    constructor(CustomConstraint?: { new(...args): T }) {
        this.constraint = (CustomConstraint || Constraints) as { new(...args): T };
    }

    configure(callback: DefineCallback<T>): Definition<T> {
        const define = (path: string, definitions: T) => {
            this.definitions[path] = new this.constraint(definitions);
        };
        const validate = (name, validator) => {
            this.validators.push({name, validator})
        };
        callback(define, validate);
        return this;
    }

    model(): Model<T> {
        return new Model(this.definitions, this.validators);
    }
}

export class Model<T extends Constraints> {

    private listeners = [] as any[];
    private _fields = [] as Field<T>[];
    private _validatorNames = [] as { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[];
    private _valid = undefined;
    private _invalid = undefined;

    constructor(definitions: { [p: string]: T }, validators: { name: string, validator: ((model: Model<T>) => Promise<boolean>) }[]) {
        this._fields = Object.keys(definitions).map(key => {
            const field = new Field(key, definitions[key]);
            field.subscribe(() => this.runListeners());
            return field;
        });
        this._validatorNames = validators;
    }

    plainObj(): {[key:string]:any} {
        const plainObj = {};
        this._fields.forEach(field => {
            const paths = field.name.split(".");
            const lastPath = paths.pop();
            const target = paths.reduce((parentObj, path) => {
                parentObj[path] = parentObj[path] === undefined ? {} : parentObj[path];
                return parentObj[path];
            }, plainObj);
            target[lastPath] = field.value;
        });
        return plainObj;
    }

    prune() {
        this._fields.forEach(it => it.prune());
    }

    load(data) {

    }

    clear() {

    }

    get valid() {
        return this._valid;
    }

    get validatorNames() {
        return this._validatorNames.map(it => it.name);
    }

    get fields() {
        return this._fields;
    }

    get(fieldName): any {
        return this._fields.find(it => it.name === fieldName).value;
    }

    setValid(toogle:boolean) {
        this._valid = toogle;
        this._invalid = !toogle;
        this.runListeners();
    }

    setInvalid(toogle:boolean) {
        this._valid = !toogle;
        this._invalid = toogle;
        this.runListeners();
    }

    subscribe(changeListener: () => void): Model<T> {
        this.listeners.push(changeListener);
        return this;
    }

    async validate(validationName?:string): Promise<boolean> {
        if (validationName === undefined) {
            const invalidFields = (await Promise.all(this._fields.map(async field => ({
                name: field.name,
                valid: await field.validate()
            })))).filter(it => !it.valid);

            if (invalidFields.length > 0) {
                this.setValid(false);
                return false;
            }
        }

        const modelValidators = validationName ? this._validatorNames.filter(it => it.name == validationName) : this._validatorNames;
        const invalidations = (await Promise.all(modelValidators.map(async it => ({
            name: it.name,
            valid: await it.validator(this)
        })))).filter(it => !it.valid);

        invalidations.forEach(it => {
            console.debug(`Not validated by [${it.name}]`);
        });

        const isInvalid = invalidations.length > 0;
        this.setInvalid(isInvalid);

        return this.valid;
    }

    private runListeners() {
        this.listeners.forEach(callback => callback(this));
    }

}

const primitivesProtos = [String, Number, Boolean, Symbol].map(it => it.prototype);
const isPrimitive = (constructor) => primitivesProtos.indexOf(constructor.prototype) > -1;

export class Field<T extends Constraints> {

    private _value;
    private _invalidReason = undefined;
    private _invalid = undefined;
    private _valid = undefined;
    private _name: string;
    private _dirty = undefined;
    private constraint = undefined as T;
    private listeners = [] as Array<(field: Field<T>) => void>;

    constructor(path: string, constraints: T) {
        this._name = path;
        this.constraint = constraints;
    }

    get name() {
        return this._name;
    }

    get value() {
        if (this._value !== undefined) {
            if (isPrimitive(this.constraint.type)) {
                return (this.constraint.type as any)(this._value);
            } else {
                return new this.constraint.type(this._value)
            }
        }
    }

    get invalid() {
        return this._invalid;
    }

    get invalidReason() {
        return this._invalidReason;
    }

    get valid() {
        return this._valid;
    }

    get dirty() {
        return this._dirty;
    }

    get required() {
        return Boolean(this.constraint.required);
    }

    get cssState(): string {
        const dirty = this._dirty && DefinitionCssState.dirty;
        const invalid = this._invalid && DefinitionCssState.invalid;
        const valid = this._valid && DefinitionCssState.valid;
        return `${dirty || ""} ${invalid || ""} ${valid || ""}`.trim();
    }

    setValue(value: any) {
        this._value = value;
        this.setDirty(true);
        this.runListeners();
    }

    subscribe(changeListener: ((field: Field<T>) => void)) {
        this.listeners.push(changeListener);
    }

    prune() {
        this._invalid = undefined;
        this._valid = undefined;
        this._invalidReason = undefined;
        this.runListeners();
    }

    setDirty(toggle: boolean) {
        this._dirty = toggle;
        this.runListeners();
    }

    setInvalid(toggle: boolean) {
        this._invalid = toggle;
        this._valid = !toggle;
        this.runListeners();
    }

    setValid(toggle: boolean) {
        this._valid = toggle;
        this._invalid = !toggle;
        this.runListeners();
    }

    async validate(): Promise<boolean> {
        try {
            this._invalidReason = await this.constraint.validate(this._value);
            const isValid = !Boolean(this._invalidReason);
            if (!isValid) {
                console.debug(`Not valid [${this.name}] reason [${this._invalidReason}]`);
            }
            this.setValid(isValid);
            return isValid;
        } catch (error) {
            console.warn(`Error when validating field ${(this.name || "").toUpperCase()}\n`, error, this);
            this._invalidReason = `unknown error`;
            this.setInvalid(true);
            return false;
        }
    }

    private runListeners() {
        this.listeners.forEach(listener => listener(this));
    }

}
