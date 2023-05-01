import bus from "../utils/bus";

export default function useFlashMessage() {
  function setFlashMessage(msg: string, type: string): void {
    bus.emit("flash", {
      message: msg,
      type: type,
    });
  }

  return { setFlashMessage };
}
