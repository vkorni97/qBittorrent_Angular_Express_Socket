import express from "express";
import { HttpClient } from "./server/httpClient";
import { Store } from "./server/store";
import { SocketEmit } from "./server/interfaces/data";
import { Server } from "socket.io";
import { Session } from "./server/session";
import { Client } from "./server/client";
import { Subscription } from "rxjs";

const app = express();
const PORT = process.env.PORT || 3000;

const http = new HttpClient();
global.http = http;
const store = new Store();
global.store = store;
const session = new Session();
global.session = session;

const server = app.listen(PORT, () => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
    },
  });
  const client = new Client();

  io.on("connection", function (socket) {
    const token = socket.handshake.auth.token;
    const activeSession = session.getSession(token);
    let subscription: Subscription;

    socket.emit("session", activeSession.id);
    if (!store.hasConfig) {
      socket.emit(SocketEmit.MISSING_SETTINGS);
    } else if (activeSession.data.loggedIn) {
      socket.emit(SocketEmit.LOGGED_IN, true);
      client.startMainDataTimer();
      if (!subscription) {
        subscription = client.data.subscribe((data) => {
          socket.emit(SocketEmit.MAINDATA, data);
        });
      }
    } else {
      socket.emit(SocketEmit.LOGGED_IN, false);
    }

    socket.on(SocketEmit.REGISTER, (data, fn) => {
      store
        .registerClient(data)
        .then((res) => {
          console.log(res);
          if (res["success"]) {
            activeSession.data.loggedIn = true;
            client.startMainDataTimer();
            if (!subscription) {
              subscription = client.data.subscribe((data) => {
                socket.emit(SocketEmit.MAINDATA, data);
              });
            }
          }
          fn(res);
        })
        .catch((res) => {
          fn({
            success: false,
            msg: res?.data || "Nem érkezett válasz",
          });
        });
    });

    socket.on(SocketEmit.LOGIN, (data, fn) => {
      store
        .verifyUser(data.username, data.password)
        .then((res) => {
          if (res["success"]) {
            activeSession.data.loggedIn = true;
            client.startMainDataTimer();
            if (!subscription) {
              subscription = client.data.subscribe((data) => {
                socket.emit(SocketEmit.MAINDATA, data);
              });
            }
          }
          fn(res);
        })
        .catch((res) => {
          fn({
            success: false,
            msg: res?.data || "Nem érkezett válasz",
          });
        });
    });

    socket.on("disconnect", () => {
      if (!io.sockets.sockets.size) {
        client.clearTimer();
        if (subscription) subscription.unsubscribe();
      }
    });
  });
});
