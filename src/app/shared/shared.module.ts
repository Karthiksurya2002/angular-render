import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeShareComponent } from './like-share/like-share.component';

@NgModule({
  declarations: [LikeShareComponent],
  exports: [LikeShareComponent],
  imports: [CommonModule],
})
export class SharedModule {}
