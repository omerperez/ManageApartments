const HE_STEPPER = {
    back: "חזור",
    create: "צור דירה",
    next: "המשך",
};
const EN_STEPPER = {
    back: "Back",
    create: "Create",
    next: "Next",
};

const MY_APARTMENT = {
    HE: {
        createBtn: "צור/י דירה חדשה",
        viewMore: "ראה/י עוד",
        free: "פנויה",
        rent: "מושכרת",
    },
    EN: {
        createBtn: "Create new apartment",
        viewMore: "View More",
        free: "Free",
        rent: "Rent",
    }
};

const API_CONSTANS = {
    SERVER_BASE_URL: 'http://localhost:3001/',
    OWNER_APARTMENTS_API: 'apartment/my-apartments',
    APARTMENT_VIEW_API: 'tenant/find',
    // APARTMENT_VIEW_API: 'apartment/find',
    CREATE_APARTMENT_API: 'apartment/create',
    UPDATE_APARTMENT_API: 'apartment/edit',
    CREATE_TENANT_API: 'tenant/create',
    UPLOAD_FILES_API: 's3/upload',
    VERIFY_TOKEN_API: 'auth/verify',
    REGISTER_API: 'user/register'
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { EN_STEPPER, HE_STEPPER };
export { MY_APARTMENT, API_CONSTANS };
