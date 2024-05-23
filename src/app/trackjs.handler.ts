import { ErrorHandler, Injectable } from "@angular/core";
import { TrackJS } from "trackjs";
import { environment } from '../environments/environment';

TrackJS.install({
    token: "",
    //forwardingDomain: environment._top_level_name + ".nlf.no",
    version: ""
    // for more configuration options, see https://docs.trackjs.com
});

@Injectable()
export class TrackJsErrorHandler implements ErrorHandler {
    handleError(error: any) {
        // Add the error message to the telemetry timeline.
        // It can occasionally have useful additional context.
        console.warn(error.message);

        // Assumes we have already loaded and configured TrackJS*
        TrackJS.track(error.originalError || error);
    }
}