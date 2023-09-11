import { ErrorHandler, Injectable } from "@angular/core";
import { TrackJS } from "trackjs";
import { environment } from '../environments/environment';

TrackJS.install({
    token: "cf979df0c59b46f9a644556b979a3ba1",
    forwardingDomain: environment._top_level_name + ".nlf.no",
    version: "0.13.9B"
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