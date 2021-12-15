"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const httpClient_1 = require("./server/httpClient");
const store_1 = require("./server/store");
const data_1 = require("./server/interfaces/data");
const socket_io_1 = require("socket.io");
const session_1 = require("./server/session");
const client_1 = require("./server/client");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const http = new httpClient_1.HttpClient();
global.http = http;
const store = new store_1.Store();
global.store = store;
const session = new session_1.Session();
global.session = session;
const server = app.listen(PORT, () => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:4200",
        },
    });
    const client = new client_1.Client();
    io.on("connection", function (socket) {
        const token = socket.handshake.auth.token;
        const activeSession = session.getSession(token);
        let subscription;
        socket.emit("session", activeSession.id);
        if (!store.hasConfig) {
            socket.emit(data_1.SocketEmit.MISSING_SETTINGS);
        }
        else if (activeSession.data.loggedIn) {
            socket.emit(data_1.SocketEmit.LOGGED_IN, true);
            client.startMainDataTimer();
            if (!subscription) {
                subscription = client.data.subscribe((data) => {
                    socket.emit(data_1.SocketEmit.MAINDATA, data);
                });
            }
        }
        else {
            socket.emit(data_1.SocketEmit.LOGGED_IN, false);
        }
        socket.on(data_1.SocketEmit.REGISTER, (data, fn) => {
            store
                .registerClient(data)
                .then((res) => {
                console.log(res);
                if (res["success"]) {
                    activeSession.data.loggedIn = true;
                    client.startMainDataTimer();
                    if (!subscription) {
                        subscription = client.data.subscribe((data) => {
                            socket.emit(data_1.SocketEmit.MAINDATA, data);
                        });
                    }
                }
                fn(res);
            })
                .catch((res) => {
                fn({
                    success: false,
                    msg: (res === null || res === void 0 ? void 0 : res.data) || "Nem érkezett válasz",
                });
            });
        });
        socket.on(data_1.SocketEmit.LOGIN, (data, fn) => {
            store
                .verifyUser(data.username, data.password)
                .then((res) => {
                if (res["success"]) {
                    activeSession.data.loggedIn = true;
                    client.startMainDataTimer();
                    if (!subscription) {
                        subscription = client.data.subscribe((data) => {
                            socket.emit(data_1.SocketEmit.MAINDATA, data);
                        });
                    }
                }
                fn(res);
            })
                .catch((res) => {
                fn({
                    success: false,
                    msg: (res === null || res === void 0 ? void 0 : res.data) || "Nem érkezett válasz",
                });
            });
        });
        socket.on("disconnect", () => {
            if (!io.sockets.sockets.size) {
                client.clearTimer();
                if (subscription)
                    subscription.unsubscribe();
            }
        });
    });
});
