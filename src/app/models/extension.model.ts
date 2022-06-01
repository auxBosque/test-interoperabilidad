export class ExtensionModel {
    public url: string;
    public valueCodeableConcept: ValueCodeableConceptModel;

    constructor(json: ExtensionModel | null) {
        this.url = json?.url || "";
        this.valueCodeableConcept = json?.valueCodeableConcept || new ValueCodeableConceptModel(null);
    }
}

class ValueCodeableConceptModel {
    public text: string;

    constructor(json: ValueCodeableConceptModel | null) {
        this.text = json?.text || "";
    }
}
