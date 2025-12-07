
import { Router, Request, Response } from 'express';
import { db } from '../db';
import { kyc_records } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

// GET /api/kyc - List KYC records
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);

        // Count total
        const countResult = await db.select({ count: sql`count(*)` }).from(kyc_records);
        // @ts-ignore
        const total = Number(countResult[0].count);

        const result = await db.select().from(kyc_records)
            .orderBy(desc(kyc_records.id))
            .limit(limit)
            .offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (error) {
        console.error('Error fetching KYC records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the expected interface based on the requirements
interface KycInput {
    AppName: string;
    AppVersion: string;
    ConfigVersion: string;
    CountryName: string;
    StateName: string;
    CityName: string;
    BrandName: string;
    ShowroomName: string;
    WorkstationName: string;
    SubUserCategory1: string;
    SubUserCategory2: string;
    PrimaryUserType: number;
    PrimaryUserName: string;
    PrimaryMobileNumber: number | string; // Requirement says number, accepting both
    PrimaryEmail: string;
    KYC_punch_mobile: number | string;
    KF_name: string;
    KF_aadhar: number | string;
    KF_pan: string;
    KF_incomesource: string;
    KF_monthlyIncome: number;
    KF_landmark: string;
    KF_houseType: string;
    KF_postalcode: number;
    KF_address: string;
    KF_Latitude: number;
    KF_Longitude: number;
    KF_house_photo1: string; // base64
    KF_house_photo2: string; // base64
    KF_maritalstatus: string;
    KF_mode: string;
    Items: any[]; // list
    Order_reverify: string;
    Prev_Order_Id?: number;
    Remarks?: string;
}

// POST /api/kyc
// Endpoint to receive and store KYC/Order Taking Form data
router.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body as KycInput;

        // Basic validation (Check mandatory fields)
        // Fields marked as mandatory in requirements
        const requiredFields = [
            'AppName', 'AppVersion', 'ConfigVersion', 'CountryName', 'StateName', 'CityName',
            'BrandName', 'ShowroomName', 'WorkstationName', 'SubUserCategory1', 'SubUserCategory2',
            'PrimaryUserType', 'PrimaryUserName', 'PrimaryMobileNumber', 'PrimaryEmail',
            'KYC_punch_mobile', 'KF_name', 'KF_aadhar', 'KF_pan', 'KF_incomesource',
            'KF_monthlyIncome', 'KF_landmark', 'KF_houseType', 'KF_postalcode', 'KF_address',
            'KF_Latitude', 'KF_Longitude', 'KF_house_photo1', 'KF_house_photo2',
            'KF_maritalstatus', 'KF_mode', 'Items', 'Order_reverify'
        ];

        const missingFields = requiredFields.filter(field => {
            // @ts-ignore
            return data[field] === undefined || data[field] === null || data[field] === '';
        });

        if (missingFields.length > 0) {
            res.status(400).json({ error: 'Missing mandatory fields', missingFields });
            return;
        }

        // Prepare data for insertion
        // Note: Convert numbers to strings where schema expects varchar, or keep number if schema expects int/decimal
        // We defined schema mostly as varchar or int.

        await db.insert(kyc_records).values({
            AppName: data.AppName,
            AppVersion: data.AppVersion,
            ConfigVersion: data.ConfigVersion,
            CountryName: data.CountryName,
            StateName: data.StateName,
            CityName: data.CityName,
            BrandName: data.BrandName,
            ShowroomName: data.ShowroomName,
            WorkstationName: data.WorkstationName,
            SubUserCategory1: data.SubUserCategory1,
            SubUserCategory2: data.SubUserCategory2,
            PrimaryUserType: Number(data.PrimaryUserType),
            PrimaryUserName: data.PrimaryUserName,
            PrimaryMobileNumber: String(data.PrimaryMobileNumber),
            PrimaryEmail: data.PrimaryEmail,
            KYC_punch_mobile: String(data.KYC_punch_mobile),
            KF_name: data.KF_name,
            KF_aadhar: String(data.KF_aadhar),
            KF_pan: data.KF_pan,
            KF_incomesource: data.KF_incomesource,
            KF_monthlyIncome: Number(data.KF_monthlyIncome),
            KF_landmark: data.KF_landmark,
            KF_houseType: data.KF_houseType,
            KF_postalcode: Number(data.KF_postalcode),
            KF_address: data.KF_address,
            KF_Latitude: String(data.KF_Latitude), // Schema is varchar
            KF_Longitude: String(data.KF_Longitude), // Schema is varchar
            KF_house_photo1: data.KF_house_photo1,
            KF_house_photo2: data.KF_house_photo2,
            KF_maritalstatus: data.KF_maritalstatus,
            KF_mode: data.KF_mode,
            Items: data.Items, // Drizzle handles json automatically? Usually yes if type is json
            Order_reverify: data.Order_reverify,
            Prev_Order_Id: data.Prev_Order_Id ? Number(data.Prev_Order_Id) : null,
            Remarks: data.Remarks || '',
            trn_date: new Date(), // Current timestamp
        });

        res.status(201).json({ success: true, message: 'KYC data saved successfully' });

    } catch (error) {
        console.error('Error saving KYC data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
    }
});

export default router;
