import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./main/home.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { TodoButtonDeleteAllComponent } from "src/app/shared/components/todo-button-delete-all/todo-button-delete-all.component";
import { TodoInputAddItensComponent } from "src/app/shared/components/todo-input-add-itens/todo-input-add-itens.component";
import { TodoListComponent } from "src/app/shared/components/todo-list/todo-list.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
    declarations: [
      HomeComponent,
      HeaderComponent,
      TodoButtonDeleteAllComponent,
      TodoInputAddItensComponent,
      TodoListComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        MatTabsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: []
})
export class HomeModule { }
