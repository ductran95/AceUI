import { Component, OnInit } from '@angular/core';
import { Task } from '@app/core/models/ace/task';
import { AceLayoutService } from '@app/core/services/ace/ace-layout.service';

@Component({
    selector: 'ace-layout-header-tasks, [aceLayoutHeaderTasks]',
    templateUrl: './ace-layout-header-tasks.component.html',
    styleUrls: ['./ace-layout-header-tasks.component.scss']
})
export class AceLayoutHeaderTasksComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    taskList: Task[];
    scrollOptions: AceScrollOptionsInterface;

    //#endregion

    //#region Constructors

    constructor(private aceLayoutService: AceLayoutService) {
        this.taskList = [];
        this.scrollOptions = {
            size: 200,
            mouseWheelLock: true,
            reset: false
        };
    }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.aceLayoutService.getTasks().subscribe(
            (taskList: Task[]) => {
                this.taskList = taskList;
            }
        );
    }

    //#endregion

    //#region Funtions

    //#endregion

}
