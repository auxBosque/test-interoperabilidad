import { ExtensionModel } from './extension.model';

export class PatientModel {
    public id: string;
    public name: NameModel[];
    public identifier: IdentifierModel[]; 
    public gender: string;
    public birthDate: string;
    public meta: MetaModel;
    public resourceType: string;
    public extension: ExtensionModel[];

    constructor(json: PatientModel | null) {
        this.id = json?.id || "0";
        this.name = json?.name || [];
        this.identifier = json?.identifier || [];
        this.gender = json?.gender || "";
        this.birthDate = json?.birthDate || "";
        this.meta = json?.meta || new MetaModel(null);
        this.resourceType = json?.resourceType || "";
        this.extension = json?.extension || [new ExtensionModel(null)];
    }
}

export class NameModel {
    public family: string;
    public given: string[];

    constructor(json: NameModel | null) {
        this.family = json?.family || "";
        this.given = json?.given || [];
    }
}

export class IdentifierModel {
    public system: string;
    public value: string;

    constructor(json: IdentifierModel | null) {
        this.system = json?.system || "";
        this.value = json?.value || "";
    }
}

export class MetaModel {
    public lastUpdated: string;
    public source: string;
    public versionId: string;

    constructor(json: MetaModel | null) {
        this.lastUpdated = json?.lastUpdated || "";
        this.source = json?.source || "";
        this.versionId = json?.versionId || "";
    }
}

export class PatientPostModel {
    public resourceType: string;
    public identifier: IdentifierModel[];
    public name: NameModel[];
    public gender: string;
    public birthDate: string;
    public extension: ExtensionModel[];

    constructor(json: PatientPostModel | null) {
        this.resourceType = json?.resourceType || "";
        this.identifier = json?.identifier || [new IdentifierModel(null)];
        this.name = json?.name || [new NameModel(null)];
        this.gender = json?.gender || "";
        this.birthDate = json?.birthDate || "";
        this.extension = json?.extension || [new ExtensionModel(null)];
    }
}

export class PatientPutModel {
    public id: string;
    public resourceType: string;
    public identifier: IdentifierModel[];
    public meta: MetaModel;
    public name: NameModel[];
    public gender: string;
    public birthDate: string;
    public extension: ExtensionModel[];

    constructor(json: PatientPutModel | null) {
        this.id = json?.id || "";
        this.resourceType = json?.resourceType || "";
        this.identifier = json?.identifier || [new IdentifierModel(null)];
        this.meta = json?.meta || new MetaModel(null);
        this.name = json?.name || [new NameModel(null)];
        this.gender = json?.gender || "";
        this.birthDate = json?.birthDate || "";
        this.extension = json?.extension || [new ExtensionModel(null)];
    }
}
