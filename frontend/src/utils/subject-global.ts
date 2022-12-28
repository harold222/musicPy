import { Observable, Subject, map } from 'rxjs';

export class SubjectGlobal<T> {

    private subject$ = new Subject<T>();

    public getSubject(): Observable<T> {
        return this.subject$.asObservable();
    }

    public setSubject(newValue: T): void {
        this.subject$.next(newValue);
    }
}