export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    public _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > new Date(this._tokenExpirationDate)) {
      return null;
    }
    else
    {
      console.log(this._tokenExpirationDate)
      console.log(new Date())
      return this._token;
    }
  }
}
