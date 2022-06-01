import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppModuleMaterial } from "./app.module.material";

@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule,
        AppModuleMaterial
    ],
    exports: [
        AppModuleMaterial
    ],
    providers: []
})
export class AppModuleShared { }
