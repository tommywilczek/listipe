export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string, // these are private so the code can't be retreivable, we'll check if the token is valid here.
        private _tokenExpirationDate: Date,
        // Typescript shortcut of automatically storing the arguments of the 
        // constructor in properties of the class by adding an accessor in 
        // front of the argument name (like public or private) that will also
        // be used as the property name
    ) {}

    get token() { // a getter acts like a property (you can do user.token) but a getter is a property that runs this code when you access the property.
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}