export interface Consent {
  id: number,
  status: string,
  hippaSigned: any,
  hippaExpires: any,
  signedDate: Date,
  expireDate: Date,
  file: string | null,
  fileUrl:  string | null
}
