import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.trim() === '') {
      return contacts;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerTerm)
    );  
    
    return filtered.length > 0 ? filtered : contacts;
  }
}
