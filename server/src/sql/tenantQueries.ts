const tenantById = `SELECT * FROM TENANTS WHERE id=:currentTenantId`;

const createTenantTable = `CREATE TABLE Tenants (
	id VARCHAR PRIMARY KEY,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "mobileNumber" VARCHAR NOT NULL,
    "anotherMobileNumber" VARCHAR,
    email VARCHAR NOT NULL,
    age integer NOT NULL,
    gender VARCHAR NOT NULL,
    "currentAgreement" VARCHAR NOT NULL,
    agreement TEXT[], 
    birthday VARCHAR NOT NULL,
    "startDate" VARCHAR NOT NULL,
    "endDate" VARCHAR NOT NULL
);`

const createTenant = `INSERT INTO tenants(
	id, "firstName", "lastName", "mobileNumber", 
    "anotherMobileNumber", email, age, gender, 
    "currentAgreement", agreement, birthday, 
    "startDate", "endDate"
    ) VALUES (
        :id, :firstName, :lastName, :mobileNumber,
        :anotherMobileNumber, :email, :age, :gender,
        :currentAgreement, :agreement, :birthday,
        :startDate, :endDate
    );`

const editTenant = `UPDATE tenants
	SET id=:id, "firstName"=:firstName, "lastName"=:lastName, 
    "mobileNumber"=:mobileNumber, "anotherMobileNumber"=:anotherMobileNumber,
    email=:email, age=:age, gender=:gender, "currentAgreement"=:currentAgreement,
    agreement=:agreement, birthday=:birthday, 
    "startDate"=:startDate, "endDate"=:endDate
	WHERE id=:tenantId`;

const deleteTenant = `DELETE FROM TENANTS WHERE id=:id`;

export default {
    createTenantTable, createTenant, editTenant, deleteTenant, tenantById
};
