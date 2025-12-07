import { mysqlTable, int, varchar, date, datetime, text, json, customType } from 'drizzle-orm/mysql-core';

const longtext = customType<{ data: string }>({
    dataType() {
        return "longtext";
    },
});

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 100 }).notNull(),
    password: varchar('password', { length: 100 }).notNull(),
    rights: varchar('rights', { length: 100 }),
    type: varchar('type', { length: 100 }),
    empname: varchar('empname', { length: 100 }),
    empcode: varchar('empcode', { length: 100 }),
    empdest: varchar('empdest', { length: 100 }),
    email: varchar('email', { length: 100 }),
    mobile: varchar('mobile', { length: 100 }),
    dob: date('dob'),
    doj: date('doj'),
    trn_date: datetime('trn_date'),
    imagetitle: varchar('imagetitle', { length: 255 }),
    otp: varchar('otp', { length: 100 }),
});

export const wlog = mysqlTable('wlog', {
    id: int('id').primaryKey().autoincrement(),
    vnum: varchar('vnum', { length: 20 }),
    mname: varchar('mname', { length: 50 }),
    tname: varchar('tname', { length: 50 }),
    cname: varchar('cname', { length: 50 }),
    sname: varchar('sname', { length: 50 }),
    wt1: varchar('wt1', { length: 10 }),
    wt1at: varchar('wt1at', { length: 20 }),
    wt1by: varchar('wt1by', { length: 30 }),
    wt2: varchar('wt2', { length: 10 }),
    wt2at: varchar('wt2at', { length: 20 }),
    wt2by: varchar('wt2by', { length: 30 }),
    wt: varchar('wt', { length: 10 }), // Net weight
    wtat: varchar('wtat', { length: 20 }),
    wtby: varchar('wtby', { length: 30 }),
    remarks: varchar('remarks', { length: 1000 }), // text
    stat: varchar('stat', { length: 10 }),
    username: varchar('username', { length: 30 }),
    trn_date: varchar('trn_date', { length: 20 }),
});

export const mlog = mysqlTable('mlog', {
    id: int('id').primaryKey().autoincrement(),
    stdate: varchar('stdate', { length: 10 }),
    eddate: varchar('eddate', { length: 10 }),
    dept: varchar('dept', { length: 50 }),
    item_description1: varchar('item_description1', { length: 1000 }), // text
    nop: varchar('nop', { length: 50 }),
    stype: varchar('stype', { length: 50 }),
    stime: varchar('stime', { length: 10 }),
    etime: varchar('etime', { length: 10 }),
    bdtime: varchar('bdtime', { length: 50 }),
    sused: varchar('sused', { length: 255 }),
    stat: varchar('stat', { length: 50 }),
    remarks: varchar('remarks', { length: 1000 }), // text
    username: varchar('username', { length: 25 }),
    trn_date: varchar('trn_date', { length: 20 }),
    numail: varchar('numail', { length: 50 }),
});

export const vdetail = mysqlTable('vdetail', {
    id: int('id').primaryKey().autoincrement(),
    vnum: varchar('vnum', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const mdetail = mysqlTable('mdetail', {
    id: int('id').primaryKey().autoincrement(),
    mname: varchar('mname', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const tdetail = mysqlTable('tdetail', {
    id: int('id').primaryKey().autoincrement(),
    tname: varchar('tname', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const sdetail = mysqlTable('sdetail', {
    id: int('id').primaryKey().autoincrement(),
    sname: varchar('sname', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const cdetail = mysqlTable('cdetail', {
    id: int('id').primaryKey().autoincrement(),
    cname: varchar('cname', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const depts = mysqlTable('depts', {
    id: int('id').primaryKey().autoincrement(),
    dept: varchar('dept', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const shifts = mysqlTable('shifts', {
    id: int('id').primaryKey().autoincrement(),
    shift: varchar('shift', { length: 50 }),
    stshift: varchar('stshift', { length: 10 }),
    edshift: varchar('edshift', { length: 10 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export const nopt = mysqlTable('nopt', {
    id: int('id').primaryKey().autoincrement(),
    nop: varchar('nop', { length: 50 }),
    username: varchar('username', { length: 50 }),
    trn_date: varchar('trn_date', { length: 25 }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const kyc_records = mysqlTable('kyc_records', {
    id: int('id').primaryKey().autoincrement(),
    AppName: varchar('AppName', { length: 100 }),
    AppVersion: varchar('AppVersion', { length: 50 }),
    ConfigVersion: varchar('ConfigVersion', { length: 50 }),
    CountryName: varchar('CountryName', { length: 100 }),
    StateName: varchar('StateName', { length: 100 }),
    CityName: varchar('CityName', { length: 100 }),
    BrandName: varchar('BrandName', { length: 100 }),
    ShowroomName: varchar('ShowroomName', { length: 100 }),
    WorkstationName: varchar('WorkstationName', { length: 100 }),
    SubUserCategory1: varchar('SubUserCategory1', { length: 100 }),
    SubUserCategory2: varchar('SubUserCategory2', { length: 100 }),
    PrimaryUserType: int('PrimaryUserType'),
    PrimaryUserName: varchar('PrimaryUserName', { length: 100 }),
    PrimaryMobileNumber: varchar('PrimaryMobileNumber', { length: 20 }), // Using varchar for flexibility
    PrimaryEmail: varchar('PrimaryEmail', { length: 150 }),
    KYC_punch_mobile: varchar('KYC_punch_mobile', { length: 20 }),
    KF_name: varchar('KF_name', { length: 150 }),
    KF_aadhar: varchar('KF_aadhar', { length: 20 }),
    KF_pan: varchar('KF_pan', { length: 20 }),
    KF_incomesource: varchar('KF_incomesource', { length: 100 }),
    KF_monthlyIncome: int('KF_monthlyIncome'),
    KF_landmark: varchar('KF_landmark', { length: 255 }),
    KF_houseType: varchar('KF_houseType', { length: 50 }),
    KF_postalcode: int('KF_postalcode'),
    KF_address: varchar('KF_address', { length: 500 }),
    KF_Latitude: varchar('KF_Latitude', { length: 30 }), // Storing as string for precision safety or use decimal
    KF_Longitude: varchar('KF_Longitude', { length: 30 }),
    KF_house_photo1: longtext('KF_house_photo1'), // Requires LONGTEXT
    KF_house_photo2: longtext('KF_house_photo2'),
    KF_maritalstatus: varchar('KF_maritalstatus', { length: 50 }),
    KF_mode: varchar('KF_mode', { length: 20 }),
    Items: json('Items'), // Storing list as JSON
    Order_reverify: varchar('Order_reverify', { length: 10 }),
    Prev_Order_Id: int('Prev_Order_Id'),
    Remarks: varchar('Remarks', { length: 1000 }),
    trn_date: datetime('trn_date'),
});

export type KycRecord = typeof kyc_records.$inferSelect;
export type NewKycRecord = typeof kyc_records.$inferInsert;

