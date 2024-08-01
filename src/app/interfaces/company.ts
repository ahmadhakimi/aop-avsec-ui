export interface Company {
  id: string;
  companyName: string;
  rocExpDate: Date;
  telNo: string;
  faxNo: string;
  companyEmail: string;
  remarks: string;
  address: string;
  createdBy: string;
  updatedBy: string;
  staffId: string;
  companyStatus: CompanyStatus;
}

export enum CompanyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  // data: byte[]
  createdAt: Date;
  updatedAt: Date;
  company: Company;
}
