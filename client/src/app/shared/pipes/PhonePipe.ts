import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null) return '';  // return an empty string if value is null or undefined
    let cleanedValue = value.toString().replace(/\D/g, ''); // Remove non-numeric characters

    // If the cleaned value doesn't have 10 digits, return the original value (or empty string)
    if (cleanedValue.length !== 10) {
      return value.toString();  // Returning original value if it doesn't have 10 digits
    }

    // Format the number as (XXX) XXX-XXXX
    const formattedValue = `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
    
    return formattedValue;
  }

}
