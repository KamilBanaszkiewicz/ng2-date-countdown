import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var CountDown = /** @class */ (function () {
    function CountDown() {
        this.displayString = '';
        this.showZero = false;
        this.reached = new EventEmitter();
        this.display = [];
        this.displayNumbers = [];
        this.wasReached = false;
        this.interval = null;
    }
    CountDown.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this._displayString(); }, 100);
    };
    CountDown.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    CountDown.prototype._displayString = function () {
        if (this.wasReached)
            return;
        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }
        var givenDate = new Date(this.end);
        var now = new Date();
        var dateDifference = givenDate - now;
        if ((dateDifference < 100 && dateDifference > 0) || dateDifference < 0 && !this.wasReached) {
            this.wasReached = true;
            this.reached.next(now);
        }
        var lastUnit = this.units[this.units.length - 1], unitConstantForMillisecs = {
            year: (((1000 * 60 * 60 * 24 * 7) * 4) * 12),
            month: ((1000 * 60 * 60 * 24 * 7) * 4),
            weeks: (1000 * 60 * 60 * 24 * 7),
            days: (1000 * 60 * 60 * 24),
            hours: (1000 * 60 * 60),
            minutes: (1000 * 60),
            seconds: 1000
        }, unitsLeft = {}, returnText = '', returnNumbers = '', totalMillisecsLeft = dateDifference, i, unit;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {
                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);
                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: year, month, weeks, days, hours, minutes, seconds, milliseconds');
                }
                // If it was reached, everything is zero
                unitsLeft[unit] = (this.wasReached) ? 0 : totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];
                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                }
                else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;
                // If it's less than 0, round to 0
                unitsLeft[unit] = (unitsLeft[unit] > 0) ? unitsLeft[unit] : 0;
                returnNumbers += ' ' + unitsLeft[unit] + ' | ';
                returnText += ' ' + unit;
            }
        }
        if (this.text === null || !this.text) {
            this.text = {
                Year: 'Year',
                Month: 'Month',
                Weeks: 'Weeks',
                Days: 'Days',
                Hours: 'Hours',
                Minutes: 'Minutes',
                Seconds: 'Seconds',
                MilliSeconds: 'Milliseconds'
            };
        }
        this.displayString = returnText
            .replace('Year', this.text.Year + ' | ')
            .replace('Month', this.text.Month + ' | ')
            .replace('Weeks', this.text.Weeks + ' | ')
            .replace('Days', this.text.Days + ' | ')
            .replace('Hours', this.text.Hours + ' | ')
            .replace('Minutes', this.text.Minutes + ' | ')
            .replace('Seconds', this.text.Seconds);
        this.displayNumbers = returnNumbers.split('|');
        this.display = this.displayString.split('|');
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountDown.prototype, "units", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountDown.prototype, "end", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CountDown.prototype, "displayString", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountDown.prototype, "text", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CountDown.prototype, "divider", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CountDown.prototype, "showZero", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CountDown.prototype, "reached", void 0);
    CountDown = tslib_1.__decorate([
        Component({
            selector: 'countdown',
            template: "<div class=\"countdown\">\n  <div *ngFor=\"let time of display; let i = index\" class=\"measurements {{time}}\">\n    <p class=\"measurements-number\">\n      {{ (showZero && displayNumbers[i] < 10) ? '0' + displayNumbers[i].trim() : displayNumbers[i]}}\n    </p>\n    <span *ngIf=\"display[i+1]\" class=\"divider\"> {{divider}} </span>\n    <p class=\"measurements-text\">\n      {{time}}\n    </p>\n  </div>\n</div>\n<ng-content></ng-content>\n",
            styles: [".countdown{display:flex;align-items:center;justify-content:center;align-content:center;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}.countdown .measurements{flex:.1}.countdown .measurements .divider{float:right}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CountDown);
    return CountDown;
}());
export { CountDown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtY291bnRkb3duLyIsInNvdXJjZXMiOlsic3JjL2NvdW50ZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFRMUY7SUFjRTtRQVhTLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNELFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixhQUFRLEdBQVEsSUFBSSxDQUFDO0lBSXJCLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0UsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUVFLElBQUksSUFBSSxDQUFDLFVBQVU7WUFDakIsT0FBTztRQUVULElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxTQUFTLEdBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUFRLElBQUksSUFBSSxFQUFFLENBQUM7UUFDMUIs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T0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUN6QyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUM3QyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXJIUTtRQUFSLEtBQUssRUFBRTs7NENBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs7MENBQVU7SUFDVDtRQUFSLEtBQUssRUFBRTswQ0FBZ0IsTUFBTTtvREFBTTtJQUMzQjtRQUFSLEtBQUssRUFBRTs7MkNBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7OENBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTswQ0FBVyxPQUFPOytDQUFTO0lBQ3pCO1FBQVQsTUFBTSxFQUFFOzBDQUFVLFlBQVk7OENBQTRCO0lBUGhELFNBQVM7UUFOckIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsMGNBQTZCOztTQUU5QixDQUFDOztPQUVXLFNBQVMsQ0F1SHJCO0lBQUQsZ0JBQUM7Q0FBQSxBQXZIRCxJQXVIQztTQXZIWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvdW50ZG93bicsXG4gIHRlbXBsYXRlVXJsOiAnY291bnRkb3duLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY291bnRkb3duLnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENvdW50RG93biBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdW5pdHM6IGFueTtcbiAgQElucHV0KCkgZW5kOiBhbnk7XG4gIEBJbnB1dCgpIGRpc3BsYXlTdHJpbmc6IFN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIGRpdmlkZXI6IGFueTtcbiAgQElucHV0KCkgc2hvd1plcm86IEJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWNoZWQ6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgZGlzcGxheTogYW55ID0gW107XG4gIGRpc3BsYXlOdW1iZXJzOiBhbnkgPSBbXTtcbiAgd2FzUmVhY2hlZDogQm9vbGVhbiA9IGZhbHNlO1xuICBcbiAgaW50ZXJ2YWw6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuICBcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuX2Rpc3BsYXlTdHJpbmcoKSwgMTAwKTtcbiAgfVxuICBcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIF9kaXNwbGF5U3RyaW5nKCkge1xuXG4gICAgaWYgKHRoaXMud2FzUmVhY2hlZClcbiAgICAgIHJldHVybjtcblxuICAgIGlmICh0eXBlb2YgdGhpcy51bml0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudW5pdHMgPSB0aGlzLnVuaXRzLnNwbGl0KCd8Jyk7XG4gICAgfVxuXG4gICAgbGV0IGdpdmVuRGF0ZTogYW55ID0gbmV3IERhdGUodGhpcy5lbmQpO1xuICAgIGxldCBub3c6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGRhdGVEaWZmZXJlbmNlOiBhbnkgPSBnaXZlbkRhdGUgLSBub3c7XG5cbiAgICBpZiAoKGRhdGVEaWZmZXJlbmNlIDwgMTAwICYmIGRhdGVEaWZmZXJlbmNlID4gMCkgfHwgZGF0ZURpZmZlcmVuY2UgPCAwICYmICF0aGlzLndhc1JlYWNoZWQpIHtcbiAgICAgIHRoaXMud2FzUmVhY2hlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlYWNoZWQubmV4dChub3cpO1xuICAgIH1cblxuICAgIGxldCBsYXN0VW5pdCA9IHRoaXMudW5pdHNbdGhpcy51bml0cy5sZW5ndGggLSAxXSxcbiAgICAgIHVuaXRDb25zdGFudEZvck1pbGxpc2VjcyA9IHtcbiAgICAgICAgeWVhcjogKCgoMTAwMCAqIDYwICogNjAgKiAyNCAqIDcpICogNCkgKiAxMiksXG4gICAgICAgIG1vbnRoOiAoKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KSAqIDQpLFxuICAgICAgICB3ZWVrczogKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KSxcbiAgICAgICAgZGF5czogKDEwMDAgKiA2MCAqIDYwICogMjQpLFxuICAgICAgICBob3VyczogKDEwMDAgKiA2MCAqIDYwKSxcbiAgICAgICAgbWludXRlczogKDEwMDAgKiA2MCksXG4gICAgICAgIHNlY29uZHM6IDEwMDBcbiAgICAgIH0sXG4gICAgICB1bml0c0xlZnQgPSB7fSxcbiAgICAgIHJldHVyblRleHQgPSAnJyxcbiAgICAgIHJldHVybk51bWJlcnMgPSAnJyxcbiAgICAgIHRvdGFsTWlsbGlzZWNzTGVmdCA9IGRhdGVEaWZmZXJlbmNlLFxuICAgICAgaSxcbiAgICAgIHVuaXQ6IGFueTtcblxuICAgIGZvciAoaSBpbiB0aGlzLnVuaXRzKSB7XG4gICAgICBpZiAodGhpcy51bml0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXG4gICAgICAgIHVuaXQgPSB0aGlzLnVuaXRzW2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKHVuaXRDb25zdGFudEZvck1pbGxpc2Vjc1t1bml0LnRvTG93ZXJDYXNlKCldID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vJGludGVydmFsLmNhbmNlbChjb3VudERvd25JbnRlcnZhbCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVwZWF0IHVuaXQ6ICcgKyB1bml0KTtcblxuICAgICAgICB9XG4gICAgICAgIGlmICh1bml0Q29uc3RhbnRGb3JNaWxsaXNlY3MuaGFzT3duUHJvcGVydHkodW5pdC50b0xvd2VyQ2FzZSgpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuaXQ6ICcgKyB1bml0ICsgJyBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIGZvbGxvd2luZyB1bml0czogeWVhciwgbW9udGgsIHdlZWtzLCBkYXlzLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBpdCB3YXMgcmVhY2hlZCwgZXZlcnl0aGluZyBpcyB6ZXJvXG4gICAgICAgIHVuaXRzTGVmdFt1bml0XSA9ICh0aGlzLndhc1JlYWNoZWQpID8gMCA6IHRvdGFsTWlsbGlzZWNzTGVmdCAvIHVuaXRDb25zdGFudEZvck1pbGxpc2Vjc1t1bml0LnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChsYXN0VW5pdCA9PT0gdW5pdCkge1xuICAgICAgICAgIHVuaXRzTGVmdFt1bml0XSA9IE1hdGguY2VpbCh1bml0c0xlZnRbdW5pdF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVuaXRzTGVmdFt1bml0XSA9IE1hdGguZmxvb3IodW5pdHNMZWZ0W3VuaXRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvdGFsTWlsbGlzZWNzTGVmdCAtPSB1bml0c0xlZnRbdW5pdF0gKiB1bml0Q29uc3RhbnRGb3JNaWxsaXNlY3NbdW5pdC50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgdW5pdENvbnN0YW50Rm9yTWlsbGlzZWNzW3VuaXQudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcblxuICAgICAgICAvLyBJZiBpdCdzIGxlc3MgdGhhbiAwLCByb3VuZCB0byAwXG4gICAgICAgIHVuaXRzTGVmdFt1bml0XSA9ICh1bml0c0xlZnRbdW5pdF0gPiAwKSA/IHVuaXRzTGVmdFt1bml0XSA6IDA7XG5cbiAgICAgICAgcmV0dXJuTnVtYmVycyArPSAnICcgKyB1bml0c0xlZnRbdW5pdF0gKyAnIHwgJztcbiAgICAgICAgcmV0dXJuVGV4dCArPSAnICcgKyB1bml0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRleHQgPT09IG51bGwgfHwgIXRoaXMudGV4dCkge1xuICAgICAgdGhpcy50ZXh0ID0ge1xuICAgICAgICBZZWFyOiAnWWVhcicsXG4gICAgICAgIE1vbnRoOiAnTW9udGgnLFxuICAgICAgICBXZWVrczogJ1dlZWtzJyxcbiAgICAgICAgRGF5czogJ0RheXMnLFxuICAgICAgICBIb3VyczogJ0hvdXJzJyxcbiAgICAgICAgTWludXRlczogJ01pbnV0ZXMnLFxuICAgICAgICBTZWNvbmRzOiAnU2Vjb25kcycsXG4gICAgICAgIE1pbGxpU2Vjb25kczogJ01pbGxpc2Vjb25kcydcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gcmV0dXJuVGV4dFxuICAgICAgLnJlcGxhY2UoJ1llYXInLCB0aGlzLnRleHQuWWVhciArICcgfCAnKVxuICAgICAgLnJlcGxhY2UoJ01vbnRoJywgdGhpcy50ZXh0Lk1vbnRoICsgJyB8ICcpXG4gICAgICAucmVwbGFjZSgnV2Vla3MnLCB0aGlzLnRleHQuV2Vla3MgKyAnIHwgJylcbiAgICAgIC5yZXBsYWNlKCdEYXlzJywgdGhpcy50ZXh0LkRheXMgKyAnIHwgJylcbiAgICAgIC5yZXBsYWNlKCdIb3VycycsIHRoaXMudGV4dC5Ib3VycyArICcgfCAnKVxuICAgICAgLnJlcGxhY2UoJ01pbnV0ZXMnLCB0aGlzLnRleHQuTWludXRlcyArICcgfCAnKVxuICAgICAgLnJlcGxhY2UoJ1NlY29uZHMnLCB0aGlzLnRleHQuU2Vjb25kcyk7XG5cbiAgICB0aGlzLmRpc3BsYXlOdW1iZXJzID0gcmV0dXJuTnVtYmVycy5zcGxpdCgnfCcpO1xuICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuZGlzcGxheVN0cmluZy5zcGxpdCgnfCcpO1xuICB9XG59XG4iXX0=