import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Documents } from './documents/documents';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { MessageList } from './messages/message-list/message-list';
import { Contacts } from './contacts/contacts';
import { ContactDetail } from './contacts/contact-detail/contact-detail';
import { ContactEdit } from './contacts/contact-edit/contact-edit';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: Documents,
    children: [
      { path: 'new', component: DocumentEdit },
      { path: ':id', component: DocumentDetail },
      { path: ':id/edit', component: DocumentEdit }
    ]
  },
  { path: 'messages', component: MessageList },
  {
    path: 'contacts',
    component: Contacts,
    children: [
      { path: 'new', component: ContactEdit },
      { path: ':id', component: ContactDetail },
      { path: ':id/edit', component: ContactEdit }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
// bundles the routes and makes them available to the app
export class AppRoutingModule { 

}
