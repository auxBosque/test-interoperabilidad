import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { TypesEnum } from "src/app/enums/types.enum";
import { PatientModel, PatientPostModel, PatientPutModel } from "../models/patient.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PatientService {
    private patientUrl: string;
    public _formatType: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        this.patientUrl = `${environment.dataServiceUrl}/Patient`;
        this._formatType = new BehaviorSubject<string>('json');
    }

    getHeaders(): HttpHeaders {
        const content = this._formatType.getValue() === 'json' ? 'application/json' : 'application/xml';
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', content);
        return headers;
    }

    getPatientList(): Observable<any> {
        return this.http.get<any>(this.patientUrl).pipe(
            tap(() => this.log(`getPatientList`)),
            catchError((error) => this.handleError('getPatientList', error))
        );
    }

    getExtensions(patients: PatientModel[], extensions: string[]): string[] {
        patients.forEach(patient => {
            patient.extension?.forEach(ext => {
                const value = ext.url.replace(`${this.patientUrl}/`, "");
                const search = extensions.find(x => x === value);
                if (search === undefined) extensions.push(value);
            });
        });
        return extensions;
    }

    savePatient(id: string, data: any, type: TypesEnum): Observable<any> {
        switch (type) {
            case TypesEnum.new: return this.addPatient(data);
            case TypesEnum.edit: return this.updatePatient(id, data);
            case TypesEnum.delete: return this.deletePatient(id);
            default: return of({ error: true });
        };
    }

    addPatient(data: PatientPostModel | string): Observable<any> {
        const headers = this.getHeaders();
        return this.http.post<any>(this.patientUrl, data, { headers }).pipe(
            tap(() => this.log(`addedPatient`)),
            catchError((error) => this.handleError('addPatient', error))
        );
    }

    updatePatient(id: string, data: PatientPutModel | string): Observable<any> {
        const headers = this.getHeaders();
        const sUrl = `${this.patientUrl}/${id}`;
        return this.http.put<any>(sUrl, data, { headers }).pipe(
            tap(() => this.log(`updatedPatient`)),
            catchError((error) => this.handleError('updatePatient', error))
        );
    }

    deletePatient(id: string): Observable<any> {
        const sUrl = `${this.patientUrl}/${id}`;
        return this.http.delete<any>(sUrl).pipe(
            tap(() => this.log(`deletedPatient`)),
            catchError((error) => this.handleError('deletePatient', error))
        );
    }

    private handleError(operation = 'operation', result?: any) {
          console.error(result.error);
          this.log(`${operation} failed: ${result.message}`);
          return of(result);
    }

    private log(message: string) {
        console.log(`Patient Service: ${message}`);
    }
}