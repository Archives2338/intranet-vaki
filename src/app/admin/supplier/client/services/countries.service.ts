import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs'

interface INameCountrie {
    common?: string;
}

interface IIdd {
    root?: string;
    suffixes?: string[];
}

interface IFlags {
    png: string;
    svg: string;
}

export interface ICountriesDTO {
    name: INameCountrie
    idd: IIdd;
    flags: IFlags;
  }

export interface ICountries {
  name: string;
  prefix: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

//   countries: EventEmitter<ICountries[]> = new EventEmitter<ICountries[]>();
  allCountries: ICountries[] = [];


  getCountriesToCreateClient(){
    this.allCountries = []
    const url = `https://restcountries.com/v3.1/all`;
    return this.http.get<ICountriesDTO[]>(url).pipe(
      map((data)=>{
        // this.countries.emit(data)
        const dataCountries = data.map(countrie=>{
            const {name,idd,flags} = countrie
            const {common} = name
            const prefix = idd.root  && idd.suffixes ? `${idd.root}${idd.suffixes[0]}` : ''
            return {name:common ?? '',prefix: prefix ?? '',flag: flags.png ?? ''}
        }).sort((a,b)=> a.name.localeCompare(b.name))
        this.allCountries = dataCountries
        return dataCountries as ICountries[]
      }));
  }

}
