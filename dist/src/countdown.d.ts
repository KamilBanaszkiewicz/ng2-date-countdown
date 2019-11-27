import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
export declare class CountDown implements OnInit, OnDestroy {
    units: any;
    end: any;
    displayString: String;
    text: any;
    divider: any;
    showZero: Boolean;
    reached: EventEmitter<Date>;
    display: any;
    displayNumbers: any;
    wasReached: Boolean;
    interval: any;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    _displayString(): void;
}
