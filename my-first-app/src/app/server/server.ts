import { Component } from '@angular/core';

@Component({
    selector: 'app-server',
    standalone: false,
    templateUrl: './server.html',
    styles: [`
        .online {
            color: white;
        }
    `]
})

export class Server {
serverId = 10;
serverStatus = 'offline';

constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline'; 
    }

getColor() {
    return this.serverStatus === 'online' ? 'lightgreen' : 'salmon';
    }
}