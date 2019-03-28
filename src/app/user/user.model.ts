export class User {
    public id:number;
    public firstName:string;
    public lastName:string;
    public mail:string;
    public phoneNumber:string;
    public password:string;
  
    constructor(id:number,
         firstName:string,
         lastName:string,
         mail:string,
         phoneNumber:string,
         password:string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.phoneNumber = phoneNumber;
      this.password = password;
    }
  }