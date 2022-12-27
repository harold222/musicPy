import { Observable, Subject, map } from 'rxjs';

export class SubjectGlobal {

    private subject$ = new Subject<any>();

    public getSubject<T>(): Observable<T> {
        return this.subject$.asObservable().pipe(map((r: T) => r));
    }

    public setSubject(newValue: any): void {
        this.subject$.next(newValue);
    }
}