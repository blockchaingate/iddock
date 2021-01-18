import { Routes, RouterModule } from '@angular/router';
import { EnterPhrasesComponent } from './components/enter-phrases/enter-phrases.component'
import { WritePhrasesComponent } from './components/write-phrases/write-phrases.component'
import { SetPasswordComponent } from './components/set-password/set-password.component'

const routes: Routes = [
  { path: 'enter-phrases', component: EnterPhrasesComponent },
  { path: 'write-phrases', component: WritePhrasesComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: '', component: EnterPhrasesComponent },
];

export const RegisterRoutes = RouterModule.forChild(routes);
