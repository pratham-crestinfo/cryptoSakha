import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoinComponent } from './coin/coin.component';
import { NewsComponent } from './news/news.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OopsComponent } from './oops/oops.component';
import { LogoutComponent } from './logout/logout.component';
import { Component } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'coin/:id', component: CoinComponent },
  {
    path: 'news',
    component: NewsComponent,
  },
  ,
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"watchlist",
    component:WatchlistComponent
  },{
    path:"oops",
    component:OopsComponent
  },{
    path:"logout",
    component:LogoutComponent
  },
{  
  path:"**",
  component:NotfoundComponent
}
];
// {
//   path:'auth',
//   component:AuthComponent
// },
// {
//   path:"search",
//   component:SearchComponent
// }