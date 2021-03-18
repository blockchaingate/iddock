import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterModule } from './modules/register/register.module'
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ApiService } from './services/api.service';
import { Web3Service } from './services/web3.service';
import { WalletService } from './services/wallet.service';
import { CoinService } from './services/coin.service';
import { KanbanService } from './services/kanban.service';
import { StorageService } from './services/storage.service';
import { UtilService } from './services/util.service';
import { HttpService } from './services/http.service';
import { AirdropService } from './services/airdrop.service';
import { IddockService } from './services/iddock.service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
//import { RegisterComponent } from './components/register/register.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { DetailComponent } from './components/detail/detail.component';
import { DetailBySequenceIDComponent } from './components/detail-by-sequence-id/detail-by-sequence-id.component';
import { HistoryComponent } from './components/history/history.component';
import { OwnerComponent } from './components/owner/owner.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailBySequenceIDComponent,
    AccountComponent,
    //RegisterComponent,
    DetailComponent,
    HistoryComponent,
    OwnerComponent,
    AddInfoComponent,
    UpdateInfoComponent
    // BrowserAnimationsModule,
    // BsDropdownModule

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RegisterModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
  ],
  providers: [
    WalletService,
    CoinService,
    ApiService,
    Web3Service,
    KanbanService,
    StorageService,
    UtilService,
    HttpService,
    AirdropService,
    IddockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
