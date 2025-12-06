import { db } from './db';
import { depts, shifts, nopt, mdetail, vdetail, tdetail, sdetail, cdetail, mlog } from './db/schema';

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        const username = 'Admin';
        const now = new Date().toISOString();

        // Departments
        await db.insert(depts).values([
            { dept: 'Production', username, trn_date: now },
            { dept: 'Quality', username, trn_date: now },
            { dept: 'Logistics', username, trn_date: now },
        ]);

        // Shifts
        await db.insert(shifts).values([
            { shift: 'Shift A', stshift: '06:00', edshift: '14:00', username, trn_date: now },
            { shift: 'Shift B', stshift: '14:00', edshift: '22:00', username, trn_date: now },
            { shift: 'Shift C', stshift: '22:00', edshift: '06:00', username, trn_date: now },
        ]);

        // NOP
        await db.insert(nopt).values([
            { nop: 'Scale Error', username, trn_date: now },
            { nop: 'Printer Jam', username, trn_date: now },
            { nop: 'Software Crash', username, trn_date: now },
        ]);

        // Machines
        await db.insert(mdetail).values([
            { mname: 'Weighbridge 1', username, trn_date: now },
            { mname: 'Weighbridge 2', username, trn_date: now },
            { mname: 'Steel Coil', username, trn_date: now }, // Material?
            { mname: 'Scrap Metal', username, trn_date: now },
        ]);

        // Vehicles
        await db.insert(vdetail).values([
            { vnum: 'TN-01-AB-1234', username, trn_date: now },
            { vnum: 'KA-05-XY-9876', username, trn_date: now },
        ]);

        // Transporters
        await db.insert(tdetail).values([
            { tname: 'Express Logistics', username, trn_date: now },
            { tname: 'Heavy Haulage', username, trn_date: now },
        ]);

        // Suppliers
        await db.insert(sdetail).values([
            { sname: 'Steel Corp', username, trn_date: now },
            { sname: 'Scrap Dealers Inc', username, trn_date: now },
        ]);

        // Customers
        await db.insert(cdetail).values([
            { cname: 'AutoParts Ltd', username, trn_date: now },
            { cname: 'Construction Co', username, trn_date: now },
        ]);

        // Maintenance Log (Sample data for Reports)
        // Note: report uses str_to_date on stdate (DD-MM-YYYY)
        await db.insert(mlog).values([
            // Completed
            { stdate: '15-01-2025', dept: 'Production', nop: 'Scale Error', stat: 'Completed', stype: 'Shift A', item_description1: 'Weighbridge 1', username, trn_date: now },
            { stdate: '20-02-2025', dept: 'Quality', nop: 'Printer Jam', stat: 'Completed', stype: 'Shift B', item_description1: 'Weighbridge 2', username, trn_date: now },
            { stdate: '10-03-2025', dept: 'Logistics', nop: 'Software Crash', stat: 'Completed', stype: 'Shift A', item_description1: 'Steel Coil', username, trn_date: now },
            // Pending
            { stdate: '05-04-2025', dept: 'Production', nop: 'Scale Error', stat: 'Pending', stype: 'Shift C', item_description1: 'Weighbridge 1', username, trn_date: now },
            { stdate: '12-05-2025', dept: 'Quality', nop: 'Printer Jam', stat: 'Pending', stype: 'Shift A', item_description1: 'Weighbridge 2', username, trn_date: now },
            // Previous Year (2024)
            { stdate: '15-12-2024', dept: 'Production', nop: 'Scale Error', stat: 'Completed', stype: 'Shift A', item_description1: 'Weighbridge 1', username, trn_date: now },
            { stdate: '20-11-2024', dept: 'Logistics', nop: 'Software Crash', stat: 'Completed', stype: 'Shift B', item_description1: 'Steel Coil', username, trn_date: now },
        ]);

        console.log('✅ Seeding complete!');
    } catch (err) {
        console.error('❌ Seeding failed:', err);
    }
}

seed().then(() => process.exit());
