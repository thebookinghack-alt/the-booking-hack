let live = { connected: false, source: "", count: 0 };

export function setSheetLive(connected: boolean, source = "", count = 0) {
  live = { connected, source, count };
}

export function getSheetLive() {
  return live;
}
