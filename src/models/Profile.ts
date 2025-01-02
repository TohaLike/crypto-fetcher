export interface Profile {
  name: string;
  email: string;
  date: object;
  isActivated: boolean;
  id: string;
  createdAt: string;
  profileVerification: boolean;
  options: any;
  subscribers: any;
  checkSubscribe: any;
  following: any;
  countFollowers: number | string;
  countFollowings: number | string;
}
