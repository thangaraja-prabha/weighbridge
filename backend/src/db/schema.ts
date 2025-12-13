import { mysqlTable, int, varchar, date, datetime, text, json, customType } from 'drizzle-orm/mysql-core';

const longtext = customType<{ data: string }>({
    dataType() {
        return "longtext";
    },
});

const apiKey = customType<{ data: string }>({
    dataType() {
        return "varchar(8)";
    },
    toDriver(value: unknown): string {
        return typeof value === 'string' ? value : String(value || '');
    },
    fromDriver(value: unknown): string {
        return typeof value === 'string' ? value : String(value || '');
    },
});

// Generate 8-character alphanumeric uppercase API key
function generateApiKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Get current time in Indian Standard Time (IST)
function getCurrentIndiaTime(): string {
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    return istTime.toISOString().slice(0, 19).replace('T', ' ');
}

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    uname: varchar('uname', { length: 30 }).notNull(),
    pass: varchar('pass', { length: 255 }).notNull(),
    fname: varchar('fname', { length: 30 }),
    email: varchar('email', { length: 50 }),
    mobile: varchar('mobile', { length: 30 }),
    rid: int('rid'),          // role id
    pid: int('pid'),          // privilege id
    comname: varchar('comname', { length: 50 }),
    comadd: text('comadd'),
    comnum: varchar('comnum', { length: 30 }),
    comail: varchar('comail', { length: 30 }),
    apikey: apiKey('apikey').notNull().unique().$defaultFn(() => generateApiKey()),
    udt: varchar('udt', { length: 20 }).$defaultFn(() => getCurrentIndiaTime()),
});

export const wlog = mysqlTable('wlog', {
    id: int('id').primaryKey().autoincrement(),
    fwt: int('fwt'),
    lwt: int('lwt'),
    swt: int('swt'),
    mode: int('mode'),
    mid: int('mid'),
    vid: int('vid'),
    sid: int('sid'),
    cid: int('cid'),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

// Legacy wlog table for backward compatibility
export const wlog_legacy = mysqlTable('wlog_legacy', {
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

// New relational tables
export const customers = mysqlTable('customers', {
    id: int('id').primaryKey().autoincrement(),
    cname: varchar('cname', { length: 30 }),
    cadd: text('cadd'),
    cnum: varchar('cnum', { length: 30 }),
    crem: text('crem'),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

export const materials = mysqlTable('materials', {
    id: int('id').primaryKey().autoincrement(),
    mname: varchar('mname', { length: 30 }),
    mdetail: text('mdetail'),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

export const suppliers = mysqlTable('suppliers', {
    id: int('id').primaryKey().autoincrement(),
    sname: varchar('sname', { length: 30 }),
    sadd: text('sadd'),
    snum: varchar('snum', { length: 30 }),
    srem: text('srem'),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

export const tdetails = mysqlTable('tdetails', {
    id: int('id').primaryKey().autoincrement(),
    tnum: varchar('tnum', { length: 10 }),
    tname: varchar('tname', { length: 30 }),
    tadd: text('tadd'),
    tmob: varchar('tmob', { length: 30 }),
    trem: text('trem'),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

export const modes = mysqlTable('modes', {
    id: int('id').primaryKey().autoincrement(),
    mode: varchar('mode', { length: 10 }).notNull()
});

export const roles = mysqlTable('roles', {
    id: int('id').primaryKey().autoincrement(),
    role: varchar('role', { length: 20 }),
    apikey: varchar('apikey', { length: 10 }).notNull(),
    uid: int('uid').notNull(),
    udt: varchar('udt', { length: 20 }).notNull()
});

export const privillages = mysqlTable('privillages', {
    id: int('id').primaryKey().autoincrement(),
    privil: varchar('privil', { length: 20 }).notNull(),
    apikey: varchar('apikey', { length: 10 }).notNull(),
    uid: int('uid').notNull(),
    udt: varchar('udt', { length: 20 }).notNull()
});

// Junction table for user-privilege many-to-many relationship
export const user_privileges = mysqlTable('user_privileges', {
    id: int('id').primaryKey().autoincrement(),
    user_id: int('user_id').notNull(),
    privilege_id: int('privilege_id').notNull(),
    apikey: varchar('apikey', { length: 10 }).notNull(),
    uid: int('uid').notNull(),
    udt: varchar('udt', { length: 20 }).notNull()
});

export const ulog = mysqlTable('ulog', {
    id: int('id').primaryKey().autoincrement(),
    login_dt: varchar('login_dt', { length: 20 }),
    logout_dt: varchar('logout_dt', { length: 20 }),
    apikey: varchar('apikey', { length: 10 }),
    uid: int('uid'),
    udt: varchar('udt', { length: 20 })
});

// Legacy tables for backward compatibility
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
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Material = typeof materials.$inferSelect;
export type NewMaterial = typeof materials.$inferInsert;
export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
export type Tdetail = typeof tdetails.$inferSelect;
export type NewTdetail = typeof tdetails.$inferInsert;
export type Wlog = typeof wlog.$inferSelect;
export type NewWlog = typeof wlog.$inferInsert;
export type WlogLegacy = typeof wlog_legacy.$inferSelect;
export type NewWlogLegacy = typeof wlog_legacy.$inferInsert;

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

