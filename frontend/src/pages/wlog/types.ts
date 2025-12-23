export interface PaginationState {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
}

export interface SuggestionsState {
    vehicles: any[];
    materials: any[];
    suppliers: any[];
    transporters: any[];
    customers: any[];
}

export interface FormData {
    mode: string;
    vid: string;
    vnumDisplay: string;
    tid: string;
    transporterName: string;
    transporterAddress: string;
    transporterContact: string;
    mid: string;
    mnameDisplay: string;
    sid: string;
    snameDisplay: string;
    cid: string;
    cnameDisplay: string;
    firstWeight: string;
    firstWeightDateTime: string;
    remarks: string;
    showSupplier: boolean;
}

export interface EditFormData extends FormData {
    id: number;
    secondWeight: string;
    secondWeightDateTime: string;
    netWeight: string;
    // firstWeightDateTime is already in FormData
}

export interface EditFirstWeightFormData {
    id: number;
    mode: string;
    vid: string;
    vnumDisplay: string;
    tid: string;
    transporterName: string;
    transporterAddress: string;
    transporterContact: string;
    mid: string;
    mnameDisplay: string;
    sid: string;
    snameDisplay: string;
    cid: string;
    cnameDisplay: string;
    firstWeight: string;
    firstWeightDateTime: string;
    remarks: string;
    showSupplier: boolean;
}

export interface SingleWeightFormData {
    mode: string;
    vid: string;
    vnumDisplay: string;
    tid: string;
    transporterName: string;
    transporterAddress: string;
    transporterContact: string;
    mid: string;
    mnameDisplay: string;
    sid: string;
    snameDisplay: string;
    cid: string;
    cnameDisplay: string;
    twt: string;  // Tare Weight
    twtdt: string;  // Tare Weight DateTime
    swt: string;  // Gross Weight (Second Weight)
    swtdt: string;  // Gross Weight DateTime
    remarks: string;
    showSupplier: boolean;
}
