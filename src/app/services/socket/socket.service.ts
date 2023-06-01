import { Injectable, OnInit } from '@angular/core';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfToastService } from 'app/services/toast/toast.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { io } from "socket.io-client";
import { BehaviorSubject, Observable } from 'rxjs';


export interface socketMessage {
  title?: string;
  message: string;
  style?: string; // success|danger|warning|info|...
  link?: string;
  action?: string; // reload|obsreg_e5x_finished_processing
  autohide?: boolean;
  delay?: number;
  room?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NlfSocketService implements OnInit {

  socket = undefined;
  messages: socketMessage[] = [];

  typeClasses = {
    info: 'bg-info text-white',
    success: 'bg-success text-light',
    warning: 'bg-warning text-light',
    danger: 'bg-danger text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    light: 'bg-light text-dark',
    dark: 'bg-dark text-white',
    white: 'bg-white text-dark'
  }

  constructor(
    private alertService: NlfAlertService,
    private toastService: NlfToastService,
    private authDataSubject: NlfAuthSubjectService

  ) {

    this.authDataSubject.observableAuthData.subscribe(
      data => {
        if (!!data) {
          if (!this.socket && !!data?.token) {

            // Subscribe to socket 
            console.log('Subscribing to backend socket server');
            //this.socket = io('/', { query: { token: data.token } });
            this.socket = io('/', {auth: {token: data.token}});

            this.alertService.success('Connected to socket.io for two-way communication');

            // Join rooms!
            // this.socket.emit("join_room", "obsreg");
            // this.socket.emit("join_room", "obsreg_motorfly_655"); // Everything for the current obsreg!
            // this.socket.emit("join_room", "motorfly"); // Seksjon
            // this.socket.emit("join_room", "notifications"); // Own notifications (allerede i egen kanal...)

            this.socket.emit("get_rooms");

            // Handle incoming actions

            // Generic message
            this.socket.on('message', (message) => {
              this.showToast(message);
            });

            // Special events:
            this.socket.on('disconnect', (message) => {
              this.showToast(message);
            });

            // Message only to self!
            this.socket.on('message_self', (message) => {
              this.showToast(message);
            });

            // Message to a joined room
            this.socket.on('message_room', (message) => {
              this.showToast(message);
            });

            // Message to do action @TODO needs confirmation dialogue
            this.socket.on('action', (message) => {
              this.showToast(message);
              if (message.hasOwnProperty('link')) {

                //let alert = "<strong>${message['title']}</strong>&nbsp;${message['message']}<br /><a>${message['link']}</a>";

                //this.alertService[message['style']](alert, true, true, 0);

              }
            });


            // Message from notification daemon
            this.socket.on('notification', (message) => {
              this.showToast(message);
            });

            // Message from notification daemon
            this.socket.on('lungo', (message) => {
              this.showToast(message);
            });


            /** Catch-all
            this.socket.onAny((eventName, ...args) => {
              console.log('ANY', eventName, args);
            });
            

            this.socket.timeout(5000).emit("message", "acknowledge", (err, responses) => {
              if (err) {
                // some clients did not acknowledge the event in the given delay
                console.log('ACC ERR', err);
              } else {
                console.log('ACC OK', responses); // one response per client
              }
            });
            **/

          }
        }
      },
      err => console.log('Problem getting token: ', err)
    );
  }

  ngOnInit() {
  }

  /**
   * 
   * @param message 
   */
  public showToast(message) {
    this.toastService.show(
      message.message,
      {
        classname: this.typeClasses[message.style || 'success'],
        delay: message.delay * 1000 || 8000,
        autohide: message.autohide || true,
        headertext: message.title || 'Varsel'
      }
    );
  }
}
