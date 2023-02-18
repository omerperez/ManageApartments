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
        viewMore: "נתונים נוספים",
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
    SERVER_BASE_URL: 'http://172.31.87.121:3001/',
    // 'http://localhost:3001/',
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
const STEPPER = { EN_STEPPER, HE_STEPPER };

const EDIT = "עריכה";

// defults 
const APARTMENT_DETAILS_TITLE = "יצירת דירה חדשה";

const OTHER_DETAILS_COMMENT = "תיאור נוסף";

const TENANTS_HISTORY_EMPTY_TITLE = "לא קיימים דיירי עבר";
const TENANTS_HISTORY_TITLE = "היסטוריית דיירים";
const TENANTS_HISTORY_VIEW_MORE = "ראה עוד";
const LAST_AGREEMENT = "חוזה אחרון";

const TENANT_HISTORY = {
    EMPTY_TITLE: TENANTS_HISTORY_EMPTY_TITLE,
    TITLE: TENANTS_HISTORY_TITLE,
    VIEW_MORE: TENANTS_HISTORY_VIEW_MORE,
    LAST_AGREEMENT
};

const ADD_TENANT_BTN_TEXT = "הוסף דייר";
const EDIT_TENANT_BTN_TEXT = "עריכה";
const WHATSAPP_TENANT_BTN_TEXT = "וואטסאפ";
const DOWNLOAD_AGREEMENT = "חוזה";
const EDIT_TENANT_DIALOG_TITLE = "עריכת דייר";
const AGREEMENT_DIALOG_TITLE = "צפה בחוזה";

const TENANT_ACTION_CARD = {
    ADD_BTN: ADD_TENANT_BTN_TEXT,
    EDIT_BTN: EDIT_TENANT_BTN_TEXT,
    WHATSAPP_BTN: WHATSAPP_TENANT_BTN_TEXT,
    AGREEMENT: DOWNLOAD_AGREEMENT,
    EDIT_TITLE: EDIT_TENANT_DIALOG_TITLE,
    AGREEMENT_TITLE: AGREEMENT_DIALOG_TITLE
};

const CREATE_APARTMENT_BTN = "צור דירה";
const IMAGES_ERROR = "אנא הוסף תמונות";

const CREATE_APARTMENT = {
    TITLE: APARTMENT_DETAILS_TITLE,
    CREATE_BTN: CREATE_APARTMENT_BTN,
    IMAGES_ERROR
};

export default STEPPER;
export { MY_APARTMENT, API_CONSTANS, OTHER_DETAILS_COMMENT, TENANT_HISTORY, TENANT_ACTION_CARD, CREATE_APARTMENT };
