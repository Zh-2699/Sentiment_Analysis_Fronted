import { io } from "socket.io-client";

class WebSocketService {
  constructor(url) {
    this.url = url; // WebSocket 服务器地址
    this.socket = null; // WebSocket 实例
    this.isConnected = false; // 连接状态
    this.eventCallbacks = {}; // 事件回调存储
  }

  // 连接 WebSocket
  connect() {
    if (this.isConnected) return;
    
    this.socket = io(this.url);

    this.socket.on("connect", () => {
      this.isConnected = true;
      console.log("WebSocket 连接成功");
    });

    this.socket.on("disconnect", () => {
      this.isConnected = false;
      console.log("WebSocket 连接已断开");
    });

    this.socket.on("error", (error) => {
      console.error("WebSocket 发生错误:", error);
    });

    // 动态监听消息
    this.socket.onAny((event, data) => {
      if (this.eventCallbacks[event]) {
        this.eventCallbacks[event](data);
      }
    });
  }

  // 发送消息
  send(event, message) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, message);
    } else {
      console.warn("WebSocket 未连接，无法发送消息");
    }
  }

  // 监听事件
  on(event, callback) {
    this.eventCallbacks[event] = callback;
  }

  // 关闭 WebSocket 连接
  close() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}

export default new WebSocketService("http://127.0.0.1:5000");
