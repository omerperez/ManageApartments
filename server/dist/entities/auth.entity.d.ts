declare class RefreshToken {
    constructor(init?: Partial<RefreshToken>);
    id: number;
    userId: string;
    userAgent: string;
    ipAddress: string;
    sign(): string;
}
export default RefreshToken;
