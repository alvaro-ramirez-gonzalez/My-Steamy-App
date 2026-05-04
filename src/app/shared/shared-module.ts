import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { CardComponent } from './components/card/card.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [
    CurrencyFormatPipe,
    CardComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyFormatPipe,
    CardComponent,
    SkeletonLoaderComponent
  ]
})
export class SharedModule { }