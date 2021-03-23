import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'agence',
    loadChildren: () => import('./pages/agence/agence.module').then( m => m.AgencePageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./pages/retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./pages/depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./pages/commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./pages/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./pages/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'slide-menu',
    loadChildren: () => import('./pages/slide-menu/slide-menu.module').then( m => m.SlideMenuPageModule)
  },
  {
    path: 'entreprise',
    loadChildren: () => import('./pages/entreprise/entreprise.module').then( m => m.EntreprisePageModule)
  },
  {
    path: 'tarif',
    loadChildren: () => import('./pages/tarif/tarif.module').then( m => m.TarifPageModule)
  },
  {
    path: 'part',
    loadChildren: () => import('./pages/part/part.module').then( m => m.PartPageModule)
  },
  {
    path: 'list-user',
    loadChildren: () => import('./pages/list-user/list-user.module').then( m => m.ListUserPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'list-agence',
    loadChildren: () => import('./pages/list-agence/list-agence.module').then( m => m.ListAgencePageModule)
  },
  {
    path: 'add-agence',
    loadChildren: () => import('./pages/add-agence/add-agence.module').then( m => m.AddAgencePageModule)
  },
  {
    path: 'recharge',
    loadChildren: () => import('./pages/recharge/recharge.module').then( m => m.RechargePageModule)
  },
  {
    path: 'delete-recharge',
    loadChildren: () => import('./pages/delete-recharge/delete-recharge.module').then( m => m.DeleteRechargePageModule)
  },
  {
    path: 'annuler-depot',
    loadChildren: () => import('./pages/annuler-depot/annuler-depot.module').then( m => m.AnnulerDepotPageModule)
  },
  {
    path: 'all-transaction',
    loadChildren: () => import('./pages/all-transaction/all-transaction.module').then( m => m.AllTransactionPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
