import { NgModule } from "@angular/core";
import { TrannumetryModule } from "@ngx-trannumetry/core";
import { IonicPageModule } from "ionic-angular";

import { AreaEdit } from "./area-edit";

@NgModule({
  declarations: [AreaEdit],
  imports: [IonicPageModule.forChild(AreaEdit), TrannumetryModule.forChild()],
  exports: [AreaEdit]
})
export class AreaEditModule {}
