interface ITenant {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  anotherMobileNumber: string;
  email: string;
  age: number;
  gender: string;
  currentAgreement: string;
  agreement: string[];
  birthday: string;
  startDate: string;
  endDate: string;
}

export type { ITenant };
