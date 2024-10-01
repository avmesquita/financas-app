import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { MenubarModule } from 'primeng/menubar';
/*import {MenuItem} from 'primeng/api';*/

import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { ToastModule } from "primeng/toast";
//import { MegaMenuModule } from "primeng/megamenu";
import { TableModule } from "primeng/table";
import { MessageModule } from "primeng/message";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { OverlayPanelModule } from "primeng/overlaypanel";
//import { BreadcrumbModule } from "primeng/breadcrumb";
import { CalendarModule } from "primeng/calendar";
import { SidebarModule } from "primeng/sidebar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { CheckboxModule } from "primeng/checkbox";
import { FileUploadModule } from "primeng/fileupload";
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InplaceModule } from 'primeng/inplace';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';

import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DragDropModule } from 'primeng/dragdrop';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { InputMaskModule } from 'primeng/inputmask';

import { ScrollTopModule } from 'primeng/scrolltop';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuModule}  from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService, MessageService } from "primeng/api";
import { BadgeModule } from "primeng/badge";
import { ChipsModule } from 'primeng/chips';

/**
 * Módulo de componentes do PrimeNG
 */
@NgModule({
  exports: [
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DropdownModule,
    RatingModule,
    RadioButtonModule,
    CardModule,    
    PasswordModule,    
    ScrollTopModule,
    PanelModule,
    OverlayPanelModule,
    DataViewModule,
    KeyFilterModule,
    MessageModule,
    CheckboxModule,
    DragDropModule,
    DividerModule,
    TooltipModule,
    MenuModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    TabViewModule,
    ChipsModule,
    InputSwitchModule,
    CalendarModule,
    ChartModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    AvatarModule,
    ProgressSpinnerModule,
    AccordionModule,
    ContextMenuModule,
    StepsModule,
    PanelMenuModule,
    CarouselModule,
    MessagesModule,
    InplaceModule,
    SidebarModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimeNgModule {}
