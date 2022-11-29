interface ITenant {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  mobileNumber: string;
  anotherMobileNumber: string;
  email: string;
  age: number;
  gender: string;
  agreement: string;
  birthday: Date;
  startDate: Date;
  endDate: Date;
}

export type { ITenant };
