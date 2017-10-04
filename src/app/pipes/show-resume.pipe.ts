import { Pipe, PipeTransform } from '@angular/core';

/*
 * Return [size] first chars of the given [value], add ... if the original value contains more chars
 * Usage:
 *   value | showResume:size
 */
@Pipe({name: 'showResume'})
export class ShowResumePipe implements PipeTransform{
    transform(value: string, size: number) : string{
        if (value){
            if (value.length > size){
                return value.substr(0, size) + " ...";
            } else {
                return value;
            }
        } else {
            return "";
        }
    }
}